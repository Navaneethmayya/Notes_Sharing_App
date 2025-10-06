using Notebook_app.DTO;
using Notebook_app.Interfaces;
using Notebook_app.Models;

namespace Notebook_app.Service
{
    public class NotesService:INotesService
    {
        private INotesRepository _repository;

        private IUserRepository _Urepository;
        public NotesService(INotesRepository repository,IUserRepository urepository)
        {
            _repository = repository;
            _Urepository = urepository;
        }

        public NotesDTO Uploadnotes(string notes,Guid UserId)
        {
            User user=_Urepository.GetbyId(UserId);
            if (user == null)
            {
                return null;
            }

            
            Notes note = new Notes();
            note.NotesData= notes;
            note.UserId=user.UserId;
            _repository.SaveToDb(note);
            NotesDTO res=new NotesDTO();
            res.NotesId = note.NotesId;
            res.NotesData = note.NotesData;
            res.username = user.Username;
            return res;
        }

        public string GetNotes(int id)
        {

            
                Notes note = _repository.GetNotes(id);
                Console.WriteLine("note is" + note);
            if (note == null)
            {
                return null;
            }
            else
            {
                return note.NotesData;
            }

        }
        public int DeleteNotes(int id)
        {
            Notes note=_repository.GetNotes(id);
            if (note == null)
            {
                return 0;
            }
          
             var res = _repository.DeleteNotes(note);
            return res;
            
        }
        public Notes UpdateNotes(int id, string NotesData) 
        {
            Notes note = _repository.GetNotes(id);
            if (note == null)
            {
                return null;
            }

            note.NotesData = NotesData;
            Notes res=_repository.UpdateNotes(note);
            return res;


            
        }


    }
}
