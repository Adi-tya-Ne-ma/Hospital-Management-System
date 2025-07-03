using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HospitalManagementApi.Models
{

    public class Patient{
        [Key]
        [Required]
        public string Username { get; set; } // Primary key
        public string Name { get; set; }
        public string Address { get; set; } = string.Empty;	
        public string PhoneNumber { get; set; } = string.Empty;
    }
}