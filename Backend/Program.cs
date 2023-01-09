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

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
builder.Services.AddAutoMapper(typeof(AutomapperProfiles).Assembly);
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.ConfigureExceptionHandler();

app.UseRouting();

app.UseCors(m => m.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.UseAuthorization();

app.MapControllers();

app.Run();
