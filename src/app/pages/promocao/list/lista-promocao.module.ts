import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {CategoriaProvider} from '../../../providers/categoria.provider';
import {PlanoProvider} from '../../../providers/plano.provider';
import {PaginationProvider} from '../../../providers/pagination.provider';
import {PontoProvider} from '../../../providers/ponto.provider';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ListaPromocaoComponent} from './lista-promocao.component';
import {ButtonsTableComponent} from './componentes-table/buttons-table.component';

@NgModule({
  declarations: [
    ListaPromocaoComponent,
    ButtonsTableComponent
  ],
  entryComponents: [
    ButtonsTableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    Ng2SmartTableModule
  ],
  providers: [
    CategoriaProvider,
    PlanoProvider,
    PaginationProvider,
    PontoProvider
  ]
})
export class ListaPromocaoModule {
}
