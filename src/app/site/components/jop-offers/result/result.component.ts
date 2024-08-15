import { Component, OnInit } from '@angular/core';
import { jopOffersService } from '../../jop-offers.service';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  formData: any;

  constructor(private formDataService: jopOffersService) {}

  ngOnInit() {
    this.formData = this.formDataService.getData();
  }
}
