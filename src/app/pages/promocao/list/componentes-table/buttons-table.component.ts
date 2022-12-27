import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'app-lista-buttons-ponto-table',
  template: `
    <button type="button" routerLink="/promocao/{{rowData.id}}" class="btn btn-icons mr-2 btn-rounded btn-success">
      <i class="mdi mdi-pencil text-white"></i>
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
