using Microsoft.EntityFrameworkCore;
using SockStoreAPI.Data;
using SockStoreAPI.Auth;
using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

// DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<JwtService>();

var app = builder.Build();

// CORS
app.UseCors("AllowAngular");

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

//Achivos estaticos
var imagesPath = Path.Combine(
    Directory.GetCurrentDirectory(),
    "Images"
);

if (!Directory.Exists(imagesPath))
{
    Directory.CreateDirectory(imagesPath);
}

app.UseStaticFiles();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(
            Directory.GetCurrentDirectory(),
            "Images"
        )
    ),
    RequestPath = "/Images"
});

// Controllers
app.MapControllers();

app.Run();


//DataBase Password = GgYy44OoPpmM
//DataBase Name = SockStore

//"DefaultConnection": "Server=localhost;Database=SockStoreDB;Trusted_Connection=True;TrustServerCertificate=True;"