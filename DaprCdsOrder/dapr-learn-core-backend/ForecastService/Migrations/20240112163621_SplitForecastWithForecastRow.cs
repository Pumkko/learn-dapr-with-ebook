using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ForecastService.Migrations
{
    /// <inheritdoc />
    public partial class SplitForecastWithForecastRow : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropCheckConstraint(
                name: "CK_Forecasts_Month_Range",
                table: "Forecasts");

            migrationBuilder.DropColumn(
                name: "ForecastValue",
                table: "Forecasts");

            migrationBuilder.DropColumn(
                name: "Month",
                table: "Forecasts");

            migrationBuilder.CreateTable(
                name: "ForecastsRows",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ForecastId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    ForecastValue = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForecastsRows", x => x.Id);
                    table.CheckConstraint("CK_ForecastsRows_Month_Range", "[Month] BETWEEN 0 AND 11");
                    table.ForeignKey(
                        name: "FK_ForecastsRows_Forecasts_ForecastId",
                        column: x => x.ForecastId,
                        principalTable: "Forecasts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ForecastsRows_ForecastId",
                table: "ForecastsRows",
                column: "ForecastId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ForecastsRows");

            migrationBuilder.AddColumn<int>(
                name: "ForecastValue",
                table: "Forecasts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Month",
                table: "Forecasts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddCheckConstraint(
                name: "CK_Forecasts_Month_Range",
                table: "Forecasts",
                sql: "[Month] BETWEEN 0 AND 11");
        }
    }
}
