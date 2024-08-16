import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-role',
  templateUrl: './choose-role.component.html',
  styleUrls: ['./choose-role.component.css']
})
export class ChooseRoleComponent {

  constructor(private router: Router) {}

  onCandidateClick() {
    // Navigate to the candidate registration page
    this.router.navigate(['/auth/register']);
  }

  onRecruiterClick() {
    // Navigate to the recruiter registration page
    this.router.navigate(['/auth/register-recruiter']);  }
}