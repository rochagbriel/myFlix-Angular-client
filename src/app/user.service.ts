import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  setUser(user: any): void {
    // Save the user object to localStorage
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): any {
    // Get the user object from localStorage
    const userString = localStorage.getItem('user');
    return JSON.parse(userString || '{}');
  }
}