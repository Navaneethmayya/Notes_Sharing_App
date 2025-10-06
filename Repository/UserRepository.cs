using Notebook_app.Data;
using Notebook_app.Interfaces;
using Notebook_app.Models;

namespace Notebook_app.Repository
{
    public class UserRepository : IUserRepository
    {
        private AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public User GetByUsername(string UsernameorEmail, string password)
        {
            User user = _context.Users
                          .FirstOrDefault(x => (x.Username == UsernameorEmail || x.Email==UsernameorEmail) && x.Password == password)!;
                          
                          
            return user;
        }
        public User GetBy_Username(string username,string email)
        {
            User user = _context.Users
                          .FirstOrDefault(x => x.Username == username)!;

            user.Email = email;        
            return user;
        }
        public User GetOnlyUser(string username)
        {
            User user = _context.Users
                           .FirstOrDefault(x => x.Username == username)!;
            return user;
        }
        public void SaveToDb(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }
        public void DeletefromDB(User user)
        {
            _context.Remove(user);
            _context.SaveChanges();
        }

        public User GetbyId(Guid id)
        {
            User user = _context.Users
                           .FirstOrDefault(x => x.UserId == id)!;
            if (user!=null)
            {
                return user;
            }
            return null;
            
        }
        
    }
}
