import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';
import { Application } from 'src/app/models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http:HttpClient) { }
  getAllApplication(): Observable<Application[]> {
    return this.http.get<Application[]>(`${apiUrl}/application`);
    }
    getAllApplicationById(id: number): Observable<Application>{
      return this.http.get<Application>(`${apiUrl}/application/${id}`);
      }
      createApplication(application: FormData): Observable<boolean> {
        return this.http.post<boolean>(`${apiUrl}/application`, application);
        }
        updateApplication(id: number, application: FormData): Observable<boolean> {
          return this.http.put<boolean>(`${apiUrl}/application/${id}`, application);
          }
          deleteApplication(id: number): Observable<boolean> {
            return this.http.delete<boolean>(`${apiUrl}/application/${id}`);
            }
}
