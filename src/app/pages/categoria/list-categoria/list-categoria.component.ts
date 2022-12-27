import { PaginationProvider } from './../../../providers/pagination.provider';
import { CategoriaProvider } from './../../../providers/categoria.provider';

import { Component, OnInit } from '@angular/core';
import { ButtonsTableComponent } from './componentes-table/buttons-table.component';


@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.scss']
})
export class ListCategoriaComponent implements OnInit {
  public showpreloader;
  public datatable = {
    pager: { perPage: 30 },
    columns: {
      categoriaNome: {
        title: 'Nome'
      },
      status: {
        title: 'Status',
        type: 'html',
        filter: false,
        valuePrepareFunction: row => {
          if (row === 'Ativa') {
            return `<span class="badge badge-primary">Ativa</span>`;
          }
          if (row === 'Inativa') {
            return `<span class="badge badge-danger">Inativa</span>`;
          }
        }
      },
      button: {
        title: 'Ações',
        type: 'custom',
        renderComponent: ButtonsTableComponent,
        filter: false,
        sort: false
      }
    },
    attr: {
      class: 'table table-bordered'
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    }
  };

  public constructor(
    public _page: PaginationProvider,
    public categoriaProvider: CategoriaProvider) {
    this.showpreloader = true;
    this._page.reset();
    this.getCategorias();
  }

  ngOnInit() {
  }
  private getCategorias() {
    this._page.start(this.categoriaProvider.collectionName, (val) => {
      let status;
      if (val.status) {
        status = 'Ativa';
      } else {
        status = 'Inativa';
      }
      return { ...val, categoriaNome: val.nome ? val.nome : '', status: status };
    }).then(() => {
      this.showpreloader = false;
    });
  }
}
