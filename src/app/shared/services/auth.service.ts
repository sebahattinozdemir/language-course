import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersUrl = '/assets/users.json'; // URL to web api

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User | null> {
    return this.http.get<{ users: User[] }>(this.usersUrl).pipe(
      map(response => {
        const user = response.users.find(u => u.email === email && u.password === password);
        if (user) {
          // Simulate token generation
          return { ...user, token: 'sample-jwt-token' }; // Replace with actual token generation logic
        }
        return null;
      })
    );
  }

  register(email: string, password: string): Observable<User> {
    return this.http.get<{ users: User[] }>(this.usersUrl).pipe(
      map(response => {
        const users = response.users;
        const newUser: User = {
          id: Math.max(...users.map(u => u.id)) + 1,
          email,
          password,
          registrationDate: new Date().toISOString().split('T')[0] // Use current date as registration date
        };
        // Simulate saving the new user (you would send a POST request in a real application)
        console.log('Registered user:', newUser);
        return newUser;
      })
    );
  }
}
