import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  authUser(user: User): User | null {
    let UserArray: User[] = [];
    const users = localStorage.getItem('Users');
    if (users) {
      try {
        UserArray = JSON.parse(users);
      } catch (error) {
        console.error('Error parsing Users array from local storage', error);
      }
    }
    if (UserArray.length === 0) {
      return null;
    }
    return (
      UserArray.find(
        (p) => p.userName === user.userName && p.password === user.password
      ) || null
    );
  }
}
