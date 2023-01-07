using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos
{
    public class CityDto
    {
        //Pola które znajdują się tutaj to pola które użytkownik może dodać metodą Post, żeby zapobiec nieautoryzowanemu dostępowi do wszystkich pól
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
    }
}