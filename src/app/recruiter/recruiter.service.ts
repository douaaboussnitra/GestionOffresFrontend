import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';


@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  constructor(private http:HttpClient) { }
  getRecruiter(): Observable<any> {
    return this.http.get(`${apiUrl}/recruiter`);
    }
    getRecruiterById(id: number): Observable<any> {
      return this.http.get(`${apiUrl}/recruiter/${id}`);
      }
      createRecruiter(recruiter: any): Observable<any> {
        return this.http.post(`${apiUrl}/recruiter`, recruiter);
        }
        updateRecruiter(id: number, recruiter: any): Observable<any> {
          return this.http.put(`${apiUrl}/recruiter/${id}`, recruiter);
          }
          deleteRecruiter(id: number): Observable<any> {
            return this.http.delete(`${apiUrl}/recruiter/${id}`);
            }
      }
