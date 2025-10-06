using Notebook_app.DTO;
using Notebook_app.Models;

namespace Notebook_app.Interfaces
{
    public interface INotesService
    {
        public NotesDTO Uploadnotes(string notes,Guid UserId);

        public string GetNotes(int id);

        public int DeleteNotes(int id);

        public Notes UpdateNotes(int id, string NotesData);
    }
}
