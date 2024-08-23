import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';
import * as jwt_decode from 'jwt-decode';
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
      const decodedToken = jwt_decode.jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Invalid token provided:", error);
      return null;
    }
  }

  register(rej: { username: string, email: string, password: string, password_conf: string }): Observable<any> {
    return this.http.post(`${apiUrl}/auth/register`, rej);
  }

  register_rec(register_rec: { fullName: string, email: string, phone: string, password: string, confirmPassword: string }): Observable<any> {
    return this.http.post(`${apiUrl}/auth/register-recruiter`, register_rec);
  }
}
