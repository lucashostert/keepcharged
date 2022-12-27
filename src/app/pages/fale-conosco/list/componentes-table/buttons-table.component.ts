import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'app-lista-buttons-categoria-table',
  template: `
  <button *ngIf="rowData.status" type="button" routerLink="/fale/{{rowData.id}}" class="btn btn-icons btn-rounded btn-warning">
    <i class="mdi mdi-exclamation text-white"></i>
  </button>
  <button *ngIf="!rowData.status" type="button" routerLink="/fale/{{rowData.id}}" class="btn btn-icons mr-2 btn-rounded btn-success">
  <i class="mdi mdi-thumb-up text-white"></i>
</button>
`,
})
export class ButtonsTableComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  
}
