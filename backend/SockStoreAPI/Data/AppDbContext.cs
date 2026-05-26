using Microsoft.EntityFrameworkCore;
using SockStoreAPI.Models;

namespace SockStoreAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
            .Property(p => p.Price)
            .HasPrecision(18, 2);
        }
    }
}