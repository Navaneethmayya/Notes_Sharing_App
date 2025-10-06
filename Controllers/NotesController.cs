using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Notebook_app.DTO;
using Notebook_app.Interfaces;
using Notebook_app.Models;

namespace Notebook_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INotesService _notesService;

        public NotesController(INotesService NotesService)
        {
            _notesService = NotesService;
        }
        [HttpPost("Upload/notes")]
        public IActionResult UploadNotes(string notes,Guid UserId)
        {
            NotesDTO res=_notesService.Uploadnotes(notes, UserId);
            return Ok(res);
        }
        [HttpGet("{id}")]
        public IActionResult GetNotes(int id)
        {
            
                string res = _notesService.GetNotes(id);
            if (res == null)
            {
                return NotFound("not found");
            }
                return Ok(res);                 
            

        }
        [HttpDelete("{id}")]
        public IActionResult DeleteNotes(int id)
        {

            int res = _notesService.DeleteNotes(id);
            if (res == 0)
            {
                return NotFound("Notes not found");
            }
            return Ok(res);
        }

        [HttpPut("update")]
        public IActionResult UpdateNotes(int id,string NotesData)
        {
            try
            {
                Notes note = _notesService.UpdateNotes(id, NotesData);
                if (note == null)
                {
                    return NotFound(id+" Not found");
                }
                return Ok(note);
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong");
            }

        }

    }
}
