import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';

@Component({
  selector: 'app-lista-plano-table',
  template: `
    <span [ngStyle]="{'color': rowData.planoColor}">{{rowData.plano}} <i class="mdi mdi-arrow-up"></i></span>
  `,
})
export class ListaPlanoTableComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }
}
