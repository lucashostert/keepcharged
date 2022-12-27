import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { PaginationProvider } from "src/app/providers/pagination.provider";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CustoCarregamentoComponent } from "./list/custo-carregamento.component";
import { CustoComponent } from "./manager/custo.component";
import { ButtonsTableComponent } from "./list/componentes-table/buttons-table.component";
import { CustoCarregamentoProvider } from "src/app/providers/custo-carregamento.provider";


@NgModule({
  declarations: [
    CustoCarregamentoComponent,
    ButtonsTableComponent,
    CustoComponent
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
    CustoCarregamentoProvider
  ]
})
export class CustoCarregamentoModule { }