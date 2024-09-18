import { Router } from '@angular/router';
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
  userRole: number;
  isLoggedIn: boolean;
  isNotLoggedIn: boolean;

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromToken(); // Load user state on service initialization
  }

  login(log: { email: string, password: string }): Observable<any> {

    return this.http.post(`${apiUrl}/auth/login`, log);
  }

  decodeToken(token: string,isAuth : boolean = null): any {
    try {
      const decodedToken: any = jwtDecode(token);
      this.decodedTokenSubject.next(decodedToken);
      console.log(decodedToken);
      this.isLoggedIn=true
      this.userRole=decodedToken?.role
      localStorage.setItem('USER', token); //  getItem setItem removeItem
      if(isAuth){ // navigation true
      if (this.userRole === 1) {
        this.router.navigate(['/job-offers/liste-offers']);
      } else if (this.userRole === 2) {
        this.router.navigate(['/job-offers/offers']); 
      } else {
        this.router.navigate(['/home']); // Default route
      }
      }
    } catch (error) {
      console.error('Invalid token provided:', error);
      return null;
    }
  }

  logout(): void {
    this.decodedTokenSubject.next(null);
    localStorage.removeItem('USER');
    this.isLoggedIn=false
    this.userRole=null


  }

  register(rej: { username: string, email: string, password: string, password_conf: string, role: number }): Observable<any> {
    return this.http.post(`${apiUrl}/auth/register`, rej);
  }

  private loadUserFromToken(): void {
    const token = localStorage.getItem('USER');
    if (token) {
      this.isLoggedIn=true
      this.decodeToken(token);
    }
  }


  isAuthenticated(): boolean {
    return this.isLoggedIn === true;
  }

  isUserCandidate(): boolean {
    return this.userRole === 2;
  }

  isUserRecruiter(): boolean {
    console.log(this.userRole)
    return this.userRole === 1;
  }

}
