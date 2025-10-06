using Notebook_app.Models;

namespace Notebook_app.Interfaces
{
    public interface IMediaRepository
    {
        public void SaveToDb(Media media);

        public Media fetchmedia(int id);

        public Media UpdatemediainDB(byte[] Filedata,Media media);

        public int savetodbforid(byte[] filedata);

        public Media Fetchmediabyuserid(Guid id);
    }
}
