import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/candidate/candidate.service';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  formData: any;

  constructor(private candidateService: CandidateService ) {}
  ngOnInit() {
    this.candidateService.getCandidat(1).subscribe( {
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

