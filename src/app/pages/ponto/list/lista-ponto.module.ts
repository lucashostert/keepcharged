import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {ListaPontoComponent} from './lista-ponto.component';
import {CategoriaProvider} from '../../../providers/categoria.provider';
import {PlanoProvider} from '../../../providers/plano.provider';
import {PaginationProvider} from '../../../providers/pagination.provider';
import {PontoProvider} from '../../../providers/ponto.provider';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ListaPlanoTableComponent} from '../../../components/lista-view-table/lista-plano-table.component';
import {ListaStatusTableComponent} from '../../../components/lista-view-table/lista-status-table.component';
import {ListaButtonsPontoTableComponent} from '../../../components/lista-view-table/lista-buttons-ponto-table.component';

@NgModule({
  declarations: [
    ListaPontoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
    ListaPlanoTableComponent,
    ListaButtonsPontoTableComponent,
    ListaStatusTableComponent
  ],
  providers: [
    CategoriaProvider,
    PlanoProvider,
    PaginationProvider,
    PontoProvider
  ]
})
export class ListaPontoModule { }
