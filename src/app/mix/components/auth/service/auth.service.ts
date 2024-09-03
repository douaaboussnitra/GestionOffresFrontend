// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private decodedTokenSubject = new BehaviorSubject<any>(null);
  user$ = this.decodedTokenSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromToken(); // Load user state on service initialization
  }

  login(log: { email: string, password: string }): Observable<any> {
    return this.http.post(`${apiUrl}/auth/login`, log);
  }

  decodeToken(token: string): any {
    try {
      const decodedToken: any = jwtDecode(token);
      this.decodedTokenSubject.next(decodedToken);
      console.log(decodedToken);
      localStorage.setItem('USER', token);
    } catch (error) {
      console.error('Invalid token provided:', error);
      return null;
    }
  }

  logout(): void {
    this.decodedTokenSubject.next(null);
    localStorage.removeItem('USER');
  }

  register(rej: { username: string, email: string, password: string, password_conf: string, role: number }): Observable<any> {
    return this.http.post(`${apiUrl}/auth/register`, rej);
  }

  private loadUserFromToken(): void {
    const token = localStorage.getItem('USER');
    if (token) {
      this.decodeToken(token);
    }
  }

  // New method to get the current decoded token
  getDecodedToken(): any {
    return this.decodedTokenSubject.value;
  }
}
