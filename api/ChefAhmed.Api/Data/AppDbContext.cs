using ChefAhmed.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ChefAhmed.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Cake> Cakes { get; set; }
        public DbSet<Gateau> Gateaux { get; set; }
        public DbSet<SizePricing> SizePricings { get; set; }
        public DbSet<PortfolioImage> PortfolioImages { get; set; }
        public DbSet<AdminUser> AdminUsers { get; set; }
    }
}