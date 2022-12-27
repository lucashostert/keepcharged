import { ListaPlanoTableComponent } from '../../../components/lista-view-table/lista-plano-table.component';
import { ListaStatusTableComponent } from '../../../components/lista-view-table/lista-status-table.component';
import { Ponto } from '../../../../models/Ponto';
import { ListaButtonsPontoTableComponent } from '../../../components/lista-view-table/lista-buttons-ponto-table.component';

const statuslist = [];
Ponto.getStatusList().forEach((v) => {
  statuslist.push({ value: v.id, title: v.name });
});

export let datatable = {
  pager: {
    perPage: 30
  },
  columns: {
    nome: {
      title: 'Estabelecimento',
      valuePrepareFunction: (row: string) => {
        if (row.length) {
          return row.length >= 20 ? row.toUpperCase().slice(0, 17) + '...' : row.toUpperCase();
        }
        return '';
      },
    },
    cidade: {
      title: 'Cidade'
    },
    categorias: {
      title: 'Categoria',
      valuePrepareFunction: row => {
        if (row.length) {
          return row[0].nome;
        }
        return '';
      },
    },
    plano: {
      title: 'Plano',
      type: 'custom',
      renderComponent: ListaPlanoTableComponent
    },
    status: {
      title: 'Status',
      type: 'custom',
      renderComponent: ListaStatusTableComponent,
      filter: {
        type: 'list',
        config: {
          selectText: 'Todos',
          list: statuslist,
        },
      },
    },
    button: {
      title: 'Ações',
      type: 'custom',
      renderComponent: ListaButtonsPontoTableComponent,
      filter: false
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
