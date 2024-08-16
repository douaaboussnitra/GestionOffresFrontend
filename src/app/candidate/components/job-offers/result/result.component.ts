import { Component, OnInit } from '@angular/core';
import { jobOffersService } from 'src/app/mix/components/job-offers/service/job-offers.service';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  formData: any;

  constructor(private formDataService: jobOffersService) {}

  ngOnInit() {
    this.formData = this.formDataService.getData();
  }
}
