using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using ImageServer.Contracts;
using System.Collections.Generic;

namespace ImageServer.Controllers
{
    public class UploadController : Controller
    {
        private readonly IUploader _uploader;

        public UploadController(IUploader uploader)
        {
            _uploader = uploader;
        }

        [HttpPost("upload")]
        public async Task<string> Upload(IFormFile image)
        {
            var result = await _uploader.Upload(image);
            return result;
        }

        [HttpPost("upload-many")]
        public async Task<IList<string>> UploadMany(IList<IFormFile> images)
        {
            var result = await _uploader.UploadMany(images);
            return result;
        }
    }
}
