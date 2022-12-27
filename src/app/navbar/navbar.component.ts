import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent {
  public sidebarOpened = false;
  Usuario: any;
  constructor(private config: NgbDropdownConfig,
    private afAuth: AngularFireAuth,
    private router: Router) {
    this.Usuario = JSON.parse(localStorage.getItem('usuario'));
    this.config.placement = 'bottom-right';
  }

  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    } else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
