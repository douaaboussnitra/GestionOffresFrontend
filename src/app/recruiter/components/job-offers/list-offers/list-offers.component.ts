import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/candidate/candidate.service';
import { jobOffersService } from 'src/app/mix/components/job-offers/service/job-offers.service';

@Component({
  selector: 'app-list-offers',
  templateUrl: './list-offers.component.html',
  styleUrls: ['./list-offers.component.css']
})
export class ListOffersComponent implements OnInit {
  formData: any;

  idJob: any;
  applications:any

  constructor(
    private fb: FormBuilder,
    private jobOffersService: jobOffersService, // Changed to PascalCase
    private candidateService: CandidateService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Subscribe to route parameters to get the job ID
   this.route.paramMap.subscribe((params) => {
      this.idJob = params.get('id');

      // Load candidates after retrieving job ID
/*       this.loadCandidatesByJobId(this.idJob);
 */    });

    // Load all job offers on initialization
    this.loadJobOffers();
  }

  loadJobOffers() {
    this.jobOffersService.getAllJoboffer().subscribe({
      next: (response) => {
        this.formData = response;
        console.log(this.formData)

      },
      error: (error) => {
        console.error('Error fetching job offers:', error);
      }
    });
  }

  /* loadCandidatesByJobId(idJob: number) {
    this.candidateService.getCandidatByJobId(idJob).subscribe({
      next: (response) => {
        this.formData = response;
        console.log(this.formData);
      },
      error: (error) => {
        console.error('Error fetching candidates:', error);
      }
    });
  } */

  deleteJobOffer(idJob: number): void {
    if (confirm('Are you sure you want to delete this job offer?')) {
      this.jobOffersService.deleteJoboffer(idJob.toString()).subscribe({
        next: () => {
          this.formData = this.formData.filter((offer: any) => offer.id !== idJob);
          alert('Job offer deleted successfully.');
        },
        error: (error) => {
          console.error('Error deleting job offer:', error);
          alert('An error occurred while deleting the job offer.');
        }
      });
    }
  }
}
