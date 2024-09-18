import { Component, OnInit } from '@angular/core';
import { jobOffersService } from '../../service/job-offers.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  formData: any;
  id: string="";
  roleId:number;

  constructor(private route: ActivatedRoute,private jobOffersService: jobOffersService,private aut : AuthService ) {}
  ngOnInit() {
 this.aut.user$.subscribe({
  next: (user: any) => {
    this.roleId=user.role;
  }
 }
 );

    this.route.paramMap.subscribe((params:any) => {
      this.id = params.get('id');
    });
    this.jobOffersService.getJoboffer(this.id).subscribe( {
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
