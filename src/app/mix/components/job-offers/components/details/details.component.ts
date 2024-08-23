import { Component, OnInit } from '@angular/core';
import { jobOffersService } from '../../service/job-offers.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  formData: any;

  constructor(private jobOffersService: jobOffersService ) {}
  ngOnInit() {
    this.jobOffersService.getJoboffer(1).subscribe( {
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
