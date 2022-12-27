import { ListaButtonsRepresentanteTableComponent } from '../../../components/lista-view-table/lista-buttons-representante-table.component';
import { ListaProgressTableComponent } from '../../../components/lista-view-table/lista-progress-table.component';
import { ListaVendasTableComponent } from '../../../components/lista-view-table/lista-vendas-table.component';

export const datatable: any = {
  pager: {
    perPage: 30
  },
  columns: {
    nome: {
      title: 'Nome',
      filter: true
    },
    email: {
      title: 'E-mail',
      filter: true
    },
    meta: {
      title: 'Meta',
      type: 'custom',
      renderComponent: ListaProgressTableComponent,
      filter: false,
      sort: false
    },
    vendas: {
      title: 'Vendas',
      type: 'custom',
      renderComponent: ListaVendasTableComponent,
      filter: false
    },
    cargo: {
      title: 'Cargo',
      filter: {
        type: 'list',
        config: {
          selectText: 'Todos',
          list: []
        }
      }
    },
    button: {
      title: 'Ações',
      type: 'custom',
      renderComponent: ListaButtonsRepresentanteTableComponent,
      filter: false
    }
  },
  attr: {
    class: 'table table-bordered'
  },
  actions: {
    delete: false,
    edit: false,
    add: false
  }
};
