using Notebook_app.Models;

namespace Notebook_app.Interfaces
{
    public interface IUserRepository
    {
        public void SaveToDb(User user);

        public void DeletefromDB(User user);
        public User GetByUsername(string UsernameorEmail, string password);

        public User GetOnlyUser(string username); 

        public User GetBy_Username(string username,string email);

        public User GetbyId(Guid id);
    }
}
