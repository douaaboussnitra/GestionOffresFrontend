import { Component, OnInit } from '@angular/core';
import { jobOffersService } from 'src/app/mix/components/job-offers/service/job-offers.service';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent  implements OnInit {
  formData: any;

  constructor(private jobOffersService: jobOffersService ) {}
  ngOnInit() {
    this.jobOffersService.getAllJoboffer().subscribe( {
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
