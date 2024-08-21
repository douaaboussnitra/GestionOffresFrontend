import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/candidate/candidate.service';
import { jobOffersService } from 'src/app/mix/components/job-offers/service/job-offers.service';


@Component({
  selector: 'app-apply-form',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {
  applyForm: FormGroup;
  id : number|null=null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private  candidateService: CandidateService

    ) {
      this.applyForm = this.formBuilder.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        jobType: ['', Validators.required],
        resume: ['', Validators.required],
        Lettre: ['', Validators.required]
        });
        }
  ngOnInit(): void {}

  onSubmit(){
    console.log(this.applyForm.value);
    if (this.applyForm.valid) { 
        if (this.id) {
          this.candidateService.updateCandidat(this.id,this.applyForm.value).subscribe( {
            next:(response)  => {
              console.log(response);
              this.router.navigate(['/job-offers/result']);
              },
             error: (error) => {
                console.log(error);
                }
      
          }
      
                );
          
        } else {
          this.candidateService.createCandidat(this.applyForm.value).subscribe( {
            next:(response)  => {
              console.log(response);
              this.router.navigate(['/job-offers/result']);
              },
             error: (error) => {
                console.log(error);
                }
      
          }
      
                );
          
        }
          }
          }
          }












