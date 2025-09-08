using Fracto.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Fracto.Api.Data
{
    public class FractoContext : DbContext
    {
        public FractoContext(DbContextOptions<FractoContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Doctor> Doctors => Set<Doctor>();
        public DbSet<Specialization> Specializations => Set<Specialization>();
        public DbSet<Appointment> Appointments => Set<Appointment>();
        public DbSet<Rating> Ratings => Set<Rating>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();
            modelBuilder.Entity<Doctor>()
                .HasOne(d => d.Specialization)
                .WithMany(s => s.Doctors)
                .HasForeignKey(d => d.SpecializationId);
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.User)
                .WithMany(u => u.Appointments)
                .HasForeignKey(a => a.UserId);
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Doctor)
                .WithMany(d => d.Appointments)
                .HasForeignKey(a => a.DoctorId);
        }
    }
}
