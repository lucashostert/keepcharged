import { Component, ViewChild, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormValidator } from 'src/app/utils/validator/FormValidator';
import { NgForm } from '@angular/forms';
import { UsuarioProvider } from 'src/app/providers/usuario.provider';
import swal from 'sweetalert';
import { Validators } from 'src/app/utils/validator/Validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormValidator implements OnInit {
  @ViewChild('loginForm') _form: NgForm;

  public showpreloader = false;
  public login = {
    email: '',
    password: ''
  };

  public constructor(
    private afAuth: AngularFireAuth,
    private usuarioProvider: UsuarioProvider,
    private router: Router) {
    super();

    this.afAuth.authState.pipe(first())
      .toPromise()
      .then(user => {
        if (user) {
          this.router.navigate(['/dashboard']);
        }
      });
  }

  public ngOnInit() {
    setTimeout(() => {
      this._form.controls.loginEmail.setValidators([Validators.email]);
    });
  }

  public async signIn() {
    if (this.formInvalid()) {
      swal('Ops!', 'Verifique os campos!', 'error');
      return;
    }

    this.showpreloader = true;
    try {
      const user = await this.afAuth.auth.signInWithEmailAndPassword(this.login.email, this.login.password);
      const doc: any = await this.usuarioProvider.getById(user.user.uid);
      if (doc.cargo && doc.cargo !== null && doc.cargo !== '' && true === doc.ativo) {
        localStorage.setItem('forautologin', JSON.stringify({ email: this.login.email.trim(), senha: this.login.password }));
        localStorage.setItem('usuario', JSON.stringify(doc));
        this.router.navigate(['/dashboard']);
      } else {
        this.afAuth.auth.signOut();
        this.showpreloader = false;
        swal('Erro', 'Você não tem permissão para realizar login.', 'error');
      }
    } catch (e) {
      console.error('Erro ao efetuar login', e);
      swal('Erro', 'Por favor, verifique seu e-mail e senha.', 'error');
      this.showpreloader = false;
    }
  }
}
