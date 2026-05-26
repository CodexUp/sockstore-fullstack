using Microsoft.EntityFrameworkCore;
using SockStoreAPI.Data;
using SockStoreAPI.Auth;
using Microsoft.Extensions.FileProviders;

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
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<JwtService>();

var app = builder.Build();

// CORS
app.UseCors("AllowAngular");

// Swagger
app.UseSwagger();
app.UseSwaggerUI();

//Achivos estaticos
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