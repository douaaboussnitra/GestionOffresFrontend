import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './application.service';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/candidate/candidate.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  formData: any;
  idJob: any;

  constructor(private candidateService : CandidateService ,
    private route: ActivatedRoute
   ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.idJob = params.get('id');})

    this.candidateService.getCandidatByJobId(this.idJob).subscribe( {
      next : (response) => {
        console.log(response)
        this.formData = response;
        console.log(this.formData)
      },
       error : (error) => {
        console.error('Error fetching data:', error);
      }
    }
    );

  }
}



