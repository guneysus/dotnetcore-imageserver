using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using ImageServer.Contracts;
using Microsoft.AspNetCore.Http;

namespace ImageServer.Services
{
    public class S3Uploader : IUploader
    {
        private AmazonS3Client _s3;
        private PutBucketResponse _bucket;
        private TransferUtility _fileTransferUtility;

        public S3Uploader()
        {
            this._initAsync().ConfigureAwait(true);
        }

        private async Task _initAsync()
        {
            this._s3 = new AmazonS3Client(new AmazonS3Config
            {
                ServiceURL = "http://s3:5002",
                ForcePathStyle = true
            });

            this._bucket = await _s3.PutBucketAsync(new PutBucketRequest
            {
                BucketName = "test",
                UseClientRegion = true
            });

            this._fileTransferUtility = new TransferUtility(_s3);
        }

        Task<string> IUploader.Delete(string name)
        {
            throw new System.NotImplementedException();
        }

        Task<string> IUploader.Replace(string name, IFormFile image)
        {
            throw new System.NotImplementedException();
        }

        async Task<string> IUploader.Upload(IFormFile image)
        {
            var stream = image.OpenReadStream();
            var key = Guid.NewGuid().ToString();
            
            if(_fileTransferUtility == null) throw new ArgumentNullException(nameof(_fileTransferUtility));
            
            await _fileTransferUtility.UploadAsync(stream: stream, bucketName: "test", key: key);

            return key;
        }

        Task<IList<string>> IUploader.UploadMany(IList<IFormFile> images)
        {
            throw new System.NotImplementedException();
        }
    }
}