import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { UsuarioProvider } from '../../../providers/usuario.provider';
import { datatable } from './lista-representante.datatable.config';
import { CargoProvider } from 'src/app/providers/cargo.provider';

@Component({
  selector: 'app-lista-representante',
  templateUrl: './lista-representante.component.html',
  styleUrls: ['./lista-representante.component.scss']
})
export class ListaRepresentanteComponent implements OnInit {
  public showpreloader;
  public datasettings = null;
  public irepresentantes: any[] = [];
  private cargos: any[] = [];

  public constructor(
    private usuarioProvider: UsuarioProvider,
    private cargoProvider: CargoProvider) {
  }

  public async ngOnInit() {
    this.showpreloader = true;
    await this.getRepresentantes();
    await this.loadCargos();
    this.initDataTable();
    this.showpreloader = false;
  }

  private async getRepresentantes() {
    const users = await this.usuarioProvider.getAllWithRole();
    users.forEach((v) => {
      this.irepresentantes.push({
        id: v.id,
        ativo: v.ativo,
        nome: v.nomeCompleto,
        email: v.email,
        cargo: v.cargo,
        progressbar: {
          class: 'danger',
          value: 25
        },
        vendas: {
          value: 23.45,
          positive: false
        },
      });
    });
  }

  private async loadCargos() {
    const docs = await this.cargoProvider.getWhereOrderBy('status', '==', true, 'nivelAcesso');
    docs.forEach(v => {
      this.cargos.push({ id: v.id, ...v.data() });
    });
  }

  private initDataTable() {
    const cargos = this.cargos.map((cargo) => ({
      value: cargo.nome,
      title: cargo.nome
    }));

    datatable.columns.cargo.filter.config.list = cargos;
    datatable.columns.button.onComponentInitFunction = (instance: any) => {
      instance.save.subscribe(response => {
        if (response.action === 'ativar') {
          this.ativarUser(response.row);
        } else {
          this.desativarUser(response.row);
        }
      });
    };

    this.datasettings = datatable;
  }

  public async ativarUser(user) {
    const willAtive = await swal({
      title: 'Você tem certeza?',
      text: 'Você deseja ATIVAR este usuário?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancelar', 'Ativar']
    });

    if (willAtive) {
      try {
        await this.usuarioProvider.update(user.id, { ativo: true });
        user.ativo = true;
        this.irepresentantes = this.irepresentantes.slice();
        swal('', 'Usuário ativado com sucesso!', 'success');
      } catch (e) {
        console.log('Erro ao ativar representante: ', e);
        swal('Ops!', 'De algum modo, em algum lugar, alguma coisa deu errado.', 'error');
      }
    }
  }

  public async desativarUser(user) {
    const willAtive = await swal({
      title: 'Você tem certeza?',
      text: 'Você deseja DESATIVAR este usuário?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancelar', 'Desativar'],
    });

    if (willAtive) {
      try {
        await this.usuarioProvider.update(user.id, { ativo: false });
        user.ativo = false;
        this.irepresentantes = this.irepresentantes.slice();
        swal('', 'Usuário desativado com sucesso!', 'success');
      } catch (e) {
        console.log('Erro ao desativar representante: ', e);
        swal('Ops!', 'De algum modo, em algum lugar, alguma coisa deu errado.', 'error');
      }
    }
  }
}
