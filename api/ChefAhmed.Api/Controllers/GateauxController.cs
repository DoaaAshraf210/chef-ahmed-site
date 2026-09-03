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
    public class GateauxController : ControllerBase
    {


        private readonly AppDbContext _context;

        public GateauxController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Gateau>>> GetGateaux()
        {
            var gateaux = await _context.Gateaux
                .OrderBy(g => g.DisplayOrder)
                .ToListAsync();
            return Ok(gateaux);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Gateau>> GetGateau(int id)
        {
            var gateau = await _context.Gateaux.FindAsync(id);
            if (gateau == null) return NotFound();
            return Ok(gateau);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Gateau>> CreateGateau(Gateau gateau)
        {
            gateau.CreatedAt = DateTime.UtcNow;
            _context.Gateaux.Add(gateau);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetGateau), new { id = gateau.Id }, gateau);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateGateau(int id, Gateau updatedGateau)
        {
            var gateau = await _context.Gateaux.FindAsync(id);
            if (gateau == null) return NotFound();

            gateau.Name = updatedGateau.Name;
            gateau.Description = updatedGateau.Description;
            gateau.ImageUrl = updatedGateau.ImageUrl;
            gateau.SmallSizePrice = updatedGateau.SmallSizePrice;
            gateau.LargeSizePrice = updatedGateau.LargeSizePrice;
            gateau.DisplayOrder = updatedGateau.DisplayOrder;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteGateau(int id)
        {
            var gateau = await _context.Gateaux.FindAsync(id);
            if (gateau == null) return NotFound();

            _context.Gateaux.Remove(gateau);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

