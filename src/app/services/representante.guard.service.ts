import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RepresentanteGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(): boolean {
    let us = JSON.parse(localStorage.getItem("usuario"));
    if (!us) {
      this.router.navigate(['/login']);
      return false;
    }

    if (us.cargo == 'Admin') {
      return true;
    }

    this.router.navigate(['/estabelecimentos']);
    return false;
  }
}
