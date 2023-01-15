using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Backend.Data;
using Backend.Data.Repo;
using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    public class CityController : BaseController
    {
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public CityController(IUnitOfWork uow, IMapper mapper)
        {
            this.mapper = mapper;
            this.uow = uow;
        }

        //GET api/city
        [HttpGet("")]
        [AllowAnonymous] //Dostęp do metody ma każdy (reszta podlega Autentykacji - atrybut na początku klasy [Authorize]
        public async Task<IActionResult> GetCities()
        {
            var cities = await uow.CityRepository.GetCitiesAsync();
            var citiesDto = mapper.Map<IEnumerable<CityDto>>(cities);
            // var citiesDto = cities.Select(x => new CityDto
            // {
            //     Id = x.Id,
            //     Name = x.Name
            // });


            return Ok(citiesDto);
        }

        //Post api/city/post -- Post the data in JSON Format
        [HttpPost("post")]
        public async Task<IActionResult> AddCity(CityDto cityDto)
        {
            var city = mapper.Map<City>(cityDto);
            city.LastUpdatedBy = 1;
            city.LastUpdatedOn = DateTime.Now;
            // var city = new City
            // {
            //     Name = cityDto.Name,
            //     LastUpdatedBy = 1,
            //     LastUpdatedOn = DateTime.Now
            // };

            uow.CityRepository.AddCity(city);
            await uow.SaveAsync();

            return StatusCode(201);
        }
        //Put służy do podmiany CAŁEGO modelu, tzn zmieniając Nazwę musimy wprowadzić również Kraj czy też Miasto
        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityDto cityDto)
        {
            if (id != cityDto.Id)
            {
                return BadRequest("Update not allowed");
            }
            var cityFromDb = await uow.CityRepository.FindCity(id);
            if (cityFromDb == null)
            {
                return BadRequest("Update not allowed");
            }
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);

            throw new Exception("Unknown error occured");
            await uow.SaveAsync();
            return StatusCode(200);
        }
        //Update Dtu zostało dodane żeby zaaktualizować TYLKO nazwę miasta, tzn. żeby inne dane się nie zerowały
        [HttpPut("updateCityName/{id}")]
        public async Task<IActionResult> UpdateCity(int id, CityUpdateDto cityDto)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;
            mapper.Map(cityDto, cityFromDb);
            await uow.SaveAsync();
            return StatusCode(200);
        }

        //Patch służy do podmiany części modelu/BazyDanych np tylko Nazwy, albo tylko Kraju, w celu skorzystania z Patch, potrzeba 
        //zewnętrznej biblioteki Microsoft.AspNetCore.Mvc.NewtonsoftJson co też trzeba dodać w Program.cs builder.Services.AddControllers().AddNewtonsoftJson();
        [HttpPatch("update/{id}")]
        public async Task<IActionResult> UpdateCityPath(int id, JsonPatchDocument<City> cityToPath)
        {
            var cityFromDb = await uow.CityRepository.FindCity(id);
            cityFromDb.LastUpdatedBy = 1;
            cityFromDb.LastUpdatedOn = DateTime.Now;

            cityToPath.ApplyTo(cityFromDb, ModelState);
            await uow.SaveAsync();
            return StatusCode(200);
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