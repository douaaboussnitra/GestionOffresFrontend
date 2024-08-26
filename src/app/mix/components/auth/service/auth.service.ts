import { Role } from './../../../../models/role.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(log: { email: string, password: string }): Observable<any> {
    return this.http.post(`${apiUrl}/auth/login`, log);
  }

  decodeToken(token: string): any {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token provided:", error);
      return null;
    }
  }

  register(rej: { username: string, email: string, password: string, password_conf: string , role:number }): Observable<any> {
    return this.http.post(`${apiUrl}/auth/register`, rej);
  }


  /* registerUser(name:string , role :number): Observable<any> {
    return this.http.post(`${apiUrl}/auth/register`,{name,role});
  } */
}
