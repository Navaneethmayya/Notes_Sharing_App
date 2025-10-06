using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Notebook_app.DTO;
using Notebook_app.Interfaces;
using Notebook_app.Models;
using System.Runtime.ConstrainedExecution;
using System.Security.Claims;

namespace Notebook_app.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IJwtService _jwtService;

        public UsersController(IUserService userService,IJwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;

        }

        [HttpPost("register")]
        public User RegisterUser(UserDTO userdto)
        {
            User res = _userService.RegisterUser(userdto.Name, userdto.Email,userdto.Password,userdto.type,userdto.bio);
            return res;
        }
            [HttpPost("login")]
            public IActionResult LoginUser([FromBody] LoginDTO logindto) 
            {
                User user = _userService.login(logindto);

                if(user == null)
                {
                    return Unauthorized(new { message = "Invalid username or password" });
                }
                var token= _jwtService.GenerateToken(user);
                return Ok(token);
            }
        [HttpPut("updateemail/{username}")]
        public IActionResult updateEmail(string username,[FromBody]string email)
        {
            User user = _userService.updateEmail(username,email);
            if(user == null)
            {
                return NotFound(new {message="Email not updated"});
            }
            else
            {
                return Ok(user);
            }
        }
        [HttpDelete("delete/{username}")]
        public IActionResult deleteUser(string username)
        {
            User user = _userService.deleteUser(username);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }
            else
            {
                return Ok(user);
            }
        }
        //[HttpGet("authorize")]
        //public string Authorizeonlyuser()
        //{
        //    var name = User.FindFirst(ClaimTypes.Name)?.Value;
        //    var id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        //    return id;
        //}
       

        [Authorize]
        [HttpGet("getusermedia")]
        public IActionResult GetmediabyUser()
        {
            try
            {
                string? claim_id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                Guid id;
                if (Guid.TryParse(claim_id, out id))
                {
                    byte[] res = _userService.GetmediabyUser(id);
                    return File(res, "image/jpeg");
                }
                return NotFound("Invalid Guid format");

            }
            catch (Exception ex)
            {
                return BadRequest("not find user profile");
            }

        }
        [Authorize]
        [HttpPut("updateusermedia")]
        public IActionResult Updateusermedia(IFormFile file)
        {
            string? claim_id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            Guid id;
            if (Guid.TryParse(claim_id, out id))
            {
                try
                {
                    byte[] filedata;
                    using (var memorystream = new MemoryStream())
                    {
                        file.CopyToAsync(memorystream);
                        filedata = memorystream.ToArray();
                    }
                   byte[] res= _userService.Updateusermedia(id,filedata);
                   return File(res, "image/jpeg");
                }
                catch (Exception ex)
                {
                    return BadRequest("Something went wrong");
                }
                
            }
            return BadRequest("cannot update image");
        }


    }
}
