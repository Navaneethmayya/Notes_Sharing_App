using Microsoft.EntityFrameworkCore;
using Notebook_app.DTO;
using Notebook_app.Interfaces;
using Notebook_app.Models;

namespace Notebook_app.Service
{
    public class UserService : IUserService
    {
        private IUserRepository _repository;


        private IMediaService _mediaService;

        private IMediaRepository _mediaRepository;

        public UserService(IUserRepository repository, IMediaService MediaService, IMediaRepository mediaRepository)
        {
            _repository = repository;
            _mediaService = MediaService;
            _mediaRepository = mediaRepository;
        }
        public User RegisterUser(string name, string email,string password,string type,string bio)
        {
            User user = new User();
            user.Email = email;
            user.Name = name;
            user.Password = password;
            user.Type = type;
            user.Bio = bio;

            string generatedUsername=GenerateUsername(name);
            user.Username= generatedUsername;
            _repository.SaveToDb(user);

            return user;
       
        }
        public string GenerateUsername(string name)
        {
            Random random = new Random();
            int randomNumber = random.Next(1,100);
            int nameLenRandom = name.Length*randomNumber;
            string newusername = name + randomNumber.ToString() + nameLenRandom.ToString();
            return newusername;
        }

        public User login(LoginDTO loginDTO)
        {
            User user = _repository.GetByUsername(loginDTO.UsernameorEmail,loginDTO.Password);
            return user;
        }

        public User updateEmail(string username,string email)
        {
            User user=_repository.GetBy_Username(username,email);
       
            return user;

        }
        public User deleteUser(string username)
        {
            User user = _repository.GetOnlyUser(username);
            if (user != null)
            {
                _repository.DeletefromDB(user);
            }
            return user;
        }

        public byte[] GetmediabyUser(Guid id)
        {
            Media media=_mediaService.Fetchmediabyuserid(id);
            if (media != null)
            {
                return media.Filedata;
            }
            return null;


        }
        public byte[] Updateusermedia(Guid id, byte[] filedata)
        {

            Media media = _mediaService.Fetchmediabyuserid(id);
            if (media == null)
            {
                _mediaService.Uploadmedia(filedata, id);
                return filedata;
                

            }
            media.Filedata = filedata;
            
            byte[] res=_mediaService.Updatemedia(filedata, media.MediaId);
            return res;

        }
    }

}
