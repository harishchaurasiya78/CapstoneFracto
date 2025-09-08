using Fracto.Api.Data;
using Fracto.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly FractoContext _ctx;
        public AppointmentsController(FractoContext ctx) => _ctx = ctx;

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]int? userId, [FromQuery]int? doctorId)
        {
            var q = _ctx.Appointments.AsQueryable();
            if (userId.HasValue) q = q.Where(a => a.UserId == userId.Value);
            if (doctorId.HasValue) q = q.Where(a => a.DoctorId == doctorId.Value);
            return Ok(await q.ToListAsync());
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> Book(Appointment a)
        {
            a.Status = "Booked";
            _ctx.Appointments.Add(a);
            await _ctx.SaveChangesAsync();
            return Ok(a);
        }

        [HttpPost("{id:int}/cancel"), Authorize]
        public async Task<IActionResult> Cancel(int id)
        {
            var a = await _ctx.Appointments.FindAsync(id);
            if (a == null) return NotFound();
            a.Status = "Cancelled";
            await _ctx.SaveChangesAsync();
            return Ok(a);
        }

        [HttpPost("{id:int}/approve"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> Approve(int id)
        {
            var a = await _ctx.Appointments.FindAsync(id);
            if (a == null) return NotFound();
            a.Status = "Approved";
            await _ctx.SaveChangesAsync();
            return Ok(a);
        }
    }
}
