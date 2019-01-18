using ImageServer.Contracts;
using Microsoft.AspNetCore.Hosting;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Processing.Transforms;
using System;
using System.IO;

namespace ImageServer.Services
{
    public class Resizer : IResizer
    {
        private readonly IHostingEnvironment _hosting;
        private readonly IUploader _uploader;

        public Resizer(IHostingEnvironment hosting, IUploader uploader)
        {
            _hosting = hosting;
            _uploader = uploader;
        }

        private IImageEncoder EncoderFactory(string name, int quality)
        {
            var ext = Path.GetExtension(name);
            switch (ext){
                case ".png":
                    return new PngEncoder(); 
                case ".jpg":
                default:
                    return new JpegEncoder()
                    {
                        Quality = quality,
                        Subsample = JpegSubsample.Ratio444,
                        IgnoreMetadata = true
                    }; 
            }
        }

        void IResizer.ResizeFixedHeight(string name, int height, Stream stream, int quality)
        {
            height = height > 0 ? height : 0;

            var originalFileFullpath = Path.Combine(_hosting.WebRootPath, name);

            using (var image = Image.Load(originalFileFullpath))
            {
                var AR = (Convert.ToDouble(image.Width) / Convert.ToDouble(image.Height));

                var width = height > 0 ? Convert.ToInt32(Convert.ToDouble(height) * AR) : 0;

                if (height > 0 && width > 0)
                {
                    image.Mutate(x => x.Resize(width, height));
                }

                image.Save(stream, encoder: EncoderFactory(name, quality));
                stream.Position = 0;
            }
        }

        void IResizer.ResizeFixedWidth(string name, int width, Stream stream, int quality)
        {
            width = width > 0 ? width : 0;

            var originalFileFullpath = Path.Combine(_hosting.WebRootPath, name); 

            using (var image = Image.Load(originalFileFullpath))
            {
                var AR = (Convert.ToDouble(image.Width) / Convert.ToDouble(image.Height));

                var height = width > 0 ? Convert.ToInt32(Convert.ToDouble(width) * (1.0d / AR)) : 0;

                if (height > 0 && width > 0)
                {
                    image.Mutate(x => x.Resize(width, height));
                }

                image.Save(stream, encoder: EncoderFactory(name, quality));
                stream.Position = 0;
            }
        }
    }
}
