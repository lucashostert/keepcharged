import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private afAuth: AngularFireAuth,
    private router: Router) { }

  canActivate(): Promise<boolean> {
    return this.afAuth.authState.pipe(first()).toPromise().then((user) => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
