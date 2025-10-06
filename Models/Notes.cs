using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Notebook_app.Models
{
    public class Notes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int NotesId { get; set; }

        public string NotesData { get; set; } = "";
       
        public Guid UserId { get; set; }

        public User user { get;set; }

    }
}
