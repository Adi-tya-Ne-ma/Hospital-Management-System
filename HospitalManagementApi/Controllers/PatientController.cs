using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementApi.Data;
using HospitalManagementApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace HospitalManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PatientController(ApplicationDbContext context)
        {
            _context = context;
        }

        // // GET: api/patient
        // [HttpGet]
        // public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        // {
        //     return await _context.Patients.ToListAsync();
        // }

        // GET: api/patient/{username}
        [HttpGet("{username}")]
        public async Task<ActionResult<Patient>> GetPatientByUsername(string username)
        {
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Username == username);
            if (patient == null)
            {
                return NotFound("Patient not found.");
            }
            return patient;
        }

        // POST: api/patient
        // [HttpPost]
        // public async Task<ActionResult> CreatePatient([FromBody] Patient patient)
        // {
        //     if (patient == null)
        //     {
        //         return BadRequest("Invalid patient data.");
        //     }

        //     _context.Patients.Add(patient);
        //     await _context.SaveChangesAsync();
        //     return Ok("Patient created successfully.");
        // }

        // PUT: api/patient/{username}
        [HttpPut("{username}")]
        public async Task<ActionResult> UpdatePatient(string username, [FromBody] Patient updatedPatient)
        {
            // Console.WriteLine($"Received update for {username}: {updatedPatient.Name}, {updatedPatient.Address}, {updatedPatient.PhoneNumber}");

            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Username == username);
            if (patient == null)
            {
                return NotFound("Patient not found.");
            }
            var user = await _context.Users.FirstOrDefaultAsync(p => p.Username == username);

            patient.Name = updatedPatient.Name;
            patient.Address = updatedPatient.Address;
            patient.PhoneNumber = updatedPatient.PhoneNumber;
            user.Name = updatedPatient.Name;
            user.PhoneNumber = updatedPatient.PhoneNumber;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Patient updated successfully." });
        }

        // DELETE: api/patient/{username}
        [HttpDelete("{username}")]
        public async Task<ActionResult> DeletePatient(string username)
        {
            var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Username == username);
            if (patient == null)
            {
                return NotFound("Patient not found.");
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Patient deleted successfully." });
        }
    }
}