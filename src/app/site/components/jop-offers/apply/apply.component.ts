import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jopOffersService } from './jop-offers.service';


@Component({
  selector: 'app-apply-form',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent {
  formData = {
    fullName: '',
    email: '',
    phone: '',
    jobType: '',
    position: '',
    location: '',
    coverLetter: '',
    resume: null
  };

  submitted = false;
  formDataService: any;

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formData.resume = file;
    }
  }
  constructor(private router: Router, private jopOffersService: jopOffersService) { }



  onSubmit() {
    this.formDataService.setData(this.formData);
    this.router.navigate(['/result']);
  }
}






