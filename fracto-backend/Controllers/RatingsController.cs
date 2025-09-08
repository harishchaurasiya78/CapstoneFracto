using Fracto.Api.Data;
using Fracto.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingsController : ControllerBase
    {
        private readonly FractoContext _ctx;
        public RatingsController(FractoContext ctx) => _ctx = ctx;

        [HttpGet("{doctorId:int}")]
        public async Task<IActionResult> GetForDoctor(int doctorId)
        {
            var ratings = await _ctx.Ratings.Where(r => r.DoctorId == doctorId).ToListAsync();
            if (ratings.Count > 0)
            {
                var avg = ratings.Average(r => r.Stars);
                var doc = await _ctx.Doctors.FindAsync(doctorId);
                if (doc != null) { doc.Rating = avg; await _ctx.SaveChangesAsync(); }
            }
            return Ok(ratings);
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> Add(Rating r)
        {
            _ctx.Ratings.Add(r);
            await _ctx.SaveChangesAsync();
            var ratings = await _ctx.Ratings.Where(x => x.DoctorId == r.DoctorId).ToListAsync();
            var doc = await _ctx.Doctors.FindAsync(r.DoctorId);
            if (doc != null && ratings.Count > 0)
            {
                doc.Rating = ratings.Average(x => x.Stars);
                await _ctx.SaveChangesAsync();
            }
            return Ok(r);
        }
    }
}
