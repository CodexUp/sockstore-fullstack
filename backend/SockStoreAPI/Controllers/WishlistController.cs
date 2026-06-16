using Microsoft.AspNetCore.Mvc;
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
    public class WishlistController : ControllerBase
    {
        private readonly AppDbContext _context;

        public WishlistController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetWishlist()
        {
            var userId = User
                .FindFirst(
                    ClaimTypes.NameIdentifier
                )?.Value;

            var items = await _context.WishlistItems
                .Include(w => w.Product)
                .Where(
                    w => w.UserId ==
                    int.Parse(userId!)
                )
                .ToListAsync();

            return Ok(items);
        }

        [Authorize]
        [HttpPost("{productId}")]
        public async Task<IActionResult> AddToWishlist(
            int productId
        )
        {
            var userId = User
                .FindFirst(
                    ClaimTypes.NameIdentifier
                )?.Value;

            var exists = await _context.WishlistItems
                .AnyAsync(w =>
                    w.UserId ==
                    int.Parse(userId!)
                    &&
                    w.ProductId == productId
                );

            if (exists)
            {
                return BadRequest(
                    "Ya existe"
                );
            }

            var item = new WishlistItem
            {
                UserId = int.Parse(userId!),
                ProductId = productId
            };

            _context.WishlistItems.Add(item);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpDelete("{productId}")]
        public async Task<IActionResult> RemoveFromWishlist(
            int productId
        )
        {
            var userId = User
                .FindFirst(
                    ClaimTypes.NameIdentifier
                )?.Value;

            var item = await _context.WishlistItems
                .FirstOrDefaultAsync(w =>
                    w.UserId ==
                    int.Parse(userId!)
                    &&
                    w.ProductId == productId
                );

            if (item == null)
            {
                return NotFound();
            }

            _context.WishlistItems.Remove(item);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}