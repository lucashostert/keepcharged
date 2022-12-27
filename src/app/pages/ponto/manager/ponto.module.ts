import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PontoComponent } from './ponto.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {FireStorageProvider} from '../../../providers/fire-storage.provider';
import {CategoriaProvider} from '../../../providers/categoria.provider';
import {PlanoProvider} from '../../../providers/plano.provider';
import {UsuarioProvider} from '../../../providers/usuario.provider';
import {PontoProvider} from '../../../providers/ponto.provider';
import { NgSelectModule } from '@ng-select/ng-select';
import { comoDescobriuProvider } from 'src/app/providers/comoDescobriu.provider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PontoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule,

  ],
  providers: [
    CategoriaProvider,
    comoDescobriuProvider,
    PlanoProvider,
    FireStorageProvider,
    UsuarioProvider,
    PontoProvider
  ]
})
export class PontoModule { }
