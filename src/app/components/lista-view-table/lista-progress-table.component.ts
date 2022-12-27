import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'app-lista-progress-table',
  template: `
    <div class="progress">
      <div class="progress-bar bg-{{rowData.progressbar.class}} progress-bar-striped progress-bar-animated" role="progressbar" [ngStyle]="{'width': rowData.progressbar.value+'%'}" [attr.aria-valuenow]="rowData.progressbar.value" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  `,
})
export class ListaProgressTableComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }
}
