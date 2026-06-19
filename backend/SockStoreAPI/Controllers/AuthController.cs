using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using SockStoreAPI.Auth;
using SockStoreAPI.Data;
using SockStoreAPI.Models;

namespace SockStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        private readonly JwtService _jwtService;

        public AuthController(
            AppDbContext context,
            JwtService jwtService
        )
        {
            _context = context;

            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(User user)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(
                    u => u.Email == user.Email
                );

            if (existingUser != null)
            {
                return BadRequest("El usuario ya existe");
            }

            user.Role = "User";

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginUser)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(
                    u =>
                        u.Email == loginUser.Email &&
                        u.Password == loginUser.Password
                );

            if (user == null)
            {
                return Unauthorized("Credenciales inválidas");
            }

            var token = _jwtService.GenerateToken(user);

            return Ok(new
            {
                token
            });
        }

        [HttpPut("make-admin/{email}")]
        public async Task<IActionResult> MakeAdmin(string email)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                return NotFound("Usuario no encontrado");
            }

            user.Role = "Admin";

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Usuario convertido en administrador",
                user.Email,
                user.Role
            });
        }
        
    }
}