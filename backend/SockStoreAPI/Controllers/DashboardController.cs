using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SockStoreAPI.Data;
using SockStoreAPI.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace SockStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<DashboardStatsDto>> GetStats()
        {
            var stats = new DashboardStatsDto
            {
                TotalProducts =
                    await _context.Products.CountAsync(),

                TotalOrders =
                    await _context.Orders.CountAsync(),

                TotalSales =
                    await _context.Orders.SumAsync(
                        o => o.Total
                    ),

                PendingOrders =
                    await _context.Orders.CountAsync(
                        o => o.Status == "Pending"
                    ),

                CompletedOrders =
                    await _context.Orders.CountAsync(
                        o => o.Status == "Completed"
                    )
            };

            return Ok(stats);
        }
    }
}