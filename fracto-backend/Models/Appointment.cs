using System;

namespace Fracto.Api.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        public int UserId { get; set; }
        public int DoctorId { get; set; }
        public DateOnly AppointmentDate { get; set; }
        public string TimeSlot { get; set; } = string.Empty;
        public string Status { get; set; } = "Booked";

        public User? User { get; set; }
        public Doctor? Doctor { get; set; }
    }
}
