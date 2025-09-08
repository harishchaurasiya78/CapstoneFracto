namespace Fracto.Api.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "User";
        public string? City { get; set; }
        public string? ProfileImagePath { get; set; }

        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public ICollection<Rating> Ratings { get; set; } = new List<Rating>();
    }
}
