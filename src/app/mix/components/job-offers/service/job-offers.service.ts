import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';
import { JobOffer } from 'src/app/models/JobOffers.model';


@Injectable({
  providedIn: 'root'
})
export class jobOffersService {

  constructor(private http:HttpClient) {}
  getAllJoboffer() : Observable <JobOffer[]> {
    return this.http.get<JobOffer[]>(`${apiUrl}/joboffer`);
  }
  getJoboffer(id: number): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${apiUrl}/joboffer/${id}`);
    }
    createJoboffer(joboffer: JobOffer): Observable<boolean> {
      return this.http.post<boolean>(`${apiUrl}/joboffer`, joboffer);
      }
      updateJoboffer(id: number, joboffer: JobOffer): Observable<boolean> {
        return this.http.put<boolean>(`${apiUrl}/joboffer/${id}`, joboffer);
        }
        deleteJoboffer(id: number): Observable<boolean> {
          return this.http.delete<boolean>(`${apiUrl}/joboffer/${id}`);
          }
    }
