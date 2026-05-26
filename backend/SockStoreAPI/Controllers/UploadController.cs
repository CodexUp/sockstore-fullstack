using Microsoft.AspNetCore.Mvc;

namespace SockStoreAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> UploadImage(
            IFormFile file
        )
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            var fileName =
                Guid.NewGuid().ToString() +
                Path.GetExtension(file.FileName);

            var path = Path.Combine(
                Directory.GetCurrentDirectory(),
                "Images",
                fileName
            );

            using (var stream = new FileStream(
                path,
                FileMode.Create
            ))
            {
                await file.CopyToAsync(stream);
            }

            var imageUrl =
                $"{Request.Scheme}://{Request.Host}/Images/{fileName}";

            return Ok(new { imageUrl });
        }
    }
}