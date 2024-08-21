import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';


@Injectable({
  providedIn: 'root'
})
export class jobOffersService {

  constructor(private http:HttpClient) {}
  getAllJoboffer() : Observable <any> {
    return this.http.get(`${apiUrl}/joboffer`);
  }
  getJoboffer(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/joboffer/${id}`);
    }
    createJoboffer(joboffer: any): Observable<any> {
      return this.http.post(`${apiUrl}/joboffer`, joboffer);
      }
      updateJoboffer(id: number, joboffer: any): Observable<any> {
        return this.http.put(`${apiUrl}/joboffer/${id}`, joboffer);
        }
        deleteJoboffer(id: number): Observable<any> {
          return this.http.delete(`${apiUrl}/joboffer/${id}`);
          }
    }
