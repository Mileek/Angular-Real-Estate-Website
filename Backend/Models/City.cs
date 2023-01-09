using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    //To jest Data/Model na podstawie którego powstaje Tabela w bazie danych, więc po dodaniu czegoś trzeba dokonać migracji
    //W celu migracji, po zmianie w danych wykorzystujemy komendę dotnet ef migrations add AddLastUpdatedFields < jakaś nazwa a'la commit
    //Po dodaniu migracji trzeba zrobić update bazy danych dotnet ef database update
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string Country { get; set; }
        public DateTime LastUpdatedOn { get; set; }
        public int LastUpdatedBy { get; set; }
    }
}