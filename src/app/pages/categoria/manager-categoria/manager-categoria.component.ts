import { CategoriaProvider } from './../../../providers/categoria.provider';
import { FirebaseProvider } from './../../../providers/firebase.provider';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormValidator } from '../../../utils/validator/FormValidator';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manager-categoria',
  templateUrl: './manager-categoria.component.html',
  styleUrls: ['./manager-categoria.component.scss']
})
export class ManagerCategoriaComponent extends FormValidator implements OnInit {
  @ViewChild('categoriaForm') form: NgForm;

  categoria: { nome: String, background: String, borda: String, status: boolean } = {
    nome: '',
    background: '#ffffff',
    borda: '#ffffff',
    status: true
  };
  id=0;
  showpreloader = false;
  constructor(
    public _categoria: CategoriaProvider,
    public router: Router,
    public activatedRoute: ActivatedRoute) {
    super();
    this.showpreloader = true;
    this.activatedRoute.params.subscribe((res) => {
      let id = res.id;
      if(id)
      this._categoria.getById(id).then((res: any) => {
        this.id=id;
        this.categoria = res;
        this.showpreloader = false;
      });
      else
      this.showpreloader = false;
    });
  }

  ngOnInit() {
    this._form = this.form;
  }

  public save() {
    if (this.formInvalid()) {
      swal('Ops!', 'Verifique os campos!', 'error');
      return;
    } else {
      if(this.id)
      this._categoria.update(this.id,this.categoria).then((res) => {
        swal('Categoria editada com sucesso!', { icon: 'success' }).then(()=>{
          this.router.navigate(['/categorias']);
        });
      });
      else
      this._categoria.add(this.categoria).then((res) => {
        swal('Categoria cadastrada com sucesso!', { icon: 'success' }).then(()=>{
          this.router.navigate(['/categorias']);
        });
      });
    }
  }
}
