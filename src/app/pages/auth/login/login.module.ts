import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UsuarioProvider } from 'src/app/providers/usuario.provider';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AngularFireAuthModule
  ],
  declarations: [LoginComponent],
  providers: [UsuarioProvider]
})
export class LoginModule { }
