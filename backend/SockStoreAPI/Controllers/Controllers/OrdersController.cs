using Microsoft.AspNetCore.Mvc;
using SockStoreAPI.Data;
using SockStoreAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace SockStoreAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(
            Order order
        )
        {
            foreach (var item in order.Items)
            {
                var product = await _context.Products
                    .FindAsync(item.ProductId);

                if (product == null)
                {
                    return BadRequest(
                        $"Producto {item.ProductId} no existe"
                    );
                }

                if (product.Stock < item.Quantity)
                {
                    return BadRequest(
                        $"No hay suficiente stock para {product.Name}"
                    );
                }
            }

            foreach (var item in order.Items)
            {
                var product = await _context.Products
                    .FindAsync(item.ProductId);

                product!.Stock -= item.Quantity;
            }
            var userId = User
                .FindFirst(ClaimTypes.NameIdentifier)?
                .Value;

            if (userId != null)
            {
                order.UserId = int.Parse(userId);
            }

            order.CreatedAt = DateTime.UtcNow;

            if (string.IsNullOrEmpty(order.Status))
            {
                order.Status = "Pending";
            }

            _context.Orders.Add(order);

            await _context.SaveChangesAsync();

            return Ok(order);
        }
        [HttpGet]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .ToListAsync();

            return Ok(orders);
}
        [HttpPut("{id}/complete")]
        public async Task<IActionResult> CompleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if(order == null)
            {
                return NotFound();
            }

            order.Status = "Completed";

            await _context.SaveChangesAsync();

            return Ok(order);
        }

        [Authorize]
        [HttpGet("my-orders")]
        public async Task<IActionResult> GetMyOrders()
        {
            var userId = User.FindFirst(
                ClaimTypes.NameIdentifier
            )?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            var orders = await _context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .Where(o => o.UserId == int.Parse(userId))
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            return Ok(orders);
        }
    }
}