using Fracto.Api.Data;
using Fracto.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Fracto.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpecializationsController : ControllerBase
    {
        private readonly FractoContext _ctx;
        public SpecializationsController(FractoContext ctx) => _ctx = ctx;

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _ctx.Specializations.ToListAsync());

        [HttpPost, Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(Specialization s)
        {
            _ctx.Specializations.Add(s);
            await _ctx.SaveChangesAsync();
            return Ok(s);
        }
    }
}
