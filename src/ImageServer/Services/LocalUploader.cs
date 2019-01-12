using ImageServer.Contracts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace ImageServer.Services
{
    internal class LocalUploader : IUploader
    {
        private readonly IHostingEnvironment _hosting;

        public LocalUploader(IHostingEnvironment hosting)
        {
            _hosting = hosting;
        }

        async Task<string> IUploader.Upload(IFormFile image)
        {
            if (image == null)
                throw new ArgumentNullException(nameof(image));

            if (image.Length == 0)
                throw new ArgumentOutOfRangeException(nameof(image));

            var filename = Guid.NewGuid().ToString().ToLower() + Path.GetExtension(image.FileName);

            var fullpath = Path.Combine(_hosting.WebRootPath, filename);

            using (var stream = new FileStream(fullpath, FileMode.Create))
                await image.CopyToAsync(stream);

            return filename;
        }

        Task<IList<string>> IUploader.UploadMany(IList<IFormFile> images)
        {
            throw new NotImplementedException();
        }
    }
}
