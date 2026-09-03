using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChefAhmed.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddGateauPricing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "LargeSizePrice",
                table: "Gateaux",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SmallSizePrice",
                table: "Gateaux",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LargeSizePrice",
                table: "Gateaux");

            migrationBuilder.DropColumn(
                name: "SmallSizePrice",
                table: "Gateaux");
        }
    }
}
