using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace HospitalManagementApi.Models
{
    public class Prescription
    {
        [Key]
        public int PrescriptionId { get; set; } // Unique for each prescription
        
        [ForeignKey("Appointment")]
        public int AppointmentId { get; set; } // Just a regular property

        [JsonIgnore][BindNever]
        public virtual Appointment? Appointment { get; set; }

        [Required]
        public string Medicine { get; set; }
        [Required]
        public string Dosage { get; set; }
        [Required]
        public string Schedule { get; set; }
        public string Notes { get; set; } = String.Empty;
    }
}