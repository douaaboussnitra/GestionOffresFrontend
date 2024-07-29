import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';


  constructor(private http:HttpClient) {}

  login(log : { email:string, password:string}) : Observable <any> {
    return this.http.post(`${this.apiUrl}/login`, log);
  }

  
  register(rej : { username:string, email:string, password:string, password_conf:string}) : Observable <any> {
    return this.http.post(`${this.apiUrl}/register`, rej);
  }
  }
  


