using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HospitalManagementApi.Data;
using HospitalManagementApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace HospitalManagementApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DoctorController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/doctor
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            return await _context.Doctors.ToListAsync();
        }

        // GET: api/doctor/{username}
        [HttpGet("{username}")]
        public async Task<ActionResult<Doctor>> GetDoctorByUsername(string username)
        {
            var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Username == username);
            if (doctor == null)
            {
                return NotFound("Doctor not found.");
            }
            return doctor;
        }

        // POST: api/doctor
        // [HttpPost]
        // public async Task<ActionResult> CreateDoctor([FromBody] Doctor doctor)
        // {
        //     if (doctor == null)
        //     {
        //         return BadRequest("Invalid doctor data.");
        //     }

        //     _context.Doctors.Add(doctor);
        //     await _context.SaveChangesAsync();
        //     return Ok("Doctor created successfully.");
        // }

        // PUT: api/doctor/{username}
        [HttpPut("{username}")]
        public async Task<ActionResult> UpdateDoctor(string username, [FromBody] Doctor updatedDoctor)
        {
            if (updatedDoctor == null)
            {
                return BadRequest("The updatedDoctor field is required.");
            }
            var user = await _context.Users.FirstOrDefaultAsync(d => d.Username == username);
            var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Username == username);
            if (doctor == null)
            {
                return NotFound("Doctor not found.");
            }

            Console.WriteLine($"Updating doctor: {updatedDoctor.Photo}");

            // Update doctor details
            doctor.Name = updatedDoctor.Name;
            doctor.Specialization = updatedDoctor.Specialization;
            doctor.Address = updatedDoctor.Address;
            doctor.PhoneNumber = updatedDoctor.PhoneNumber;
            doctor.Photo = updatedDoctor.Photo;
            user.Name = updatedDoctor.Name;
            user.PhoneNumber = updatedDoctor.PhoneNumber;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Doctor updated successfully." });
        }

        // DELETE: api/doctor/{username}
        [HttpDelete("{username}")]
        public async Task<ActionResult> DeleteDoctor(string username)
        {
            var doctor = await _context.Doctors.FirstOrDefaultAsync(d => d.Username == username);
            if (doctor == null)
            {
                return NotFound("Doctor not found.");
            }

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Doctor deleted successfully." });
        }

        // GET: api/doctor/search
        [Authorize(Roles = "patient")]
        [HttpGet("search")]
        public async Task<IActionResult> SearchDoctors([FromQuery] string specialization)
        {
            if (string.IsNullOrEmpty(specialization))
            {
                return BadRequest("Specialization is required.");
            }

            // Convert both the specialization and database values to lowercase for case-insensitive comparison
            var doctors = await _context.Doctors
                .Where(d => d.Specialization.ToLower().Contains(specialization.ToLower()))
                .Select(d => new
                {
                    d.Username,
                    d.Name,
                    d.Specialization,
                    d.Address,
                    d.Photo
                })
                .ToListAsync();

            return Ok(doctors);
        }
    }
}