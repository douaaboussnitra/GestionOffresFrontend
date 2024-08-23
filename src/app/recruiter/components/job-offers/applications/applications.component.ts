import { Component, OnInit } from '@angular/core';
import { ApplicationService } from './application.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  formData: any;

  constructor(private applicationService: ApplicationService ) {}
  ngOnInit() {
    this.applicationService.getAllApplication().subscribe( {
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



