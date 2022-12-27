import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonsTableComponent} from './componentes-table/buttons-table.component';
import { RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { PaginationProvider } from '../../../providers/pagination.provider';
import { ListCategoriaComponent } from './list-categoria.component';
@NgModule({
  declarations: [
    ListCategoriaComponent,
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
    PaginationProvider,
  ]
})
export class ListCategoriaModule {
}
