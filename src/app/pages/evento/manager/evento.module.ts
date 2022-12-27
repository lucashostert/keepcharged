import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {FireStorageProvider} from '../../../providers/fire-storage.provider';
import {EventoComponent} from './evento.component';
import {EventoProvider} from '../../../providers/evento.provider';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    EventoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    // NgbModule,
    // QuillModule,
    // NgxDatatableModule,
  ],
  providers: [
    FireStorageProvider,
    EventoProvider
  ]
})
export class EventoModule {
}
