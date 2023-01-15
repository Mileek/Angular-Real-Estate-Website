using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Data.Repo;
using Backend.Interfaces;

namespace Backend.Data
{
    //UnitOfWork powinno zawierać metody i operacje wspólne, takie jak na przykład save oraz DataContext
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dc;
        public UnitOfWork(DataContext dc)
        {
            this.dc = dc;
        }
        public ICityRepository CityRepository => new CityRepository(dc); //Każdy kontroler korzystający z tej klasy powinien być zainisjowany w ten sposób

        public IUserRepository UserRepository => new UserRepository(dc);

        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }
    }
}