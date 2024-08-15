import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class jopOffersService {
  private data: any = {};

  setData(formData: any) {
    this.data = formData;
  }

  getData() {
    return this.data;

 }
 }
