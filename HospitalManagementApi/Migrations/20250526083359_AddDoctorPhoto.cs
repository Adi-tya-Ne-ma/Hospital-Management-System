using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HospitalManagementApi.Migrations
{
    /// <inheritdoc />
    public partial class AddDoctorPhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Photo",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Photo",
                table: "Doctors");
        }
    }
}
