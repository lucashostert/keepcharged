import { FaleConoscoComponent } from "./list/fale-conosco.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { PaginationProvider } from "src/app/providers/pagination.provider";
import { ContatoProvider } from "src/app/providers/contato.provider";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ButtonsTableComponent } from "./list/componentes-table/buttons-table.component";
import { FaleComponent } from './manager/fale.component';


@NgModule({
  declarations: [
   FaleConoscoComponent,
   ButtonsTableComponent,
   FaleComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    Ng2SmartTableModule,
    NgbModule,
    FormsModule,

  ],
  entryComponents: [
    ButtonsTableComponent
  ],
  providers: [
    PaginationProvider,
    ContatoProvider
  ]
})
export class FaleConoscoModule { }