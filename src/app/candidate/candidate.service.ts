import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';
import { Candidat } from '../models/condidat.model';

@Injectable({
  providedIn: 'root'
})
export class CandidateService  {

  constructor(private http:HttpClient) {}
  getAllCandidat() : Observable <Candidat[]> {
    return this.http.get<Candidat[]>(`${apiUrl}/candidat`);
  }
  getCandidat(id: number): Observable<Candidat> {
    return this.http.get<Candidat>(`${apiUrl}/candidat/${id}`);
    }
    createCandidat(candidat: any): Observable<any> {
      return this.http.post(`${apiUrl}/candidat`, candidat);
      }
      updateCandidat(id: number, candidat: any): Observable<any> {
        return this.http.put(`${apiUrl}/candidat/${id}`, candidat);
        }
        deleteCandidat(id: number): Observable<any> {
          return this.http.delete(`${apiUrl}/candidat/${id}`);
          }
          }

