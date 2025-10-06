using Notebook_app.Models;

namespace Notebook_app.Interfaces
{
    public interface IJwtService
    {
        public string GenerateToken(User user);
    }
}
