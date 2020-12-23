using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Services.Services.Models;

namespace Services.Services
{
    public interface ICloudinaryService
    {
        Task<FileInfoModel> UploadImageAsync(IFormFile files);

        Task<IEnumerable<FileInfoModel>> UploadImagesAsync(IEnumerable<IFormFile> files);

        Task RemoveImageAsync(string publicId);
    }
}