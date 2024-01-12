using Microsoft.EntityFrameworkCore;

namespace ForecastService
{
    public static class ForecastBuilder
    {
        public static void BuildCharacterModel(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Forecast>();

            modelBuilder.Entity<Forecast>()
                .HasKey(f => f.Id);

            modelBuilder.Entity<Forecast>()
                .Property(f => f.Id)
                .ValueGeneratedNever();
        }

    }
}
