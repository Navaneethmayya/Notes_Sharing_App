using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations;
using Notebook_app.Interfaces;
using Notebook_app.Models;
using System.IO;
using System.Security.Claims;

namespace Notebook_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {

        private readonly IMediaService _mediaService;

        public FileController(IMediaService MediaService)
        {
            _mediaService = MediaService;
        }
        [Authorize]
        [HttpPost("upload")]
        public IActionResult Uploadmedia(IFormFile file)
        {
            try
            {
                
                byte[] filedata;
                string? claim_id = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                Guid id;
                if (Guid.TryParse(claim_id, out id))
                {
                    using (var memorystream = new MemoryStream())
                    {
                        file.CopyToAsync(memorystream);
                        filedata = memorystream.ToArray();
                        _mediaService.Uploadmedia(filedata, id);
                        return Ok("file uploaded successfully");
                    }

                }
                else
                {
                    return BadRequest("unable to parse to Guid");
                }
               
            }
            catch (Exception ex)
            {
                return BadRequest("file should not be empty" + ex.Message);
            }
        }

        [HttpGet("get/{id}")]
        public IActionResult Getmedia(int id)
        {
            try
            {

                byte[] res = _mediaService.Getmedia(id);
                Console.WriteLine("res is" + res);
                return File(res, "image/jpeg");

            }
            catch (Exception ex)
            {
                return BadRequest("Image not found" + ex);
            }


        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Updatemedia(IFormFile file,int id)
        {
            try
            {
                byte[] filedata;
                using (var memorystream = new MemoryStream())
                {
                   await file.CopyToAsync(memorystream);
                    filedata = memorystream.ToArray();
                }
                byte[] res= _mediaService.Updatemedia(filedata,id);
                if (res != null)
                {
                    

                    return File(res, "image/jpeg");
                }
                else
                {
                    return BadRequest("Failed to update image");
                }
                
            }
            catch (Exception ex)
            {
                return BadRequest("file should not be empty" + ex.Message);
            }
         
        }
       
        
    }
    }
