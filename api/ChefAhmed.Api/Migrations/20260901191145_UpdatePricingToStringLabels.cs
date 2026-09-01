using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChefAhmed.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePricingToStringLabels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SizeInCm",
                table: "SizePricings");

            migrationBuilder.AlterColumn<string>(
                name: "Price",
                table: "SizePricings",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<string>(
                name: "SizeLabel",
                table: "SizePricings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SizeLabel",
                table: "SizePricings");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "SizePricings",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "SizeInCm",
                table: "SizePricings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
