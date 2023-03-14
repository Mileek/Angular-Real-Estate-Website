using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Authenticate(string userName, string password);
        Task<bool> UserAlreadyExists(string userName);
        void Register(string userName, string password);
    }
}
