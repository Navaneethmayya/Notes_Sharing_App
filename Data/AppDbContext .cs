using Microsoft.EntityFrameworkCore;
using Notebook_app.Models;

namespace Notebook_app.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Media> Media { get; set; }

        public DbSet<Notes> Notes { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
            .HasKey(u => u.UserId); // 👈 this sets "id" for User as primary key
            
            modelBuilder.Entity<Notes>()
             .HasKey(u => u.NotesId);

            modelBuilder.Entity<Media>()
            .HasKey(u => u.MediaId); // 👈 this sets "id" for Media as primary key


            modelBuilder.Entity<User>()
                .HasMany(u => u.Medias)
                .WithOne(u => u.user)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<User>()
                .HasMany(u => u.notes)
                .WithOne(u => u.user)
                .HasForeignKey(u => u.UserId);
        }

    }
}
