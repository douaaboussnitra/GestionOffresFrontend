import { Component, OnInit } from '@angular/core';
import { jobOffersService } from '../../service/job-offers.service';

@Component({
  selector: 'app-jop-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class offersComponent implements OnInit {
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
