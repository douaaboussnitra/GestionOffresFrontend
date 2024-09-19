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
  isSubmit:boolean=false;
  idapp: any;



  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private applicationService: ApplicationService,
    private aut:AuthService
  ) {}

  ngOnInit(): void {
    this.aut.user$.subscribe({
      next: (user) => {
        this.idCandidat = user?.id
      },

      error: (error) => {
        console.error(error);
      }
    });
    this.route.paramMap.subscribe((params: any) => {
      this.idJob = params.get('id');

    });


    this.applyForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern(/^[a-zA-Z][a-zA-Z0-9._%+-]*@gmail\.com$/)]],
      phone: ['+212', [Validators.required, Validators.pattern(/^\+212[1-9]\d{8}$/) ]],
      jobType: ['', Validators.required],
      resume: [null, Validators.required],
      Lettre: [null, Validators.required],
      experience: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.isSubmit=true;
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


  onFileChange(element: Event, type: string) {
    const input:any = element.target;
    if (input.files?.length) {
      const file = input.files[0]; // 0 hitach uplode lfile 1
      if (type === 'cv') {
        this.fileCv = file;
      } else {
        this.fileMotiva = file;
      }
    }
  }
}
