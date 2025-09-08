using Fracto.Api.Data;
using Fracto.Api.Models;
using Fracto.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fracto.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly FractoContext _ctx;
        private readonly FileService _files;

        public DoctorsController(FractoContext ctx, FileService files)
        {
            _ctx = ctx;
            _files = files;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string? city, [FromQuery] int? specializationId, [FromQuery] double? minRating)
        {
            var q = _ctx.Doctors.Include(d => d.Specialization).AsQueryable();
            if (!string.IsNullOrWhiteSpace(city)) q = q.Where(d => d.City == city);
            if (specializationId.HasValue) q = q.Where(d => d.SpecializationId == specializationId.Value);
            if (minRating.HasValue) q = q.Where(d => d.Rating >= minRating.Value);

            var list = await q.Select(d => new {
                d.DoctorId,
                d.Name,
                d.City,
                d.Rating,
                d.SpecializationId,
                Specialization = d.Specialization!.SpecializationName,
                d.ProfileImagePath
            }).ToListAsync();

            return Ok(list);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var d = await _ctx.Doctors.Include(x => x.Specialization).FirstOrDefaultAsync(x => x.DoctorId == id);
            if (d == null) return NotFound();

            return Ok(new {
                d.DoctorId,
                d.Name,
                d.City,
                d.Rating,
                d.SpecializationId,
                Specialization = d.Specialization?.SpecializationName,
                d.ProfileImagePath
            });
        }

        [HttpPost, Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromForm] Doctor doc, IFormFile? image)
        {
            if (image != null)
            {
                if (!image.ContentType.StartsWith("image/"))
                    return BadRequest("Only image files are allowed.");

                if (image.Length > 2 * 1024 * 1024)
                    return BadRequest("File too large. Max size is 2MB.");

                doc.ProfileImagePath = await _files.SaveFileAsync(image);
            }

            _ctx.Doctors.Add(doc);
            await _ctx.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = doc.DoctorId }, doc);
        }

        [HttpPut("{id:int}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, Doctor doc)
        {
            var existing = await _ctx.Doctors.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Name = doc.Name;
            existing.City = doc.City;
            existing.Rating = doc.Rating;
            existing.SpecializationId = doc.SpecializationId;

            await _ctx.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var d = await _ctx.Doctors.FindAsync(id);
            if (d == null) return NotFound();

            _ctx.Doctors.Remove(d);
            await _ctx.SaveChangesAsync();
            return NoContent();
        }
    }
}
