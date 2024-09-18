import { AuthService } from 'src/app/mix/components/auth/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jobOffersService } from 'src/app/mix/components/job-offers/service/job-offers.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  jobPostForm: FormGroup;
  idJob: string | null = null;
  submitted = false;
  postedBy: any;

  constructor(
    private fb: FormBuilder,
    private jobOffersService: jobOffersService,
    private router: Router,
    private route: ActivatedRoute ,
    private authService: AuthService

  ) {
    this.jobPostForm = this.fb.group({
      title: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9 ,.-]+$")]],
      contractType: ['', [Validators.required]],
      description: ['', [Validators.required]],
      hierarchyLevel: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      salary: [''],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {

    this.authService.user$.subscribe({
      next: (user) => {
        this.postedBy = user.id;
      },
      error: (error) => {
        console.error(error);
      }
      });
    this.route.paramMap.subscribe((params) => {
      this.idJob = params.get('id');

      if (this.idJob) {
        this.jobOffersService.getJoboffer(this.idJob).subscribe({
          next: (data) => {
            this.jobPostForm.patchValue({
              title: data.title ?? '',
              companyName: data.companyName ?? '',
              location: data.location ?? '',
              contractType: data.contractType ?? '',
              description: data.description ?? '',
              hierarchyLevel: data.hierarchyLevel ?? '',
              skills: data.skills ?? '',
              salary: data.salary ?? '',
              email: data.email ?? '',
            });
          },
          error: (error) => {
            console.error('Error fetching job offer:', error);
          },
        });
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.jobPostForm.valid) {
      console.log(this.jobPostForm)
      if (this.idJob) {
        // Call the updateJoboffer service method
        this.jobOffersService.updateJoboffer(this.idJob, this.jobPostForm.value).subscribe({
          next: (response: any) => {
            console.log('Update successful', response);
            // Navigate to the job offer details page after successful update
            this.router.navigate(['/job-offers/details', response.id]);
          },
          error: (error: any) => {
            console.error('Error updating job offer', error);
          },
        });
      }
      else {
        let req = this .jobPostForm.value;
        req ['postedBy'] = this.postedBy;
        // Call the createJoboffer service method
        this.jobOffersService.createJoboffer(req).subscribe({
          next: (response: any) => {
            console.log('Creation successful', response);
            // Navigate to the job offer details page after successful creation
            this.router.navigate(['/job-offers/details', response.id]);
          },
          error: (error: any) => {
            console.error('Error creating job offer', error);
          },
        });
      }
    } {
      console.log('Invalid form', this.jobPostForm);
      Object.keys(this.jobPostForm.controls).forEach(key => {
        const controlErrors = this.jobPostForm.get(key)?.errors;
        if (controlErrors != null) {
          console.log(`Control ${key} has errors:`, controlErrors);
        }
      });
    }
  }
}
