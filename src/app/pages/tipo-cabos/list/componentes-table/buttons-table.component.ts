import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-buttons-table',
  template: `
    <button type="button" routerLink="/tipo-cabo/{{rowData.id}}" class="btn btn-icons mr-2 btn-rounded btn-success">
      <i class="mdi mdi-pencil text-white"></i>
    </button>
    <button type="button" class="btn btn-icons btn-rounded btn-danger" (click)="onClick('desativar')">
      <i class="fa fa-trash-o text-white"></i>
    </button>
  `,
})
export class ButtonsTableComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() delete: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onClick(action) {
    this.delete.emit({ action: action, row: this.rowData });
  }
}
