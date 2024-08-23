import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http:HttpClient) { }
  getAllApplication(): Observable<any> {
    return this.http.get(`${apiUrl}/application`);
    }
    getAllApplicationById(id: number): Observable<any> {
      return this.http.get(`${apiUrl}/application/${id}`);
      }
      createApplication(application: any): Observable<any> {
        return this.http.post(`${apiUrl}/application`, application);
        }
        updateApplication(id: number, application: any): Observable<any> {
          return this.http.put(`${apiUrl}/application/${id}`, application);
          }
          deleteApplication(id: number): Observable<any> {
            return this.http.delete(`${apiUrl}/application/${id}`);
            }
}
