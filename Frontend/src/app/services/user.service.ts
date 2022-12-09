import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  addUser(user: User) {
    let users: User[] = [];
    const usersItem = localStorage.getItem('Users');
    if (usersItem) {
      try {
        users = JSON.parse(usersItem);
        users.push(user);
      } catch (error) {
        console.error('Error parsing Users array from local storage', error);
      }
    } else {
      users = [user];
    }
    try {
      localStorage.setItem('Users', JSON.stringify(users));
    } catch (error) {
      console.error('Error saving Users array to local storage', error);
    }
  }
}
