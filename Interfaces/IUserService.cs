

using Notebook_app.DTO;
using Notebook_app.Models;

namespace Notebook_app.Interfaces
{
    public interface IUserService
    {
        public User RegisterUser(string username, string email,string password,string bio,string type);
        public User login(LoginDTO loginDTO);

        public User updateEmail(string username, string email);

        public User deleteUser(string username);

        public byte[] GetmediabyUser(Guid id);

        public byte[] Updateusermedia(Guid id, byte[] filedata);
    }
}
