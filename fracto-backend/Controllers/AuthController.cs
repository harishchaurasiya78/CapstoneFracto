using Fracto.Api.Data;
using Fracto.Api.Dtos;
using Fracto.Api.Models;
using Fracto.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace Fracto.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly FractoContext _ctx;
        private readonly JwtService _jwt;
        private readonly FileService _files;

        public AuthController(FractoContext ctx, JwtService jwt, FileService files)
        {
            _ctx = ctx; _jwt = jwt; _files = files;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _ctx.Users.AnyAsync(u => u.Username == dto.Username))
                return BadRequest("Username already exists");

            var user = new User
            {
                Username = dto.Username,
                PasswordHash = Hash(dto.Password),
                City = dto.City,
                Role = string.IsNullOrWhiteSpace(dto.Role) ? "User" : dto.Role!
            };

            // Note: Profile image upload is not handled here, as it requires a different approach with [FromBody]

            _ctx.Users.Add(user);
            await _ctx.SaveChangesAsync();
            return Ok(new { user.UserId, user.Username, user.Role, user.City, user.ProfileImagePath });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _ctx.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
            if (user == null || user.PasswordHash != Hash(dto.Password))
                return Unauthorized("Invalid credentials");

            var token = _jwt.GenerateToken(user.UserId, user.Username, user.Role);
            return Ok(new { token, user = new { user.UserId, user.Username, user.Role } });
        }

        private static string Hash(string input)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(input));
            return Convert.ToHexString(bytes);
        }
    }
}