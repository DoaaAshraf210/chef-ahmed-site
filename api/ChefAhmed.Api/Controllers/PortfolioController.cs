using ChefAhmed.Api.Data;
using ChefAhmed.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ChefAhmed.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PortfolioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PortfolioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PortfolioImage>>> GetImages()
        {
            var images = await _context.PortfolioImages
                .OrderBy(p => p.DisplayOrder)
                .ToListAsync();
            return Ok(images);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PortfolioImage>> GetImage(int id)
        {
            var image = await _context.PortfolioImages.FindAsync(id);
            if (image == null) return NotFound();
            return Ok(image);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PortfolioImage>> AddImage(PortfolioImage image)
        {
            image.CreatedAt = DateTime.UtcNow;
            _context.PortfolioImages.Add(image);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetImage), new { id = image.Id }, image);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.PortfolioImages.FindAsync(id);
            if (image == null) return NotFound();

            _context.PortfolioImages.Remove(image);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
