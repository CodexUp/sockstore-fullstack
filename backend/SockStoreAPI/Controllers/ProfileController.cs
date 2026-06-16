using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SockStoreAPI.Data;
using System.Security.Claims;
using SockStoreAPI.Models;

namespace SockStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProfileController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProfileController(
            AppDbContext context
        )
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProfile()
        {
            var userId =
                User.FindFirst(
                    ClaimTypes.NameIdentifier
                )?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            var user =
                _context.Users.Find(
                    int.Parse(userId)
                );

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile(
            User updatedUser
        )
        {
            var userId =
                User.FindFirst(
                    ClaimTypes.NameIdentifier
                )?.Value;

            if (userId == null)
            {
                return Unauthorized();
            }

            var user =
                await _context.Users.FindAsync(
                    int.Parse(userId)
                );

            if (user == null)
            {
                return NotFound();
            }

            user.Name = updatedUser.Name;

            user.Address = updatedUser.Address;

            user.Phone = updatedUser.Phone;

            await _context.SaveChangesAsync();

            return Ok(user);
        }
    }
}