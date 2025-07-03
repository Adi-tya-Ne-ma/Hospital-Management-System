// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Mvc;

// namespace HospitalManagementApi.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class RoleController : ControllerBase
//     {
//         [Authorize(Roles = "doctor")]
//         [HttpGet("doctor-only")]
//         public IActionResult DoctorOnlyEndpoint()
//         {
//             return Ok("This endpoint is accessible only by doctors.");
//         }

//         [Authorize(Roles = "patient")]
//         [HttpGet("patient-only")]
//         public IActionResult PatientOnlyEndpoint()
//         {
//             return Ok("This endpoint is accessible only by patients.");
//         }
//     }
// }