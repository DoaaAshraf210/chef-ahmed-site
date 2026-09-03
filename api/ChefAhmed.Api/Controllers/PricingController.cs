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
    public class PricingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PricingController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SizePricing>>> GetPricing()
        {
            var pricing = await _context.SizePricings
                .OrderBy(p => p.DisplayOrder)
                .ToListAsync();
            return Ok(pricing);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SizePricing>> GetPricingItem(int id)
        {
            var item = await _context.SizePricings.FindAsync(id);
            if (item == null) return NotFound();
            return Ok(item);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<SizePricing>> CreatePricing(SizePricing pricing)
        {
            _context.SizePricings.Add(pricing);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPricingItem), new { id = pricing.Id }, pricing);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePricing(int id, SizePricing updatedPricing)
        {
            var pricing = await _context.SizePricings.FindAsync(id);
            if (pricing == null) return NotFound();

            pricing.SizeLabel = updatedPricing.SizeLabel;
            pricing.Price = updatedPricing.Price;
            pricing.DisplayOrder = updatedPricing.DisplayOrder;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePricing(int id)
        {
            var pricing = await _context.SizePricings.FindAsync(id);
            if (pricing == null) return NotFound();

            _context.SizePricings.Remove(pricing);
            await _context.SaveChangesAsync();
            return NoContent();
        }// GET: api/pricing/special
        [HttpGet("special")]
        public async Task<ActionResult<SpecialPricing>> GetSpecialPricing()
        {
            var special = await _context.SpecialPricings.FirstOrDefaultAsync();
            if (special == null) return NotFound();
            return Ok(special);
        }

        // PUT: api/pricing/special
        [HttpPut("special")]
        [Authorize]
        public async Task<IActionResult> UpdateSpecialPricing(SpecialPricing updated)
        {
            var special = await _context.SpecialPricings.FirstOrDefaultAsync();
            if (special == null)
            {
                updated.Id = 0;
                _context.SpecialPricings.Add(updated);
            }
            else
            {
                special.Label = updated.Label;
                special.Price = updated.Price;
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
