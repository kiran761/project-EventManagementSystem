import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:7000/api';  // Your Spring Boot backend URL

  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());

  isLoggedIn = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(loginData: any): Observable<void> {
    console.log("Hello Hii")
    return this.http.post<{ token: string, user: any}>(`${this.apiUrl}/login`, loginData).pipe(
      map(response => {
        console.log(response.token);
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.user.id);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('isLoggedin', "true");
        this.loggedIn.next(true);
      })
    );
  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedin');
    this.loggedIn.next(false);
  }

  // To get the JWT token from local storage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  checkUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/check-username`, {
      params: { username }
    });
  }


}
