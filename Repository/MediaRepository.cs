using Notebook_app.Data;
using Notebook_app.Interfaces;
using Notebook_app.Models;

namespace Notebook_app.Repository
{
    public class MediaRepository:IMediaRepository
    {
        private AppDbContext _context;

        

        public MediaRepository(AppDbContext context)
        {
            _context = context;
        }

        public void SaveToDb(Media media)
        {
            try
            {
                _context.Media.Add(media);
                _context.SaveChanges();
            }
            catch(Exception e) {
                Console.WriteLine("cannot able to store the media"+e);
            }   
           
        }
        public int savetodbforid(byte[] filedata)
        {

            Media media = new Media();
            media.Filedata = filedata;
            _context.Media.Add(media);
             _context.SaveChanges();
            return media.MediaId;

        }
        public Media fetchmedia(int id)
        {
            Media media = _context.Media
                          .FirstOrDefault(x => x.MediaId == id)!;
            return media;
        }
       
        public Media UpdatemediainDB(byte[] Filedata, Media m)
        {

            m.Filedata= Filedata;
            _context.SaveChanges();
            return m;
        }
        public Media Fetchmediabyuserid(Guid id)
        {
            Media media=_context.Media.FirstOrDefault(x => x.UserId == id);
            return media;
        }

    }
}
