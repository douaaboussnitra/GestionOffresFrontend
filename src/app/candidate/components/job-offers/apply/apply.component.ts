import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/mix/components/auth/service/auth.service';
import { ApplicationService } from 'src/app/recruiter/components/job-offers/applications/application.service';

@Component({
  selector: 'app-apply-form',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  applyForm!: FormGroup;
  idJob: number | null = null;
  fileCv: any;
  fileMotiva: any;
  idCandidat: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private applicationService: ApplicationService,
    private aut:AuthService
  ) {}

  ngOnInit(): void {
    this.idCandidat = localStorage.getItem('CANDIDAT_ID')
    this.route.paramMap.subscribe((params: any) => {
      console.log("1 in")
      this.idJob = params.get('id');
    });
    this.applyForm = this.formBuilder.group({
      fullName: ['', Validators.required], // Changed from 'fullname' to 'fullName'
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      jobType: ['', Validators.required],
      resume: [null, Validators.required],
      Lettre: [null, Validators.required],
      experience: ['', Validators.required],
      roleId: ['3', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.applyForm.valid) {
      const formData = new FormData();
      formData.append('fullName', this.applyForm.get('fullName')?.value);
      formData.append('email', this.applyForm.get('email')?.value);
      formData.append('phone', this.applyForm.get('phone')?.value);
      formData.append('experience', this.applyForm.get('experience')?.value);
      formData.append('jobType', this.applyForm.get('jobType')?.value);
      formData.append('filecv', this.fileCv);
      formData.append('filemotiva', this.fileMotiva);
      formData.append('roleId', this.applyForm.get('roleId')?.value);
      formData.append('candidateId', this.idCandidat);
      formData.append('jobOfferId', `${this.idJob}`);

      this.applicationService.createApplication(formData).subscribe({
        next: (response: any) => {
          this.router.navigate(['/job-offers/result', response.id]);
        },
        error: (error) => {
          console.error('Error submitting application:', error);
        }
      });
    }
  }

  onFileChange(event: Event, type: string) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (type === 'cv') {
        this.fileCv = file;
      } else {
        this.fileMotiva = file;
      }
    }
  }
}
