using Microsoft.AspNetCore.Mvc;
using ImageServer.Contracts;
using System.IO;

namespace ImageServer.Controllers
{
    [Route("image")]
    public class ImageController : Controller
    {
        private readonly IResizer _resizer;

        public ImageController(IResizer resizer)
        {
            _resizer = resizer;
        }

        [HttpGet("h{height:regex(^(0|160|240|320|480|640|720|768|1024|1200|1600)$)}/{name}")]
        [HttpGet("h{height:int}/{name}")]
        public IActionResult FixedHeight(string name, int height, int quality = 95)
        {
            Stream stream = new MemoryStream();
            _resizer.ResizeFixedHeight(name, height, stream, quality);

            var result = File(stream, contentType: contentTypeFactory(name));
            return result;
        }


        [HttpGet("w{width:regex(^(0|160|240|320|480|640|720|768|1024|1200|1600)$)}/{name}")]
        [HttpGet("w{width:int}/{name}")]
        public IActionResult FixedWidth(string name, int width, int quality = 95)
        {
            Stream stream = new MemoryStream();
            _resizer.ResizeFixedWidth(name, width, stream, quality);

            var result = File(stream, contentType: contentTypeFactory(name));
            return result;
        }

        private string contentTypeFactory(string name){
            var ext = Path.GetExtension(name);
            switch (ext){
                case ".png":
                    return "image/png";          
                case ".jpg":
                default:
                    return "image/jpeg";
            }
        }

    }
}
