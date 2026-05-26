using Microsoft.AspNetCore.Mvc;
using SockStoreAPI.Data;
using SockStoreAPI.Models;

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
            _context.Orders.Add(order);

            await _context.SaveChangesAsync();

            return Ok(order);
        }
        [HttpGet]
        public IActionResult GetOrders()
        {
            var orders = _context.Orders
                .OrderByDescending(o => o.CreatedAt)
                .ToList();

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
    }
}