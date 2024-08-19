import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/app/environements/backend';


@Injectable({
  providedIn: 'root'
})
export class jobOffersService {

  constructor(private http:HttpClient) {}

  form_rec(form : { title:string, company:string , location:string, type:string , description:string, skills:string , salary:string, email:string}) : Observable <any> {
    return this.http.post(`${apiUrl}/job-offers/form`, form);
  }


  applyJob(apply : { fullName:string, email:string , phone:string, jobType:string , resume:string, Lettre:string }) : Observable <any> {
    return this.http.post(`${apiUrl}/job-offers/result`, apply);
  }


  private data: any = {};

  setData(formData: any) {
    this.data = formData;
  }

  getData() {
    return this.data;

 }
 }
