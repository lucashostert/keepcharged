import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userAdmin = false;
  Usuario: any;
  public samplePagesCollapsed = true;
  constructor(private router: Router) {
    this.Usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  ngOnInit() {
  }
  addEstabelecimento() {
    this.router.navigate(['/estabelecimento']);
  }
}
