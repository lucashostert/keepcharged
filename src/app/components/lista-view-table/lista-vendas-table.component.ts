import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'app-lista-vendas-table',
  template: `
    <span class="text-danger" *ngIf="!rowData.vendas.positive">{{rowData.vendas.value}}%<i class="mdi mdi-arrow-down"></i>
    </span>
    <span class="text-success" *ngIf="rowData.vendas.positive">{{rowData.vendas.value}}%<i class="mdi mdi-arrow-up"></i>
    </span>
  `,
})
export class ListaVendasTableComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }
}
