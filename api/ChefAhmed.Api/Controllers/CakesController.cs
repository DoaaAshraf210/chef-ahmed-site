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
    public class CakesController : ControllerBase
    {



        private readonly AppDbContext _context;

        public CakesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/cakes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cake>>> GetCakes()
        {
            var cakes = await _context.Cakes
                .OrderBy(c => c.DisplayOrder)
                .ToListAsync();
            return Ok(cakes);
        }

        // GET: api/cakes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cake>> GetCake(int id)
        {
            var cake = await _context.Cakes.FindAsync(id);
            if (cake == null) return NotFound();
            return Ok(cake);
        }

        // POST: api/cakes
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Cake>> CreateCake(Cake cake)
        {
            cake.CreatedAt = DateTime.UtcNow;
            _context.Cakes.Add(cake);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetCake), new { id = cake.Id }, cake);
        }

        // PUT: api/cakes/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateCake(int id, Cake updatedCake)
        {
            var cake = await _context.Cakes.FindAsync(id);
            if (cake == null) return NotFound();

            cake.Name = updatedCake.Name;
            cake.Description = updatedCake.Description;
            cake.ImageUrl = updatedCake.ImageUrl;
            cake.IsFeatured = updatedCake.IsFeatured;
            cake.DisplayOrder = updatedCake.DisplayOrder;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/cakes/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteCake(int id)
        {
            var cake = await _context.Cakes.FindAsync(id);
            if (cake == null) return NotFound();

            _context.Cakes.Remove(cake);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    
}
}
