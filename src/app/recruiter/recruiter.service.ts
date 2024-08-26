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
      createRecruiter(recruiter: Recruiter): Observable<Recruiter> {
        return this.http.post<Recruiter>(`${apiUrl}/recruiter`, recruiter);
        }
        updateRecruiter(id: number, recruiter: Recruiter): Observable<Recruiter> {
          return this.http.put<Recruiter>(`${apiUrl}/recruiter/${id}`, recruiter);
          }
          deleteRecruiter(id: number): Observable<Recruiter> {
            return this.http.delete<Recruiter>(`${apiUrl}/recruiter/${id}`);
            }
      }
