using System.ComponentModel.DataAnnotations;

public class User
{
    [Key] 
    public string Username { get; set; } // Unique username
    
    public string Name { get; set; } // Full name
    
    public string PhoneNumber { get; set; } // Contact number
    
    public string PasswordHash { get; set; } // Hashed password
    
	public string Role { get; set; } // "Doctor" or "Patient"
}