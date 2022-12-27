import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {ListaEventoComponent} from './lista-evento.component';
import {PaginationProvider} from '../../../providers/pagination.provider';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ButtonsTableComponent} from './componentes-table/buttons-table.component';
import {EventoProvider} from '../../../providers/evento.provider';

@NgModule({
  declarations: [
    ListaEventoComponent,
    ButtonsTableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
    ButtonsTableComponent
  ],
  providers: [
    PaginationProvider,
    EventoProvider
  ]
})
export class ListaEventoModule {
}
