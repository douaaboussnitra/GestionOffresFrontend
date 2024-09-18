import { Component, OnInit } from '@angular/core';
import { jobOffersService } from '../../service/job-offers.service';

@Component({
  selector: 'app-jop-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class offersComponent implements OnInit {
  filteredJobOffers: any;
  Skills: string[] = [];
  contrat = [
    { value: "fulltime", label: "Full-time" },
    { value: "parttime", label: "Part-time" },
    { value: "internship", label: "Internship" },
    { value: "freelance", label: "Freelance" },
  ];
  selectedContractType: string = ''; // For storing selected contract type
  selectedSkill: string = ''; // For storing selected skill

  constructor(private jobOffersService: jobOffersService) {}

  ngOnInit() {
    this.jobOffersService.getAllJoboffer().subscribe({
      next: (response) => {
        this.filteredJobOffers = response; // res list serch
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });

    this.jobOffersService.getAllSkills().subscribe({
      next: (response) => {
        this.Skills = response;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  searchJobs() {
    this.jobOffersService.searchJobOffers(this.selectedContractType, this.selectedSkill).subscribe({
      next: (response) => {
        this.filteredJobOffers = response; // affichage results
      },
      error: (error) => {
        console.error('Error fetching filtered jobs:', error);
      }
    });
  }


}
