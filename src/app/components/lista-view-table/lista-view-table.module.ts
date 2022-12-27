import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {ListaButtonsRepresentanteTableComponent} from './lista-buttons-representante-table.component';
import {ListaProgressTableComponent} from './lista-progress-table.component';
import {ListaVendasTableComponent} from './lista-vendas-table.component';
import {ListaPlanoTableComponent} from './lista-plano-table.component';
import {ListaStatusTableComponent} from './lista-status-table.component';
import {ListaButtonsPontoTableComponent} from './lista-buttons-ponto-table.component';

@NgModule({
  declarations: [
    ListaButtonsRepresentanteTableComponent,
    ListaProgressTableComponent,
    ListaVendasTableComponent,
    ListaPlanoTableComponent,
    ListaStatusTableComponent,
    ListaButtonsPontoTableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ]
})
export class ListaViewTableModule {
}
