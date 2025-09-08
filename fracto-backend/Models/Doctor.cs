namespace Fracto.Api.Models
{
    public class Doctor
    {
        public int DoctorId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int SpecializationId { get; set; }
        public string City { get; set; } = string.Empty;
        public double Rating { get; set; } = 0.0;
        public string? ProfileImagePath { get; set; }

        public Specialization? Specialization { get; set; }
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
