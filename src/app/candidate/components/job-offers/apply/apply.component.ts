import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-apply-form',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {

  constructor(private router :Router){}


  onSubmit(){

    this.router.navigate(['/job-offers/result'])
  }
}












