using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Notebook_app.Models
{
    public class Media
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MediaId { get; set; }

        public byte[] Filedata { get; set; }


        public string Mediatype { get; set; } = "";


        public Guid UserId { get; set; }

        public User user { get; set; }

    }
}
