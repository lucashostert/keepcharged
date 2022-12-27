import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {FireStorageProvider} from '../../../providers/fire-storage.provider';
import {PromocaoProvider} from '../../../providers/promocao.provider';
import {PromocaoComponent} from './promocao.component';

@NgModule({
  declarations: [
    PromocaoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    FireStorageProvider,
    PromocaoProvider
  ]
})
export class PromocaoModule {
}
