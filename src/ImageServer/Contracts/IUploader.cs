using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ImageServer.Contracts
{
    public interface IUploader
    {
        Task<string> Upload(IFormFile image);
        Task<string> Replace(string name, IFormFile image);
        Task<string> Delete(string name);
        Task<IList<string>> UploadMany(IList<IFormFile> images);
    }
}
