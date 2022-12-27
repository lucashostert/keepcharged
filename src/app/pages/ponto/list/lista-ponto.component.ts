import { Component, OnInit } from '@angular/core';
import { Ponto } from '../../../../models/Ponto';
import { PlanoProvider } from '../../../providers/plano.provider';
import { PaginationProvider } from '../../../providers/pagination.provider';
import { PontoProvider } from '../../../providers/ponto.provider';
import { datatable } from './lista-ponto.datatable.config';
import swal from 'sweetalert';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

@Component({
  selector: 'app-lista-ponto',
  templateUrl: './lista-ponto.component.html',
  styleUrls: ['./lista-ponto.component.scss']
})
export class ListaPontoComponent implements OnInit {
  showpreloader;
  datasettings;
  usuario;
  iTable = [];

  constructor(private planoProvider: PlanoProvider,
    private pontoProvider: PontoProvider,
    public _page: PaginationProvider) {
    this.showpreloader = true;
    this._page.reset();
    this.getPontos();
  }

  ngOnInit() {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  initDataTable() {
    this.datasettings = datatable;
    this.datasettings.columns.button.onComponentInitFunction = (instance: any) => {
      instance.save.subscribe(response => {
        if (response.action === 'ativar') {
          this.ativarPonto(response.row);
        } else {
          this.desativarPonto(response.row);
        }
      });
    };
  }

  getPontos() {
    this._page.start('ponto', (v) => ({
      id: v.id,
      categorias: v.categorias,
      nome: v.nome,
      cidade: v.endereco.cidade,
      plano: '',
      idPlano: v.idPlano,
      planoColor: '',
      status: v.status,
      statusNome: Ponto.getStatus(v.status),
      ativo: v.status > 0
    })).then(() => {
      const promises = [];
      this.iTable = this._page.getData();
      this._page.reset();
      this.iTable.forEach((item, i) => {
        if (item.idPlano != null) {
          promises.push(this.getPlanoData(i, item.idPlano));
        }
      });

      Promise.all(promises).then(() => {
        this.initDataTable();
        this.showpreloader = false;
      });
    });
  }

  getPlanoData(indice, idPlano) {
    return this.planoProvider.getById(idPlano).then((doc: any) => {
      if (doc !== null) {
        this.iTable[indice].plano = doc.nome;
        this.iTable[indice].planoColor = doc.color;
      }
    });
  }

  ativarPonto(ponto) {
    swal({
      title: 'Você tem certeza?',
      text: 'Você deseja ATIVAR este ponto?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancelar', 'Ativar'],
    }).then((willAtive) => {
      if (willAtive) {
        this.pontoProvider.update(ponto.id, { status: 1 })
          .then(() => {
            ponto.status = 1;
            ponto.statusNome = Ponto.getStatus(ponto.status);
            ponto.ativo = true;

            swal('Ponto ativado com sucesso!', {
              icon: 'success',
            });
          }).catch(() => {
            swal('Ops!', 'De algum modo, em algum lugar, alguma coisa deu errado.', 'error');
          });
      }
    });
  }

  desativarPonto(ponto) {
    swal({
      title: 'Você tem certeza?',
      text: 'Você deseja DESATIVAR este ponto?',
      icon: 'warning',
      dangerMode: true,
      buttons: ['Cancelar', 'Desativar'],
    }).then((willAtive) => {
      if (willAtive) {
        this.pontoProvider.update(ponto.id, { status: 0, vencimentoTesteData: null })
          .then(() => {
            ponto.status = 0;
            ponto.statusNome = Ponto.getStatus(ponto.status);
            ponto.ativo = false;

            swal('Ponto ativado com sucesso!', {
              icon: 'success',
            });
          }).catch(() => {
            swal('Ops!', 'De algum modo, em algum lugar, alguma coisa deu errado.', 'error');
          });
      }
    });
  }

  async exportToExcel() {
    this.showpreloader = true;
    await this._page.start('ponto');

    const pontos = [['Estabelecimento', 'Descricao', 'Cidade', 'Categorias', 'Plano', 'Status', 'Ativo',
      'Responsável', 'E-mail', 'Telefone', 'Site', 'Facebook', 'Instagram', 'WhatsApp', 'Receber contato', 'Banheiro',
      'Sacs data', 'Sacs username', 'Sacs']];

    const planoscache = [];
    for (const ponto of this._page.getData()) {
      const planocache = planoscache.find(p => p.id === ponto.idPlano);
      if (planocache === undefined) {
        if (ponto.idPlano) {
          const docPlano: any = await this.planoProvider.getById(ponto.idPlano);
          if (docPlano !== null) {
            ponto.plano = docPlano.nome;
            planoscache.push(docPlano);
          }
        }
      } else {
        ponto.plano = planocache.nome;
      }


      let lastObservation: any = {};
      if (Array.isArray(ponto.adminObservation)) {
        ponto.adminObservation
          .sort((a, b) => +(a.date.toDate() > b.date.toDate()) || +(a.date.toDate() === b.date.toDate()) - 1);
        lastObservation = ponto.adminObservation[ponto.adminObservation.length - 1];
      }

      const pontoArray = [
        ponto.nome,
        ponto.descricao,
        ponto.endereco.cidade,
        ponto.categorias.map(c => c.nome).join(', '),
        ponto.plano,
        Ponto.getStatus(ponto.status),
        ponto.ativo ? 'Sim' : 'Não',
        ponto.nomeResponsavel,
        ponto.email,
        ponto.telefoneRepresentante,
        ponto.site,
        ponto.facebook,
        ponto.instagram,
        ponto.whatsApp,
        ponto.tipoContato === 'whatsapp'
          ? 'WhatsApp' : ponto.tipoContato === 'telefone'
            ? 'Telefone' : ponto.tipoContato === 'email'
              ? 'E-mail' : '',
        ponto.banheiro ? 'Sim' : 'Não',
        lastObservation.date ? format(lastObservation.date.toDate(), 'dd/MM/yyyy HH:mm') : '',
        lastObservation.userName || '',
        lastObservation.observation || ''
      ];

      pontos.push(pontoArray);
    }
    this._page.reset();

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(pontos);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'Estabelecimentos.xlsx');
    this.showpreloader = false;
  }
}
