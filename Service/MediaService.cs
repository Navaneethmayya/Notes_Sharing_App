using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Notebook_app.Interfaces;
using Notebook_app.Models;

namespace Notebook_app.Service
{
    public class MediaService : IMediaService
    {
        private IMediaRepository _repository;

        public MediaService(IMediaRepository repository)
        {
            _repository = repository;
        }

        //public string Deletemedia(int Id)
        //{
        //    throw new NotImplementedException();
        //}

        //public byte[] Getmedia(int Id)
        //{
        //    throw new NotImplementedException();
        //}

        //public string Updatemedia(int Id, byte[] Filedata)
        //{
        //    throw new NotImplementedException();
        //}

        public void Uploadmedia(byte[] Filedata, Guid id)
        {
            Media media = new Media();
            media.UserId = id;
            media.Filedata = Filedata;
            _repository.SaveToDb(media);
            
        }

        public byte[] Getmedia(int id)
        {
            Media media=_repository.fetchmedia(id);
            if (media!=null)
            {
                return media.Filedata;
            }
            else
            {
                return null;
            }
        }
        public byte[] Updatemedia(byte[] Filedata, int id)
        {
            Media media = _repository.fetchmedia(id);
            if (media != null)
            {
                 Media m=_repository.UpdatemediainDB(Filedata,media);

                 return m.Filedata;

            }
            return null;
        }

        public int fetchid(byte[] filedata)
        {

           return _repository.savetodbforid(filedata);

        }
        public Media Fetchmediabyuserid(Guid id)
        {
            Media media=_repository.Fetchmediabyuserid(id);
            if (media != null)
            {
                return media;
            }
            return null;
        }
    }
     
    }
