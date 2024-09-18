import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/candidate/candidate.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  formData: any;
  idJob: any;
  emails:string[]=[]

  constructor(private candidateService : CandidateService,
    private route: ActivatedRoute
   ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => {
      this.idJob = params.get('id');})

    this.candidateService.getCandidatByJobId(this.idJob).subscribe( {
      next : (response) => {
        console.log(response)
        this.formData = response;
        console.log(this.formData)
      },
       error : (error) => {
        console.error('Error fetching data:', error);
      }
    }
    );
  }


onChecked(event: any, candidate: any) {
  if (event.target.checked) {
    this.emails.push(candidate.email);  // Add email to the list
  } else {
    const index = this.emails.indexOf(candidate.email);
    if (index > -1) {
      this.emails.splice(index, 1);  // Remove email from the list if unchecked
    }
  }
}

// Redirect to Gmail to send emails
redirectToGmail() {
  if (this.emails.length === 0) {
    alert('No candidates selected');  // Check the email wach kayn
    return;
  }

  const toEmails = this.emails.join(',');  // Join the emails into string
  const subject = encodeURIComponent('Follow-up on your Job Application');
  const body = encodeURIComponent(`Dear Candidate,\n\nWe are pleased to inform you that your application is under review.\n\nBest regards,\nRecruitment Team`);

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmails}&su=${subject}&body=${body}`;

  window.open(gmailUrl, '_blank');
}
}



