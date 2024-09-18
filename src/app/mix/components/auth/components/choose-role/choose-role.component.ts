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
    this.router.navigate(['/auth/register']);
  }

  onRecruiterClick() {
    this.router.navigate(['/auth/register-recruiter']);  }
}
