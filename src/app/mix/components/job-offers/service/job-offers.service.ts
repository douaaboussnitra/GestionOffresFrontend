import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';
import { JobOffer } from 'src/app/models/JobOffers.model';

@Injectable({
  providedIn: 'root'
})
export class jobOffersService {
  constructor(private http: HttpClient) {}

  getAllJoboffer(): Observable<JobOffer[]> {
    return this.http.get<JobOffer[]>(`${apiUrl}/joboffer`);
  }

  getJoboffer(id: string): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${apiUrl}/joboffer/${id}`);
  }

  createJoboffer(joboffer: JobOffer): Observable<boolean> {
    return this.http.post<boolean>(`${apiUrl}/joboffer`, joboffer);
  }

  updateJoboffer(id: string, joboffer: JobOffer): Observable<boolean> {
    return this.http.put<boolean>(`${apiUrl}/joboffer/${id}`, joboffer);
  }

  deleteJoboffer(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${apiUrl}/joboffer/${id}`);
  }

  getAllSkills(): Observable<string[]> {
    return this.http.get<string[]>(`${apiUrl}/joboffer/skills/all`);
  }

  // Method to search job offers based on contract type and skill
  searchJobOffers(contractType: string, skill: string): Observable<JobOffer[]> {
    const params = new HttpParams()
      .set('contractType', contractType)
      .set('skill', skill);
    return this.http.get<JobOffer[]>(`${apiUrl}/joboffer/search/job`, { params });
  }
}
