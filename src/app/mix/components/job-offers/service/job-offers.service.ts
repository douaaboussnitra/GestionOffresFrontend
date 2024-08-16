import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class jobOffersService {
  private data: any = {};

  setData(formData: any) {
    this.data = formData;
  }

  getData() {
    return this.data;

 }
 }
