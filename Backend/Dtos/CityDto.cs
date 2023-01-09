using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Dtos
{
    public class CityDto
    {
        //Pola które znajdują się tutaj to pola które użytkownik może dodać metodą Post, żeby zapobiec nieautoryzowanemu dostępowi do wszystkich pól
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is required !")]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(".*[a-zA-Z]+.*", ErrorMessage = "Numerics are not allowed !")]
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
    }
}