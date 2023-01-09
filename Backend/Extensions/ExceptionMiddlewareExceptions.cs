using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Backend.Middlewares;
using Microsoft.AspNetCore.Diagnostics;

namespace Backend.Extensions
{
    public static class ExceptionMiddlewareExceptions
    {
        public static void ConfigureExceptionHandler(this WebApplication app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
        public static void ConfigureBuiltinExceptionHandler(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage(); //ON tylko dla developerskiej wersji
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                //Metoda obsługuje wszystkie wyjątki w sposób globalny w Production gdzie użytkownik nie potrzebuje mieć informacji detalicznych
                app.UseExceptionHandler(
                    options =>
                    {
                        options.Run(
                            async context =>
                            {
                                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                                var ex = context.Features.Get<IExceptionHandlerFeature>();
                                if (ex != null)
                                {
                                    await context.Response.WriteAsync(ex.Error.Message);
                                }
                            }
                        );
                    }
                );
            }
        }
    }
}