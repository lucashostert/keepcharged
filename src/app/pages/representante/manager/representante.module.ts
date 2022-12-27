import { NgModule } from '@angular/core';
import { RepresentanteComponent } from './representante.component';
import { CropmodalComponent } from '../../../cropmodal/cropmodal.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FireStorageProvider} from '../../../providers/fire-storage.provider';
import { CargoProvider } from '../../../providers/cargo.provider';
import { UsuarioProvider } from '../../../providers/usuario.provider';

@NgModule({
  declarations: [
    RepresentanteComponent
  ],
  entryComponents: [
    CropmodalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AngularFireStorageModule
  ],
  providers: [
    FireStorageProvider,
    CargoProvider,
    UsuarioProvider
  ]
})
export class RepresentanteModule { }
