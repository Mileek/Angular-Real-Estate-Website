import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  addUser(user: any) {
    var users: any = [];
    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users') as string);
      //users = [user, ...Object.values(users)]; //... to dodawanie elementów do tabliczy przez Spread operator
      //users.push(user);
      users.push(user); //okej, to gówno nie działa, wyjebane, nie dodaje się do listy, tylko nakłada na już istniejący index - muszę pouczyć się js potem do tego podejść
    } else {
      users = [user];
    }
    localStorage.setItem('Users', JSON.stringify(user));
  }
}
