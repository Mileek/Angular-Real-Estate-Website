using Backend.Data;
using Backend.Data.Repo;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Backend.Helpers;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Backend.Extensions;
using Backend.Middlewares;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Text;
using Microsoft.Data.SqlClient;

var builder = WebApplication.CreateBuilder(args);
builder.Host.ConfigureHostConfiguration(host =>
{
    host.AddEnvironmentVariables(prefix: "HSPA_");
}
);
//Gdyby do mojej DB by³o wymagane has³o i chcia³bym je ukryæ
//var sqlBuilder = new SqlConnectionStringBuilder(builder.Configuration.GetConnectionString("Default"));
//sqlBuilder.Password = builder.Configuration.GetSection("DBPassword").Value;

//var connectionString = sqlBuilder.ConnectionString;
// Add services to the container.

builder.Services.AddCors();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddAutoMapper(typeof(AutomapperProfiles).Assembly);
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>(); //Dziêki temu wszystkie wstrzykiwania zale¿noœci znajduj¹ siê w œrodku, a nie tak jak w pracy dodaje siê wszystko w bootstrapperze pojedynczo

var secretKey = builder.Configuration.GetSection("appSettings:Key").Value; //Pobieranie customowych danych z appsettings.json
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("secretKey"));


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = false,
        ValidateAudience = false,
        IssuerSigningKey = key
    };
});

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.ConfigureExceptionHandler();

app.UseRouting();

app.UseHsts();

app.UseHttpsRedirection();

app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
