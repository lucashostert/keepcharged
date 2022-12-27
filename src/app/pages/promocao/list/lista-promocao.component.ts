import { Component, OnInit } from '@angular/core';
import { PaginationProvider } from '../../../providers/pagination.provider';
import { DateUtils } from '../../../utils/DateUtils';
import { PromocaoProvider } from '../../../providers/promocao.provider';
import { ButtonsTableComponent } from './componentes-table/buttons-table.component';

@Component({
  selector: 'app-lista-promocao',
  templateUrl: './lista-promocao.component.html',
  styleUrls: ['./lista-promocao.component.scss']
})
export class ListaPromocaoComponent implements OnInit {
  public showpreloader;
  public datatable = {
    pager: {
      perPage: 30
    },
    columns: {
      imagem: {
        title: 'Imagem',
        type: 'html',
        valuePrepareFunction: (imagem) => {
          return `<a href="${imagem}" target="_blank" rel="noopener"><img src="${imagem}" class="border-none" alt="Imagem do Evento"></a>`;
        },
        filter: false,
        sort: false
      },
      localNome: {
        title: 'Local'
      },
      titulo: {
        title: 'Titulo'
      },
      dataValidade: {
        title: 'Data de Validade',
        valuePrepareFunction: date => {
          return date ? DateUtils.format(date.toDate()) : '';
        }
      },
      status: {
        title: 'Status',
        type: 'html',
        valuePrepareFunction: row => {
          if (row === 'Ativa') {
            return `<span class="badge badge-primary">Ativa</span>`;
          }
          if (row === 'Inativa') {
            return `<span class="badge badge-danger">Inativa</span>`;
          }
          return `<span class="badge badge-warning">Sem Validade</span>`;
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
    public promocaoProvider: PromocaoProvider) {
    this.showpreloader = true;
    this._page.reset();
    this.getPromocoes();
  }

  public ngOnInit() {
  }

  private getPromocoes() {
    this._page.start(this.promocaoProvider.collectionName, (val) => {
      let status;
      if (val.dataValidade) {
        if (DateUtils.isBiggerOrEqualCurrent(val.dataValidade.toDate())) {
          status = 'Ativa';
        } else {
          status = 'Inativa';
        }
      } else {
        status = 'Sem Validade';
      }

      return { ...val, localNome: val.local ? val.local.nome : '', status: status };
    }).then(() => {
      this.showpreloader = false;
    });
  }
}
