using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data;
using Backend.Data.Repo;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        private readonly IUnitOfWork uow;

        public CityController(IUnitOfWork uow)
        {
            this.uow = uow;
        }

        //GET api/city
        [HttpGet("")]
        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.CityRepository.GetCitiesAsync();
            return Ok(cities);
        }

        //Post api/city/post -- Post the data in JSON Format
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(City city)
        {
            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();

            return StatusCode(201);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            //Wykorzystanie UnitOfWork Patternu w celu dostępu do Repozytorium i do Zapisu, jak widać wewnątrz uow jest "wolna metoda" SaveChanges oraz dostęp do Repozytoriów
            //Unit Of Work łączy się z Repository Pattern'em
            uow.CityRepository.DeleteCity(id);
            await uow.SaveAsync();

            return Ok(id);
        }




        // Post api/city/add?cityname=Miami
        // [HttpPost("add")]
        // Post api/city/add/Los Angeles
        // [HttpPost("add/{cityName}")]
        // public async Task<IActionResult> AddCity(string cityName)
        // {
        //     City city = new City();
        //     city.Name = cityName;
        //     await dc.AddAsync(city);
        //     await dc.SaveChangesAsync();

        //     return Ok(city);
        // }

    }
}