
using Notebook_app.Models;

namespace Notebook_app.Interfaces
{
    public interface INotesRepository
    {
        public void SaveToDb(Notes note);

        public Notes GetNotes(int id);

        public int DeleteNotes(Notes note);

        public Notes UpdateNotes(Notes note);
    }
}
