namespace Fracto.Api.Models
{
    public class Rating
    {
        public int RatingId { get; set; }
        public int DoctorId { get; set; }
        public int UserId { get; set; }
        public int Stars { get; set; }
        public Doctor? Doctor { get; set; }
        public User? User { get; set; }
    }
}
