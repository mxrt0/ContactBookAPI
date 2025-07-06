using ContactBookAPI.Controllers;
using ContactBookAPI.Models.Interfaces;
using ContactBookAPI.Models;

namespace ContactBookAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();

            builder.Services.AddSingleton<IContactRepository, FileContactRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseAuthorization();

            app.UseDefaultFiles(); // Looks for index.html

            app.UseStaticFiles();
            
            app.MapControllers();

            app.Run();
        }
    }
}
