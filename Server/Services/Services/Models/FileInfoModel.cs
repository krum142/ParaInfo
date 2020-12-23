namespace Services.Services.Models
{
    public class FileInfoModel
    {
        public FileInfoModel(string url, string publicId)
        {
            this.Url = url;
            this.PublicId = publicId;
        }

        public string Url { get; }

        public string PublicId { get; }
    }
}