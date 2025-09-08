using Fracto.Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace Fracto.Api.Data
{
    public class DataSeeder
    {
        private readonly FractoContext _ctx;
        public DataSeeder(FractoContext ctx) => _ctx = ctx;

        private static string Hash(string input)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(input));
            return Convert.ToHexString(bytes);
        }

        public async Task SeedAsync()
        {
            await _ctx.Database.MigrateAsync();

            if (!_ctx.Specializations.Any())
            {
                var specs = new[] {
                    new Specialization { SpecializationName = "General Physician" },
                    new Specialization { SpecializationName = "Cardiologist" },
                    new Specialization { SpecializationName = "Dermatologist" }
                };
                _ctx.Specializations.AddRange(specs);
                await _ctx.SaveChangesAsync();
            }

            if (!_ctx.Doctors.Any())
            {
                var gp = _ctx.Specializations.First(s => s.SpecializationName == "General Physician");
                var card = _ctx.Specializations.First(s => s.SpecializationName == "Cardiologist");
                var derm = _ctx.Specializations.First(s => s.SpecializationName == "Dermatologist");

                var docs = new[] {
                    new Doctor { Name = "Dr. Ravi Sharma", City = "Jaunpur", SpecializationId = gp.SpecializationId, Rating = 4.5 },
                    new Doctor { Name = "Dr. Meera Singh", City = "Lucknow", SpecializationId = card.SpecializationId, Rating = 4.8 },
                    new Doctor { Name = "Dr. Ankit Verma", City = "Varanasi", SpecializationId = derm.SpecializationId, Rating = 4.2 }
                };
                _ctx.Doctors.AddRange(docs);
                await _ctx.SaveChangesAsync();
            }

            if (!_ctx.Users.Any())
            {
                var users = new[] {
                    new User { Username = "user1", PasswordHash = Hash("password1"), Role = "User", City = "Jaunpur" },
                    new User { Username = "admin", PasswordHash = Hash("adminpass"), Role = "Admin", City = "Jaunpur" }
                };
                _ctx.Users.AddRange(users);
                await _ctx.SaveChangesAsync();
            }
        }
    }
}
