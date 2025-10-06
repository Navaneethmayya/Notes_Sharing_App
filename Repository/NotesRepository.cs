using Microsoft.EntityFrameworkCore;
using Notebook_app.Data;
using Notebook_app.Interfaces;
using Notebook_app.Models;

namespace Notebook_app.Repository
{
    public class NotesRepository : INotesRepository
    {
        private AppDbContext _context;

        public NotesRepository(AppDbContext context)
        {
            _context = context;
        }
        public void SaveToDb(Notes notes)
        {
            _context.Notes.Add(notes);
            _context.SaveChanges();
        }
        public Notes GetNotes(int id)
        {
            try
            {
                Notes notes = _context.Notes
                          .FirstOrDefault(x => x.NotesId == id)!;
                return notes;
            }
            catch(Exception e)
            {
                return null;
            }
            
        }
        public int DeleteNotes(Notes note)
        {
            var deletedId = note.NotesId;
            _context.Remove(note);
            _context.SaveChanges();
            return deletedId;
        }
        public Notes UpdateNotes(Notes note)
        {
            _context.Update(note);
            _context.SaveChanges();
            return note;
        }
    }
}
