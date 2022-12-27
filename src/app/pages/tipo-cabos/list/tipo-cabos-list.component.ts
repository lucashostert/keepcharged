import { Component, OnInit } from '@angular/core';
import { TipoCaboProvider } from 'src/app/providers/tipo-cabo.provider';
import { PaginationProvider } from 'src/app/providers/pagination.provider';
import { ButtonsTableComponent } from './componentes-table/buttons-table.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-tipo-cabos-list',
  templateUrl: './tipo-cabos-list.component.html',
  styleUrls: ['./tipo-cabos-list.component.scss']
})
export class TipoCabosListComponent implements OnInit {
  public showpreloader = false;
  public datatable: any = {
    pager: {
      perPage: 30
    },
    columns: {
      nome: {
        title: 'Nome'
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
    private tipoCaboProvider: TipoCaboProvider) {
    this._page.reset();
  }

  public ngOnInit() {
    this.getTipoCabos();

    this.datatable.columns.button.onComponentInitFunction = (instance: any) => {
      instance.delete.subscribe(response => {
        this.desativar(response.row);
      });
    };
  }

  private async getTipoCabos() {
    this.showpreloader = true;
    await this._page.start(this.tipoCaboProvider.collectionName);
    this._page.setData(this._page.getData().filter((d) => d.status));
    this.showpreloader = false;
  }

  private async desativar(tipoCabo) {
    const willAtive = await swal({
      title: 'Você tem certeza?',
      text: 'Deseja APAGAR este tipo de cabo?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancelar', 'Apagar']
    });

    if (willAtive) {
      try {
        await this.tipoCaboProvider.update(tipoCabo.id, { status: false });
        this._page.getData().splice(this._page.getData().findIndex(t => t.id === tipoCabo.id), 1);
        this._page.setData(this._page.getData().slice());

        swal('', 'Cabo apagado com sucesso!', 'success');
      } catch (e) {
        console.log('Erro ao apagar Tipo de Cabo: ', e);
        swal('Ops!', 'De algum modo, em algum lugar, alguma coisa deu errado.', 'error');
      }
    }
  }
}
