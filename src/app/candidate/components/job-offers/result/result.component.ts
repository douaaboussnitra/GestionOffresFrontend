import { ApplicationService } from 'src/app/recruiter/components/job-offers/applications/application.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/candidate/candidate.service';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  formData: any;
  id: any;

  constructor(private route: ActivatedRoute,private applicationService: ApplicationService ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params:any) => {
      this.id = +params.get('id');
    });
    this.applicationService.getAllApplicationById(this.id).subscribe( {
      next : (response) => {
        this.formData = response;
      },
       error : (error) => {
        console.error('Error fetching data:', error);
      }
    }
    );

  }
}

