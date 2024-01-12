using Microsoft.EntityFrameworkCore;

namespace ForecastService
{
    public class ForecastDbContext(DbContextOptions<ForecastDbContext> options) : DbContext(options)
    {

        public DbSet<Forecast> Forecasts { get; set; }

        public DbSet<ForecastRow> ForecastsRows { get; set; }  

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.BuildForecastModel();
        }

    }
}
