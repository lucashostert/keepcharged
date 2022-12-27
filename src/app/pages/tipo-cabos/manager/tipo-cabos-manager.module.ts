import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoCabosManagerComponent } from './tipo-cabos-manager.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TipoCaboProvider } from 'src/app/providers/tipo-cabo.provider';

@NgModule({
  declarations: [TipoCabosManagerComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    TipoCaboProvider
  ]
})
export class TipoCabosManagerModule { }
