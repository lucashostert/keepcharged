import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'app-lista-status-table',
  template: `
    <span class="badge badge-primary" [ngClass]="{'badge-info': rowData.status == 0,'badge-primary': rowData.status == 1, 'badge-danger': rowData.status == 3, 'badge-warning': rowData.status == 2, 'badge-success': rowData.status == 4}">{{rowData.statusNome}}</span>
  `,
})
export class ListaStatusTableComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }
}
