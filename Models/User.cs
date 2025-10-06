using System.ComponentModel.DataAnnotations;

namespace Notebook_app.Models
{
    public class User
    {

        public Guid UserId { get; set; } = Guid.NewGuid();
        public string Name { get; set; }

        public string Username { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        public string Type { get; set; }

        public string Bio { get; set; }

        public ICollection<Notes>notes { get; set; }  = new List<Notes>();

        public ICollection<Media> Medias { get; set; }=new List<Media>();

        //public int MediaId { get; set; }




    }
}
