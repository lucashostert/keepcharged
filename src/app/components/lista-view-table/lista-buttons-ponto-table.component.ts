import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'app-lista-buttons-ponto-table',
  template: `
    <button type="button" routerLink="/estabelecimento/{{rowData.id}}" class="btn btn-icons mr-2 btn-rounded btn-success">
      <i class="mdi mdi-pencil text-white"></i>
    </button>
    <button type="button" class="btn btn-icons btn-rounded btn-warning" *ngIf="rowData.ativo && usuario.cargo == 'Admin'"
      (click)="onClick('desativar')">
      <i class="mdi mdi-thumb-down text-white"></i>
    </button>
    <button type="button" class="btn btn-icons btn-rounded btn-success" *ngIf="!rowData.ativo && usuario.cargo == 'Admin'"
      (click)="onClick('ativar')">
      <i class="mdi mdi-thumb-up text-white"></i>
    </button>
  `,
})
export class ListaButtonsPontoTableComponent implements ViewCell, OnInit {
  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  usuario;

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  onClick(action) {
    this.save.emit({ action: action, row: this.rowData });
  }
}
