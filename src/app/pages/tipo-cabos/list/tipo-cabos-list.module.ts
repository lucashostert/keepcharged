import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoCabosListComponent } from './tipo-cabos-list.component';
import { TipoCaboProvider } from 'src/app/providers/tipo-cabo.provider';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RouterModule } from '@angular/router';
import { ButtonsTableComponent } from './componentes-table/buttons-table.component';

@NgModule({
  declarations: [
    TipoCabosListComponent,
    ButtonsTableComponent
  ],
  entryComponents: [ButtonsTableComponent],
  imports: [
    CommonModule,
    RouterModule,
    Ng2SmartTableModule
  ],
  providers: [
    TipoCaboProvider
  ]
})
export class TipoCabosListModule { }
