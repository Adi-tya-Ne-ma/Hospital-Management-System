using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using HospitalManagementApi.Models;
using HospitalManagementApi.Data;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;


// [ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> Signup([FromBody] SignupRequest request)
    {
        // if (!ModelState.IsValid)
        // {
        //     Console.WriteLine("===== ModelState Errors =====");
        //     foreach (var entry in ModelState)
        //     {
        //         foreach (var error in entry.Value.Errors)
        //         {
        //             Console.WriteLine($"Field: {entry.Key}, Error: {error.ErrorMessage}");
        //         }
        //     }
        //     return BadRequest(ModelState);
        // }

        // Console.WriteLine("==> Inside SIGNUP endpoint");

        // if (request == null)
        // {
        //     Console.WriteLine("SignupRequest object is null (model binding failed).");
        //     return BadRequest("Request body is invalid or missing.");
        // }

        // Console.WriteLine("Signup request received:");
        // Console.WriteLine($"Name: {request.Name}");
        // // if (string.IsNullOrEmpty(request.Name))
        // // {
        // //     Console.WriteLine("Name is null or empty!");
        // //     return BadRequest("Name is required.");
        // // }

        // Console.WriteLine($"Username: {request.Username}");
        // Console.WriteLine($"Phone: {request.PhoneNumber}");
        // Console.WriteLine($"Password: {request.Password}");
        // Console.WriteLine($"Role: {request.Role}");

        // if (request == null)
        // {
        //     Console.WriteLine("Request is null!");
        //     return BadRequest("Request body is null");
        // }

        // // Check role string for null or case issues
        // if (string.IsNullOrEmpty(request.Role))
        // {
        //     Console.WriteLine("Role is null or empty");
        //     return BadRequest("Role is required");
        // }

        // if (request.Role.ToLower() != "doctor" && request.Role.ToLower() != "patient")
        // {
        //     return BadRequest("Invalid role. Must be 'doctor' or 'patient'.");
        // }
        // Console.WriteLine("Role validated");

        // // Check if username is null or empty
        // if (string.IsNullOrEmpty(request.Username))
        // {
        //     Console.WriteLine("Username is null or empty");
        //     return BadRequest("Username is required");
        // }
        // Console.WriteLine("Username validated");

        // Now check if user exists
        var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
        Console.WriteLine($"Existing user found? {existingUser != null}");
        if (existingUser != null)
        {
            return BadRequest("Username already exists.");
        }

        // Create User object — watch out for null fields here!
        var user = new User
        {
            Name = request.Name,
            Username = request.Username,
            PhoneNumber = request.PhoneNumber,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = request.Role
        };
        // Console.WriteLine("User object created");

        _context.Users.Add(user);
        // Console.WriteLine("User added to context");

        if (request.Role.ToLower() == "doctor")
        {
            var doctor = new Doctor
            {
                Username = request.Username,
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Specialization = "General",
                Address = string.Empty
            };
            _context.Doctors.Add(doctor);
            Console.WriteLine("Doctor added");
        }
        else if (request.Role.ToLower() == "patient")
        {
            var patient = new Patient
            {
                Username = request.Username,
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Address = string.Empty
            };
            _context.Patients.Add(patient);
            Console.WriteLine("Patient added");
        }

        await _context.SaveChangesAsync();
        Console.WriteLine("Changes saved");

        return Ok(new { message = "Signup successful!" });

    }


    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        // Find the user by username and role
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username && u.Role == request.Role);
        if (user == null)
        {
            return Unauthorized("Invalid username or role.");
        }

        // Verify the password
        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return Unauthorized("Invalid password.");
        }

        // Generate a JWT token
        var token = GenerateJwtToken(user);

        // Return the token, role, and optional dashboard URL
        var dashboardUrl = user.Role == "doctor" ? "/doctor-dashboard" : "/patient-dashboard";

        return Ok(new
        {
            Token = token,
            Role = user.Role,
            Name = user.Name,
            DashboardUrl = dashboardUrl
        });
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}