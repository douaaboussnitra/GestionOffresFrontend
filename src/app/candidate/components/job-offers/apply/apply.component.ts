import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/candidate/candidate.service';
import { ApplicationService } from 'src/app/recruiter/components/job-offers/applications/application.service';

@Component({
  selector: 'app-apply-form',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  applyForm!: FormGroup;
  id: number | null = null;
  fileCv:any;
  fileMotiva:any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    

    this.applyForm = this.formBuilder.group({
        fullname: [{ value: '', disabled: true }, Validators.required],
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        phone: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^\d{10}$/)]],
        jobType: [{ value: '', disabled: true }, Validators.required],
        resume: [null, Validators.required],
        Lettre: [null, Validators.required],
        experience: [{ value: '', disabled: true }, Validators.required],
        roleId: ['3', Validators.required]
      });
      

  }

  onSubmit(): void {
    console.log('Form Submitted');
    console.log(this.applyForm.value);
    if (this.applyForm.valid) {
      const formData = new FormData();
      formData.append('fullname', this.applyForm.get('fullname')?.value);
      formData.append('email', this.applyForm.get('email')?.value);
      formData.append('phone', this.applyForm.get('phone')?.value);
      formData.append('experience', this.applyForm.get('experience')?.value);
      formData.append('jobType', this.applyForm.get('jobType')?.value);
      formData.append('filecv', this.fileCv);
      formData.append('filemotiva', this.fileMotiva);
      formData.append('roleId', this.applyForm.get('roleId')?.value);


      if (this.id) {
        this.applicationService.updateApplication(this.id, formData).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/job-offers/result']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      } else {
        this.applicationService.createApplication(formData).subscribe({
          next: (response) => {
            console.log(response);
            this.router.navigate(['/job-offers/result']);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }
  }



  onFileChange(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
       if(type == 'cv'){
        this.fileCv = file;
       }else{
        this.fileMotiva = file
       }
    }
  }
}