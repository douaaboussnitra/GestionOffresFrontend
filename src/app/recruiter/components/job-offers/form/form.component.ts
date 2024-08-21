import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jobOffersService } from 'src/app/mix/components/job-offers/service/job-offers.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  jobPostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jobOffersService: jobOffersService,
    private router: Router
  ) {
    this.jobPostForm = this.fb.group({
      title: ['', [Validators.required]],
      company: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ,.-]+$")]],  // Assuming location is a text pattern
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],  // Correct validator for email
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.jobPostForm.valid) {
      this.jobOffersService.createJoboffer(this.jobPostForm.value).subscribe({
        next: (response: any) => {
          console.log('Successful', response);
          this.router.navigate(['/job-offers/details']);
        },
        error: (error: any) => {
          console.log('Error', error);
        }
      });
    } else {
      console.log('Invalid form');
    }
  }
}
