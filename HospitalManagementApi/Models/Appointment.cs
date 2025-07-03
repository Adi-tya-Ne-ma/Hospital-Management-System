using System;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementApi.Models
{
    public class Appointment
    {
        [Key]
        public int AppointmentId { get; set; }
        [Required]
        public string DoctorUsername { get; set; } // Reference to Doctor's Username
        [Required]
        public string PatientUsername { get; set; } // Reference to Patient's Username
        [Required]
        public string Date { get; set; }
        [Required]
        public string Time { get; set; }
        // public string? Status { get; set; }
    }
}