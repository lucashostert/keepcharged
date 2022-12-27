import { Component, OnInit } from "@angular/core";
import { PaginationProvider } from "src/app/providers/pagination.provider";
import { ContatoProvider } from "src/app/providers/contato.provider";
import { ButtonsTableComponent } from "./componentes-table/buttons-table.component";

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.scss']
})
export class FaleConoscoComponent implements OnInit {

  public showpreloader;
  public datatable = {
    pager: {
      perPage: 30
    },
    columns: {
      nome: {
        title: 'Nome',
        type: 'html',
        valuePrepareFunction: (date) => {
          return date;
        }
      },
      email: {
        title: 'Email',
        type: 'html',
        valuePrepareFunction: (date) => {
          return date;
        }
      },
      telefone: {
        title: 'Telefone',
        type: 'html',
        valuePrepareFunction: (date) => {
          return date;
        }
      },
      // dataDoEvento: {
      //   title: 'Data',
      //   valuePrepareFunction: (date) => {
      //     return date ? DateUtils.format(date.toDate()) : '';
      //   }
      // },
      // link: {
      //   title: 'Link',
      //   type: 'html',
      //   valuePrepareFunction: (link: string) => {
      //     if (link.length > 45) {
      //       return `<a href="${link}" target="_blank" rel="noopener">${link.substring(0, 45)}...</a>`;
      //     }
      //     return `<a href="${link}" target="_blank" rel="noopener">${link}</a>`;
      //   }
      // },
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
    private _ContatoProvider: ContatoProvider,
    public _page: PaginationProvider) {
    this.showpreloader = true;
    this._page.reset();
    this.getEventos();
  }

  public ngOnInit() {
  }
  private getEventos() {
    this._page.start(this._ContatoProvider.collectionName, null).then(() => {
      this.showpreloader = false;
    });
  }

}
