using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ImageServer.Contracts
{
    public interface IUploader
    {
        Task<string> Upload(IFormFile image);
        Task<IList<string>> UploadMany(IList<IFormFile> images);
    }
}
