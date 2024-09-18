import { apiUrl } from 'src/app/environements/backend';
import { ApplicationService } from 'src/app/recruiter/components/job-offers/applications/application.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  formData: any;
  id: any;
  api_Url

  constructor(private route: ActivatedRoute,private applicationService: ApplicationService ) {}
  ngOnInit() {
    this.api_Url=apiUrl.replace('/api','') //delete the api replace par "" becouse we have folder uploads
    this.route.paramMap.subscribe((params:any) => {// pour params dyal application
      this.id = params.get('id');
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

