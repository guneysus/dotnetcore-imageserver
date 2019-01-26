using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using ImageServer.Contracts;
using System.Collections.Generic;
using ImageServer.Services;

namespace ImageServer.Controllers
{
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        private readonly IUploader _uploader;
        private readonly IUploader _s3;

        public UploadController(IUploader uploader, S3Uploader s3)
        {
            _uploader = uploader;
            _s3 = s3;
        }

        [HttpPost]
        public async Task<string> Upload(IFormFile image)
        {
            var result = await _uploader.Upload(image);
            var s3key = await _s3.Upload(image);
            return result;
        }

        [HttpPost("many")]
        public async Task<IList<string>> UploadMany(IList<IFormFile> image)
        {
            var result = await _uploader.UploadMany(image);
            return result;
        }

        [HttpPut("{name}")]
        public async Task<string> Put(string name, IFormFile image)
        {
            var result = await _uploader.Replace(name, image);
            return result;
        }

        [HttpDelete("{name}")]
        public async Task<string> Delete(string name)
        {
            var result = await _uploader.Delete(name);
            return result;
        }
    }
}
