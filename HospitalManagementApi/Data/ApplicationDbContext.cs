using Microsoft.EntityFrameworkCore;
using HospitalManagementApi.Models;

namespace HospitalManagementApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Prescription>()
                .HasKey(p => p.PrescriptionId); // Use PrescriptionId as PK

            // No foreign key or relationship needed if you don't want it
        }
    }
}