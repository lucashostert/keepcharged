import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {ListaRepresentanteComponent} from './lista-representante.component';
import {PaginationProvider} from '../../../providers/pagination.provider';
import {UsuarioProvider} from '../../../providers/usuario.provider';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ListaViewTableModule} from '../../../components/lista-view-table/lista-view-table.module';
import {ListaButtonsRepresentanteTableComponent} from '../../../components/lista-view-table/lista-buttons-representante-table.component';
import {ListaVendasTableComponent} from '../../../components/lista-view-table/lista-vendas-table.component';
import {ListaProgressTableComponent} from '../../../components/lista-view-table/lista-progress-table.component';

@NgModule({
  declarations: [
    ListaRepresentanteComponent
  ],
  entryComponents: [
    ListaButtonsRepresentanteTableComponent,
    ListaProgressTableComponent,
    ListaVendasTableComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    Ng2SmartTableModule,
    ListaViewTableModule
  ],
  providers: [
    PaginationProvider,
    UsuarioProvider
  ]
})
export class ListaRepresentanteModule { }
