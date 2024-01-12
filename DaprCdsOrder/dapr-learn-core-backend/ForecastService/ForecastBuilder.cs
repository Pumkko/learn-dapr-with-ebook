using Microsoft.EntityFrameworkCore;

namespace ForecastService
{
    public static class ForecastBuilder
    {
        public static void BuildForecastModel(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Forecast>();

            modelBuilder.Entity<Forecast>()
                .HasKey(f => f.Id);

            modelBuilder.Entity<Forecast>()
                .Property(f => f.Id)
                .ValueGeneratedNever();

            modelBuilder.Entity<ForecastRow>();
            modelBuilder.Entity<ForecastRow>()
                .HasKey(f => f.Id);

            modelBuilder.Entity<ForecastRow>()
                .Property(f => f.Id)
                .ValueGeneratedNever();
        }

    }
}
