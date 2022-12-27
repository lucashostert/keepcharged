import { Component, OnInit } from '@angular/core';
import { PaginationProvider } from '../../../providers/pagination.provider';
import { ButtonsTableComponent } from './componentes-table/buttons-table.component';
import { EventoProvider } from '../../../providers/evento.provider';
import { DateUtils } from '../../../utils/DateUtils';

@Component({
  selector: 'app-lista-evento',
  templateUrl: './lista-evento.component.html',
  styleUrls: ['./lista-evento.component.scss']
})
export class ListaEventoComponent implements OnInit {
  public showpreloader;
  public datatable = {
    pager: {
      perPage: 30
    },
    columns: {
      imagem: {
        title: 'Foto',
        type: 'html',
        valuePrepareFunction: (imagem) => {
          return `<a href="${imagem}" target="_blank" rel="noopener"><img src="${imagem}" class="border-none" alt="Imagem do Evento"></a>`;
        },
        filter: false,
        sort: false
      },
      dataDoEvento: {
        title: 'Data',
        valuePrepareFunction: (date) => {
          return date ? DateUtils.format(date.toDate()) : '';
        }
      },
      link: {
        title: 'Link',
        type: 'html',
        valuePrepareFunction: (link: string) => {
          if (link.length > 45) {
            return `<a href="${link}" target="_blank" rel="noopener">${link.substring(0, 45)}...</a>`;
          }
          return `<a href="${link}" target="_blank" rel="noopener">${link}</a>`;
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
    private _eventoProvider: EventoProvider,
    public _page: PaginationProvider) {
    this.showpreloader = true;
    this._page.reset();
    this.getEventos();
  }

  public ngOnInit() {
  }

  private getEventos() {
    this._page.start(this._eventoProvider.collectionName, null).then(() => {
      this.showpreloader = false;
    });
  }
}
