import { Component, OnInit } from '@angular/core';
import { PaginationProvider } from 'src/app/providers/pagination.provider';
import { CustoCarregamentoProvider } from 'src/app/providers/custo-carregamento.provider';
import { ButtonsTableComponent } from './componentes-table/buttons-table.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-custo-carregamento',
  templateUrl: './custo-carregamento.component.html',
  styleUrls: ['./custo-carregamento.component.scss']
})
export class CustoCarregamentoComponent implements OnInit {

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
    private custoCarregamentoProvider: CustoCarregamentoProvider) {
    this._page.reset();
  }

  public ngOnInit() {
    this.getCustoCarregamentos();

    this.datatable.columns.button.onComponentInitFunction = (instance: any) => {
      instance.delete.subscribe(response => {
        this.desativar(response.row);
      });
    };
  }

  private async getCustoCarregamentos() {
    this.showpreloader = true;
    await this._page.start(this.custoCarregamentoProvider.collectionName);
    this._page.setData(this._page.getData().filter((d) => d.status));
    this.showpreloader = false;
  }

  private async desativar(custoCarregamento) {
    const willAtive = await swal({
      title: 'Você tem certeza?',
      text: 'Deseja APAGAR este custo de carregamento?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancelar', 'Apagar']
    });

    if (willAtive) {
      try {
        await this.custoCarregamentoProvider.update(custoCarregamento.id, { status: false });
        this._page.getData().splice(this._page.getData().findIndex(t => t.id === custoCarregamento.id), 1);
        this._page.setData(this._page.getData().slice());

        swal('', 'Custo de carregamento apagado com sucesso!', 'success');
      } catch (e) {
        console.log('Erro ao apagar Tipo de custo de carregamento: ', e);
        swal('Ops!', 'De algum modo, em algum lugar, alguma coisa deu errado.', 'error');
      }
    }
  }
}
