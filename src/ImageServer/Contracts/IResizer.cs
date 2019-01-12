using System.IO;

namespace ImageServer.Contracts
{
    public interface IResizer
    {
        void ResizeFixedHeight(string name, int height, Stream stream, int quality);
        void ResizeFixedWidth(string name, int width, Stream stream, int quality);
    }
}
