import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';
import { Recruiter } from '../models/recruiter.model';


@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  constructor(private http:HttpClient) { }
  getRecruiter(): Observable<Recruiter[]> {
    return this.http.get<Recruiter[]>(`${apiUrl}/recruiter`);
    }
    getRecruiterById(id: number): Observable<Recruiter> {
      return this.http.get<Recruiter>(`${apiUrl}/recruiter/${id}`);
      }
      createRecruiter(recruiter: Recruiter): Observable<boolean> {
        return this.http.post<boolean>(`${apiUrl}/recruiter`, recruiter);
        }
        updateRecruiter(id: number, recruiter: Recruiter): Observable<boolean> {
          return this.http.put<boolean>(`${apiUrl}/recruiter/${id}`, recruiter);
          }
          deleteRecruiter(id: number): Observable<boolean> {
            return this.http.delete<boolean>(`${apiUrl}/recruiter/${id}`);
            }
      }
