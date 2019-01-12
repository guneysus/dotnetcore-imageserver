using ImageServer.Contracts;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Linq;

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
            ValidateOrThrowException(image);

            var filename = GetFilename(image);

            var fullpath = GetFullpath(filename);

            await CopyTo(image, fullpath);

            return filename;
        }

        private static void ValidateOrThrowException(IFormFile image)
        {
            if (image == null)
                throw new ArgumentNullException(nameof(image));

            if (image.Length == 0)
                throw new ArgumentOutOfRangeException(nameof(image));
        }

        private static void ValidateOrThrowException(IList<IFormFile> images)
        {
            if (images == null)
                throw new ArgumentNullException(nameof(images));

            if (!images.Any())
                throw new ArgumentOutOfRangeException(nameof(images));
        }

        async Task<IList<string>> IUploader.UploadMany(IList<IFormFile> images)
        {
            ValidateOrThrowException(images);

            IList<string> result = new List<string>();

            foreach (var image in images)
            {
                if (image.Length == 0)
                    continue;

                var filename = GetFilename(image);

                var fullpath = GetFullpath(filename);

                await CopyTo(image, fullpath);

                result.Add(filename);
            }

            return result;
        }

        private static async Task CopyTo(IFormFile image, string fullpath)
        {
            using (var stream = new FileStream(fullpath, FileMode.Create))
                await image.CopyToAsync(stream);
        }

        private string GetFullpath(string filename)
        {
            return Path.Combine(_hosting.WebRootPath, filename);
        }

        private static string GetFilename(IFormFile image)
        {
            return (Guid.NewGuid().ToString() + Path.GetExtension(image.FileName)).ToLower();
        }
    }
}
