using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class SignupRequest
{
    [Required][JsonPropertyName("name")]
    public string Name { get; set; } // Full name
    [Required][JsonPropertyName("username")]
    public string Username { get; set; } // Unique username
    [Required][JsonPropertyName("phoneNumber")]
    public string PhoneNumber { get; set; } // Contact number
    [Required][JsonPropertyName("password")]
    public string Password { get; set; } // Plaintext password
    [Required][JsonPropertyName("role")]
    public string Role { get; set; } // "Doctor" or "Patient"
}