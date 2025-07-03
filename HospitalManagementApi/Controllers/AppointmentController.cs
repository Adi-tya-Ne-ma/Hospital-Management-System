using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementApi.Data;
using HospitalManagementApi.Models;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

namespace HospitalManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/appointment/book
        [Authorize(Roles = "patient")]
        [HttpPost("book")]
        public async Task<IActionResult> BookAppointment([FromBody] Appointment appointment)
        {
            if (appointment == null)
            {
                return BadRequest("Invalid appointment data.");
            }

            // // Validate DoctorUsername
            // var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Username == appointment.DoctorUsername);
            // if (doctor == null)
            // {
            //     return NotFound("Doctor not found.");
            // }

            // // Validate PatientUsername
            // var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Username == appointment.PatientUsername);
            // if (patient == null)
            // {
            //     return NotFound("Patient not found.");
            // }

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            // After saving appointment in BookAppointment
            using (var client = new HttpClient())
            {
                var payload = new
                {
                    doctorUsername = appointment.DoctorUsername,
                    patientUsername = appointment.PatientUsername,
                    date = appointment.Date,
                    time = appointment.Time
                };
                var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");
                await client.PostAsync("http://localhost:4000/notify-doctor", content);
            }

            return Ok(new { message = "Appointment booked successfully." });
        }

        // GET: api/appointment/doctor/{username}
        [Authorize(Roles = "doctor")]
        [HttpGet("doctor/{username}")]
        public async Task<IActionResult> GetDoctorAppointments(string username)
        {
            // Validate DoctorUsername
            var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Username == username);
            if (doctor == null)
            {
                return NotFound("Doctor profile not found.");
            }

            // Fetch appointments for the doctor
            var appointments = await _context.Appointments
                .Where(a => a.DoctorUsername == username)
                .ToListAsync();

            return Ok(appointments);
        }

        // GET: api/appointment/patient/{username}
        [Authorize(Roles = "patient")]
        [HttpGet("patient/{username}")]
        public async Task<IActionResult> GetPatientAppointments(string username)
        {
            // Validate PatientUsername
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Username == username);
            if (patient == null)
            {
                return NotFound("Patient profile not found.");
            }

            // Fetch appointments for the patient
            var appointments = await _context.Appointments
                .Where(a => a.PatientUsername == username)
                .ToListAsync();

            return Ok(appointments);
        }

        // PUT: api/appointment/patient/{username}
        [Authorize(Roles = "patient")]
        [HttpPut("patient/{username}")]
        public async Task<IActionResult> UpdateAppointment(string username, [FromBody] Appointment updatedAppointment)
        {
            // Find the appointment by PatientUsername
            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.PatientUsername == username);
            if (appointment == null)
            {
                return NotFound("Appointment not found.");
            }

            // Update appointment details
            appointment.Date = updatedAppointment.Date;
            appointment.Time = updatedAppointment.Time;

            await _context.SaveChangesAsync();
            return Ok("Appointment updated successfully.");
        }

        // DELETE: api/appointment/patient/{username}
        [Authorize(Roles = "patient")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointmentById(int id)
        {
            var prescriptions = await _context.Prescriptions.Where(p => p.AppointmentId == id).ToListAsync();

            foreach (var p in prescriptions)
            {
                _context.Prescriptions.Remove(p);
            }

            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.AppointmentId == id);
            if (appointment == null)
            {
                return NotFound("Appointment not found.");
            }

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Appointment deleted successfully." });
        }


        // POST: api/prescription/bulk/{appointmentId}
        [Authorize(Roles = "doctor")]
        [HttpPost("prescription/bulk/{appointmentId}")]
        public async Task<IActionResult> WriteBulkPrescriptions(int appointmentId, [FromBody] List<PrescriptionDto> prescriptions)
        {
            if (prescriptions == null || prescriptions.Count == 0)
                return BadRequest("No prescriptions provided.");

            foreach (var dto in prescriptions)
            {
                var prescription = new Prescription
                {
                    AppointmentId = appointmentId,
                    Medicine = dto.Medicine,
                    Dosage = dto.Dosage,
                    Schedule = dto.Schedule,
                    Notes = dto.Notes ?? string.Empty
                };

                _context.Prescriptions.Add(prescription);
            }
            await _context.SaveChangesAsync();

            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);
            if (appointment != null)
            {
                using var httpClient = new HttpClient();
                var notifyPayload = new
                {
                    patientUsername = appointment.PatientUsername,
                    doctorUsername = appointment.DoctorUsername,
                    date = appointment.Date,
                    time = appointment.Time
                };
                await httpClient.PostAsJsonAsync("http://localhost:4000/notify-patient", notifyPayload);
            }

            return Ok(new { message = "Prescriptions added successfully." });
        }

        // GET: api/appointment/prescriptions/{appointmentId}
        [Authorize(Roles = "doctor, patient")]
        [HttpGet("prescriptions/{appointmentId}")]
        public async Task<IActionResult> GetPrescriptionsByAppointmentId(int appointmentId)
        {
            var prescriptions = await _context.Prescriptions
                .Where(p => p.AppointmentId == appointmentId)
                .ToListAsync();

            if (prescriptions == null || prescriptions.Count == 0)
            {
                return NotFound("No prescriptions found for this appointment.");
            }

            return Ok(prescriptions);
        }

        // GET: api/appointment/{appointmentId}
        [Authorize(Roles = "doctor,patient")]
        [HttpGet("{appointmentId}")]
        public async Task<IActionResult> GetAppointmentById(int appointmentId)
        {
            var appointment = await _context.Appointments.FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);
            if (appointment == null)
            {
                return NotFound("Appointment not found.");
            }
            return Ok(appointment);
        }
    }
}