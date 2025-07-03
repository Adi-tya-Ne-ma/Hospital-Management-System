using System;
using System.ComponentModel.DataAnnotations;

namespace HospitalManagementApi.Models
{
    public class Doctor
    {
        [Key]
        [Required]
        public string Username { get; set; } // Primary key
        public string Name { get; set; }
        public string Specialization { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Photo { get; set; } = string.Empty;
    }
}