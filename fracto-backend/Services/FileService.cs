namespace Fracto.Api.Services
{
    public class FileService
    {
        private readonly IWebHostEnvironment _env;
        public FileService(IWebHostEnvironment env) => _env = env;

        public async Task<string> SaveFileAsync(IFormFile file)
        {
            var uploads = Path.Combine(_env.ContentRootPath, "Uploads");
            Directory.CreateDirectory(uploads);
            var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
            var path = Path.Combine(uploads, fileName);
            using var stream = System.IO.File.Create(path);
            await file.CopyToAsync(stream);
            return $"/uploads/{fileName}";
        }
    }
}
