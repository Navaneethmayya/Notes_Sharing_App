using Notebook_app.Models;

namespace Notebook_app.Interfaces
{
    public interface IMediaService
    {
        public void Uploadmedia(byte[] Filedata,Guid id);

        public byte[] Getmedia(int Id);

        public byte[] Updatemedia(byte[] Filedata, int id);

        public int fetchid(byte[] filedata);

        public Media Fetchmediabyuserid(Guid id);





        //public string Deletemedia(int Id);

        //public string Updatemedia(int Id, byte[] Filedata);
    }
}
