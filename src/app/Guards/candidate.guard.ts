import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../mix/components/auth/service/auth.service';

export const candidateGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.isUserCandidate()) {
    return true;
  } else {
    router.navigate(['/home']);
    return false;
  }
};