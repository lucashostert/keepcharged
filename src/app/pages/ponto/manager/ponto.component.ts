import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Ponto, AdminObservation } from '../../../../models/Ponto';
import { FireStorageProvider } from '../../../providers/fire-storage.provider';
import { CategoriaProvider } from '../../../providers/categoria.provider';
import { PlanoProvider } from '../../../providers/plano.provider';
import { UsuarioProvider } from '../../../providers/usuario.provider';
import { PontoProvider } from '../../../providers/ponto.provider';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CropmodalComponent } from '../../../cropmodal/cropmodal.component';
import { of } from 'rxjs';
import swal from 'sweetalert';
import { comoDescobriuProvider } from 'src/app/providers/comoDescobriu.provider';
import { DateUtils } from 'src/app/utils/DateUtils';
import { TipoCaboProvider } from 'src/app/providers/tipo-cabo.provider';
import { TipoCabo } from 'src/models/TipoCabo';
import { CustoCarregamento } from 'src/models/CustoCarregamento';
import { CustoCarregamentoProvider } from 'src/app/providers/custo-carregamento.provider';

@Component({
  selector: 'app-ponto',
  templateUrl: './ponto.component.html',
  styleUrls: ['./ponto.component.scss']
})
export class PontoComponent implements OnInit {
  icategorias$1;
  iplanos = [];
  iusers = [];
  idescobriu = [];
  ihorarios = ['Fechado',
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
  ];

  form: FormGroup;
  submitted = false;
  submittedcep = false;
  cepconsultado = '';
  numeroconsultado = '';
  inValidValidadeTestData = false;

  imagenspreview;
  localImages: any = [{}, {}, {}, {}, {}, {}];
  imageplaceholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAABGdBTUEAALGPC/xhBQAAAM9QTFRFzdLVvcLFwMTHxMjL0tbZzNDTztPWv8TH5Ons1NncyMzPwsbJ29/i1dncwcXIz9TWyc3QzNHU2+Dj19veys7RztLVxsvO2d7g1drd0NTX1tveyc7R19zfy9DT2Nzf4ebpz9TX4+jrw8jLyM3Qx8vO1Njb2t/ix8zPzdHU2t7h0dbZ4OXo09fau7/Cy8/SvsLF5+zv3uPm5ertvMDD4+fqv8PG0NXY6O3w2d7h3+TnvcHE09jb5uvuw8fKwsfK4ufpxcrN2N3g1trdur7B6e7xW2uF7AAAA8FJREFUeNrt3WlT01AYBlDc931fAQVEQJYiJl1EIP3/v0m0VbskbcokcZJ7nq+ZyZ33zLS9e5f6kjtLCGDBggULFiwEsGDBggULFgJYsGDBggULASxYsGDBgoUAFixYsGDBQgALFixYsGAhgAULFixYsBDAggULFixYCGDBggULFiwEsGDBggULFgJYsGDBggULASxYsGDBgoUAFixYsGDBQgALFixYsGAhgAULFixYsBDAggULFixYCGDBggULFiwEsGDBgjWZg0f3vySlpXOy3moM1s3bSdnpvI6agbV8lFSQzagJWK0bSSW52gSsa0lF2a4/1mpVVsnT+mPtVIb1Zb/2WB8HlVzaWP5RUrY3h1oHtcf6MChkvcQmouHP7YvaYx0PCjkts43vFbQBCxYsWLDyYLXeLn38tLvTjmDNw1rd/TNfc2cD1mys94cj3e43PVgzsLrjg5QPPViZWJ8nh3RrEawMrFZnagB8BisD69X0bMHePqxUrGgvZW4lhpWKdZA2EfUOVirWyzSs47kvudUOEWsrDWtv3ju6SacNKx/Wr57ZTC0fw4le7CwtX/CTPf4ZWroOU6OjbC2d0umRZKZWQMOd1zmtsrXCGUh/ivJaZWqZokmxytIy+ZdmlaEVxrTy8UZ/Mat0raYvWDybu2DRzdrk1w4MK0e62Vsi27DyWqVoBY7Vnb3dtg0rr9WUVtBY3bm7/Ma1Qsbq5tgTOaYVDNb+hazGtULBii9/vZBVkhwehIYVJ8nR1wtZjWqFgRX/ejSmld9qRCsIrHjwbERrEatzrf1wsOI/Rf/VWswqSXrBYMX/ih5qLWoVDlY8WvVvrYWtgsGKx8s+17rAKZ9AsOLJuo9WEljpWHExB8GCwCrIKgisoqxCwCrMKgCs4qyaj1WgVeOxirRqOlahVg3HepzAyo31DRYsWLBgwYIFCxYsWDXCap8VmoAWWQsLLFiwYMH6D1hXBoWslNhEb3gs73PtsXaHXaLrZ2Xl3veKrsAtH+tJZZe6dqLaY/UOq8J60K89VmX3BXdaDcCKnleDdbffAKx+b62KW6hP+43A6kfrnbKtTrb7DcE6P3Nyurl2UloebrUrqcJfycCCBQsWLIEFCxYsWLAEFixYsGDBEliwYMGCBUtgwYIFCxYsgQULFixYsAQWLFiwYMESWLBgwYIFS2DBggULFiyBBQsWLFiwBBYsWLBgwRJYsGDBggVLYMGCBQsWLIEFCxYsWLAEFixYsGDBEliwYMGCBUtgwYIFCxYsgQULFixYDc1PDWw0OlbmweEAAAAASUVORK5CYII=";
  validHorarios;

  showpreloader = true;
  showdatetest = false;
  adminObservation = "";
  ponto: Ponto = null;
  pontouid: string = null;
  usuario: any;
  tiposDeCabos: TipoCabo[] = [];
  custoCarregamentos: CustoCarregamento[] = [];

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private categoriaProvider: CategoriaProvider,
    private _comoDescobriu: comoDescobriuProvider,
    private planoProvider: PlanoProvider,
    private pontoProvider: PontoProvider,
    private usuarioProvider: UsuarioProvider,
    private fireStorage: FireStorageProvider,
    private modalService: NgbModal,
    private tipoCaboProvider: TipoCaboProvider,
    private custoCarregamentoProvider: CustoCarregamentoProvider) {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.initiatesVariables();
    this.getGategorias();
    this.getUsers();
    this.getDescobriu();
    this.initValidHorarios();
    this.formInit();
    this.getPlanos();
  }

  public save() {
    if (!this.adminObservation)
      swal('Ops!', 'Verifique os campos!', 'error');
    else {
      let item = new AdminObservation();
      item.observation = this.adminObservation;
      item.userId = JSON.parse(localStorage.getItem('usuario')).id;
      item.userName = JSON.parse(localStorage.getItem('usuario')).nomeCompleto;
      if (!this.ponto.adminObservation)
        this.ponto.adminObservation = [];
      item = JSON.parse(JSON.stringify(item));
      item.date = new Date();
      this.ponto.adminObservation.push(item);
      this.showpreloader = true;
      this.adminObservation = "";
      this.pontoProvider.update(this.pontouid, { adminObservation: this.ponto.adminObservation }).then(() => {
        this.showpreloader = false;
        swal('Exito', 'Ponto editado com sucesso!', 'success').then(() => {
          // this.router.navigate(['/estabelecimentos']);
        });
      }).catch(res => {
        this.showpreloader = false;
        swal('Ops!', 'Error!', 'error');
      });
    }
  }

  public formatMoment(date) {
    return DateUtils.dateToDateInput(date.toDate ? date.toDate() : date);
  }

  private initiatesVariables() {
    this.imagenspreview = {
      logo: JSON.parse(this.setIconDefalt('')),
      capa: JSON.parse(this.setIconDefalt('')),
      insta: JSON.parse(this.setIconDefalt('')),
      pinonline: JSON.parse(this.setIconDefalt('on')),
      pinoffline: JSON.parse(this.setIconDefalt('off')),
      pinprivado: JSON.parse(this.setIconDefalt('privado'))
    };
    this.imagenspreview.loader = false;
    this.imagenspreview.error = false;
  }

  mascaraTelefone(campo) {
    if (!campo) {
      return;
    }
    function trata(valor, isOnBlur) {
      valor = valor.replace(/\D/g, '');
      valor = valor.replace(/^(\d{2})(\d)/g, "($1)$2");
      if (isOnBlur) {
        valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
      } else {
        valor = valor.replace(/(\d)(\d{3})$/, "$1-$2");
      }
      return valor;
    }

    campo.onkeypress = function (evt) {
      var code = (window.event) ? window.event['keyCode'] : evt.which;
      var valor = this.value;
      if (code > 57 || (code < 48 && code != 8)) {
        return false;
      } else {
        this.value = trata(valor, false);
      }
    };

    campo.onblur = function () {
      if (this.value.length < 13) {
        this.value = '';
      } else {
        this.value = trata(this.value, true);
      }
    };

    campo.maxLength = 14;
  }

  maiuscula(campo) {
    if (!campo) return;
    function trata(valor: string, isOnBlur) {
      return valor.toLocaleUpperCase();
    }

    campo.onkeyup = function (evt) {
      this.value = trata(this.value, false);
    };

    campo.onblur = function () {
      this.value = trata(this.value, true);
    };
  }

  public ngOnInit(): void {
    this.getCustoCarregamentos().then(() => {
      this.getTipoCabos().then(() => {
        if (this.route.snapshot.paramMap.get('id')) {
          this.getPonto(this.route.snapshot.paramMap.get('id'))
            .then(bool => {
              if (bool) {
                this.formInit(true);
                this.showpreloader = false;
              } else {
                this.router.navigate(['/estabelecimentos']);
              }
            });
        } else {
          this.showpreloader = false;
          this.formInit();
        }
      }).then(() => {
        setTimeout(() => {
          this.mascaraTelefone(document.getElementById('pontotelefone'));
          this.mascaraTelefone(document.getElementById('pontotelefoneRepresentante'));
          this.mascaraTelefone(document.getElementById('pontowhatsApp'));
          this.maiuscula(document.getElementById('pontonomeResponsavel'));
          this.maiuscula(document.getElementById('pontonome'));
        }, 3500);
      });
    });
  }

  private getPonto(uid) {
    return this.pontoProvider.getById(uid)
      .then((doc: any) => {
        if (doc != null) {
          doc.tiposDeCabos = doc.tiposDeCabos.map(tc => this.tiposDeCabos.find(t => t.id === tc)).filter(a => a !== undefined);
          if (doc.custoCarregamentoCliente) {
            doc.custoCarregamentoCliente = doc.custoCarregamentoCliente.map(tc => this.custoCarregamentos.find(t => t.id === tc)).filter(a => a !== undefined);
          }
          if (doc.cep && (!doc.endereco || !doc.endereco.cep)) {
            doc.endereco.cep = doc.cep;
          }

          if (doc.numero && (!doc.endereco || !doc.endereco.numero)) {
            doc.endereco.numero = doc.numero;
          }

          this.ponto = new Ponto().constructorByLiteral(doc);
          this.pontouid = uid;
          this.imagenspreview.logo.show = true;
          this.imagenspreview.logo.src = this.ponto.imagemLogo;
          this.imagenspreview.capa.show = true;
          this.imagenspreview.capa.src = this.ponto.imagemCapa;
          this.imagenspreview.insta.show = true;
          this.imagenspreview.insta.src = this.ponto.imagemInsta;
          this.imagenspreview.pinonline.show = true;
          this.imagenspreview.pinonline.src = this.ponto.imagemPinOnline;
          this.imagenspreview.pinoffline.show = true;
          this.imagenspreview.pinoffline.src = this.ponto.imagemPinOffline;
          this.imagenspreview.pinprivado.show = true;
          this.imagenspreview.pinprivado.src = this.ponto.imagemPinPrivado;

          for (let i = 0; i < this.ponto.localImages.length; i++) {
            if (this.ponto.localImages[i]) {
              this.localImages[i] = { url: this.ponto.localImages[i], src: this.ponto.localImages[i] }
            }
          }
          return true;
        }

        return false;
      });
  }

  private async getTipoCabos() {
    this.tiposDeCabos = await this.tipoCaboProvider.getActives();
  }

  private async getCustoCarregamentos() {
    this.custoCarregamentos = await this.custoCarregamentoProvider.getActives();
  }

  private formInit(editing = false) {
    let vencimentoTesteData = '';
    if (editing && this.ponto.status === 2) {
      const month = this.ponto.vencimentoTesteData.getMonth() < 10 ?
        '0' + (this.ponto.vencimentoTesteData.getMonth() + 1) : String(this.ponto.vencimentoTesteData.getMonth() + 1);
      const date = this.ponto.vencimentoTesteData.getDate() < 10 ?
        '0' + this.ponto.vencimentoTesteData.getDate() : String(this.ponto.vencimentoTesteData.getDate());
      vencimentoTesteData = this.ponto.vencimentoTesteData.getFullYear() + '-' + month + '-' + date;
    }

    const tiposDeCabos = {};
    for (const cabo of this.tiposDeCabos) {
      let value = false;
      if (editing) {
        value = this.ponto.tiposDeCabos.find(tc => tc.id === cabo.id) !== undefined;
      }
      tiposDeCabos['cabo' + cabo.id] = [value];
    }

    this.form = this.formBuilder.group({
      ...tiposDeCabos,
      status: [editing ? this.ponto.status : '1', Validators.required],
      tipoContato: [editing ? this.ponto.tipoContato : '', Validators.required],
      vencimentoTesteData: [vencimentoTesteData],
      nome: [editing ? this.ponto.nome : '', Validators.required],
      email: [editing ? this.ponto.email : ''],
      fraseEfeito: [editing ? this.ponto.fraseEfeito : '', Validators.required],
      categoria: [editing ? this.ponto.categorias : '', Validators.required],
      nomeResponsavel: [editing ? this.ponto.nomeResponsavel : '', Validators.required],
      representante: [editing ? this.ponto.idRepresentante : ''],
      descobriu: [editing ? this.ponto.idComoDescobriu : ''],
      wifi: [editing ? String(this.ponto.wifi) : '', Validators.required],
      banheiro: [editing ? String(this.ponto.banheiro) : '', Validators.required],
      plano: [editing ? this.ponto.idPlano : '', Validators.required],
      privado: [editing ? String(this.ponto.privado) : '', Validators.required],
      cep: [editing ? this.ponto.endereco.cep : '', [Validators.required, Validators.minLength(8)]],
      telefoneRepresentante: [editing ? this.ponto.telefoneRepresentante : '', [Validators.required, Validators.minLength(13)]],
      logradouro: [editing ? this.ponto.endereco.logradouro : '', Validators.required],
      numero: [editing ? this.ponto.endereco.numero : '', Validators.required],
      bairro: [editing ? this.ponto.endereco.bairro : '', Validators.required],
      cidade: [editing ? this.ponto.endereco.cidade : '', Validators.required],
      estado: [editing ? this.ponto.endereco.estado : '', Validators.required],
      latitude: [editing ? this.ponto.endereco.point.lat : '', Validators.required],
      longitude: [editing ? this.ponto.endereco.point.lon : '', Validators.required],
      custoCarregamentoCliente: [editing ? this.ponto.custoCarregamentoCliente : '', Validators.required],
      // custoCarregamentoNaoCliente: [editing ? this.ponto.custoCarregamentoNaoCliente : '', Validators.required],
      facebook: [editing ? this.ponto.facebook : ''],
      instagram: [editing ? (this.ponto.instagram == null ? '' : this.ponto.instagram) : ''],
      site: [editing ? this.ponto.site : ''],
      whatsApp: [editing ? this.ponto.whatsApp : ''],
      telefone: [editing ? this.ponto.telefone : ''],
      descricao: [editing ? this.ponto.descricao : '', Validators.required],

      hsegunda101: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.segunda.turno1, true) : ''],
      hsegunda102: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.segunda.turno1, false) : ''],
      hsegunda201: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.segunda.turno2, true) : ''],
      hsegunda202: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.segunda.turno2, false) : ''],

      hterca0101: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.terca.turno1, true) : ''],
      hterca0102: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.terca.turno1, false) : ''],
      hterca0201: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.terca.turno2, true) : ''],
      hterca0202: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.terca.turno2, false) : ''],

      hquarta0101: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.quarta.turno1, true) : ''],
      hquarta0102: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.quarta.turno1, false) : ''],
      hquarta0201: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.quarta.turno2, true) : ''],
      hquarta0202: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.quarta.turno2, false) : ''],

      hquinta0101: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.quinta.turno1, true) : ''],
      hquinta0102: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.quinta.turno1, false) : ''],
      hquinta0201: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.quinta.turno2, true) : ''],
      hquinta0202: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.quinta.turno2, false) : ''],

      hsexta0101: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.sexta.turno1, true) : ''],
      hsexta0102: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.sexta.turno1, false) : ''],
      hsexta0201: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.sexta.turno2, true) : ''],
      hsexta0202: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.sexta.turno2, false) : ''],

      hsabado0101: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.sabado.turno1, true) : ''],
      hsabado0102: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.sabado.turno1, false) : ''],
      hsabado0201: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.sabado.turno2, true) : ''],
      hsabado0202: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.sabado.turno2, false) : ''],

      hdomingo0101: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.domingo.turno1, true) : ''],
      hdomingo0102: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.domingo.turno1, false) : ''],
      hdomingo0201: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.domingo.turno2, true) : ''],
      hdomingo0202: [editing ? this.getHorarioIndex(this.ponto.horarioAtendimento.domingo.turno2, false) : ''],

      upcapa: editing ? [''] : ['', Validators.required],
      uplogomarca: editing ? [''] : ['', Validators.required],
      imgpinonline: [''],
      imgpinoffline: [''],
      imgpinprivado: [''],
      localImages: [],
      codigoPromocional: [editing ? this.ponto.promoCode : '']
    });

    if (editing) {
      setTimeout(() => {
        this.f.numero.enable();
        this.f.latitude.enable();
        this.f.longitude.enable();
      }, 1500);

      if (this.ponto.status == 2) {
        this.showdatetest = true;
        this.inValidValidadeTestData = false;
      }

      if (this.ponto.endereco.cidade === undefined || !this.ponto.endereco.estado === undefined) {
        this.consultaCep();
        this.consultaGeo();
      }
    } else {
      this.f.numero.disable();
      this.f.latitude.disable();
      this.f.longitude.disable();
      if (this.usuario.cargo !== 'Admin') {
        this.f.status.setValue('4');
      }
    }

    this.f.logradouro.disable();
    this.f.bairro.disable();
    this.f.cidade.disable();
    this.f.estado.disable();
  }

  public onSubmit() {
    this.submitted = true;
    this.showpreloader = true;

    this.initValidHorarios();

    let isHValid = this.validHorarioInput(this.f.hsegunda101.value, this.f.hsegunda102.value, 'segunda', 'pri');

    if (!this.validHorarioInput(this.f.hsegunda201.value, this.f.hsegunda202.value, 'segunda', 'seg') ||
      !this.validHorarioInput(this.f.hterca0101.value, this.f.hterca0102.value, 'terca', 'pri') ||
      !this.validHorarioInput(this.f.hterca0201.value, this.f.hterca0202.value, 'terca', 'seg') ||
      !this.validHorarioInput(this.f.hquarta0101.value, this.f.hquarta0102.value, 'quarta', 'pri') ||
      !this.validHorarioInput(this.f.hquarta0201.value, this.f.hquarta0202.value, 'quarta', 'seg') ||
      !this.validHorarioInput(this.f.hquinta0101.value, this.f.hquinta0102.value, 'quinta', 'pri') ||
      !this.validHorarioInput(this.f.hquinta0201.value, this.f.hquinta0202.value, 'quinta', 'seg') ||
      !this.validHorarioInput(this.f.hsexta0101.value, this.f.hsexta0102.value, 'sexta', 'pri') ||
      !this.validHorarioInput(this.f.hsexta0201.value, this.f.hsexta0202.value, 'sexta', 'seg') ||
      !this.validHorarioInput(this.f.hsabado0101.value, this.f.hsabado0102.value, 'sabado', 'pri') ||
      !this.validHorarioInput(this.f.hsabado0201.value, this.f.hsabado0202.value, 'sabado', 'seg') ||
      !this.validHorarioInput(this.f.hdomingo0101.value, this.f.hdomingo0102.value, 'domingo', 'pri') ||
      !this.validHorarioInput(this.f.hdomingo0201.value, this.f.hdomingo0202.value, 'domingo', 'seg')) {
      isHValid = false;
    }

    if (this.form.invalid || !isHValid || this.inValidValidadeTestData || this.isInvalidTipoCabos()) {
      swal('Ops!', 'Verifique os campos!', 'error');
      this.showpreloader = false;
      return;
    }

    let vencimentoTesteData = null;
    if (this.showdatetest && !this.inValidValidadeTestData) {
      const dateSplit = this.f.vencimentoTesteData.value.split('-');
      vencimentoTesteData = new Date(dateSplit[0], parseInt(dateSplit[1], 10) - 1, parseInt(dateSplit[2], 10));
    }

    const obj = JSON.stringify({
      turno1: null,
      turno2: null
    });
    const custoCarrega = [];
    this.f.custoCarregamentoCliente.value.forEach(element => {
      custoCarrega.push(element.id);
    });
    const dados: any = {
      endereco: {
        cep: this.f.cep.value,
        logradouro: this.f.logradouro.value,
        numero: this.f.numero.value,
        bairro: this.f.bairro.value,
        cidade: this.f.cidade.value,
        estado: this.f.estado.value,
        point: {
          lat: Number(this.f.latitude.value),
          lon: Number(this.f.longitude.value)
        }
      },
      nome: this.f.nome.value,
      email: this.f.email.value,
      fraseEfeito: this.f.fraseEfeito.value,
      tipoContato: this.f.tipoContato.value,
      idRepresentante: this.f.representante.value ? this.f.representante.value : null,
      idComoDescobriu: this.f.descobriu.value ? this.f.descobriu.value : null,
      nomeResponsavel: this.f.nomeResponsavel.value,
      wifi: this.f.wifi.value === 'true',
      banheiro: this.f.banheiro.value === 'true',
      privado: this.f.privado.value === 'true',
      idPlano: this.f.plano.value,
      custoCarregamentoCliente: custoCarrega,
      // custoCarregamentoNaoCliente: this.f.custoCarregamentoNaoCliente.value,
      facebook: this.f.facebook.value ? this.f.facebook.value : null,
      instagram: this.f.instagram.value ? this.f.instagram.value.replace('@', '')
        .replace('https://www.instagram.com/', '').replace('https://instagram.com/', '').replace('/', '') : null,
      site: this.f.site.value ? this.f.site.value : null,
      whatsApp: this.f.whatsApp.value ? this.f.whatsApp.value : null,
      telefone: this.f.telefone.value ? this.f.telefone.value : null,
      telefoneRepresentante: this.f.telefoneRepresentante.value ? this.f.telefoneRepresentante.value : null,
      descricao: this.f.descricao.value,
      horarioAtendimento: {
        segunda: JSON.parse(obj),
        terca: JSON.parse(obj),
        quarta: JSON.parse(obj),
        quinta: JSON.parse(obj),
        sexta: JSON.parse(obj),
        sabado: JSON.parse(obj),
        domingo: JSON.parse(obj)
      },
      vencimentoTesteData: vencimentoTesteData,
      imagemCapa: this.ponto != null ? this.ponto.imagemCapa : null,
      imagemLogo: this.ponto != null ? this.ponto.imagemLogo : null,
      imagemInsta: this.ponto != null ? this.ponto.imagemInsta : null,
      imagemPinOnline: this.ponto != null && this.ponto.imagemPinOnline ? this.ponto.imagemPinOnline : null,
      imagemPinOffline: this.ponto != null && this.ponto.imagemPinOffline ? this.ponto.imagemPinOffline : null,
      imagemPinPrivado: this.ponto != null && this.ponto.imagemPinPrivado ? this.ponto.imagemPinPrivado : null,
      status: parseInt(this.f.status.value, 10),
      tiposDeCabos: [],
      promoCode: this.f.codigoPromocional.value,
      localImages: [null, null, null, null, null, null]
    };

    if (this.ponto != null) {
      dados.localImages = this.ponto.localImages;
    }

    for (const cabo of this.tiposDeCabos) {
      if (this.f['cabo' + cabo.id].value) {
        dados.tiposDeCabos.push(cabo.id);
      }
    }

    dados.categorias = [];
    this.f.categoria.value.forEach(v => {
      dados.categorias.push({ uid: v.uid, nome: v.nome });
    });

    this.setHorarios(dados, this.f.hsegunda101.value, this.f.hsegunda102.value, 'segunda', 'turno1');
    this.setHorarios(dados, this.f.hsegunda201.value, this.f.hsegunda202.value, 'segunda', 'turno2');
    this.setHorarios(dados, this.f.hterca0101.value, this.f.hterca0102.value, 'terca', 'turno1');
    this.setHorarios(dados, this.f.hterca0201.value, this.f.hterca0202.value, 'terca', 'turno2');
    this.setHorarios(dados, this.f.hquarta0101.value, this.f.hquarta0102.value, 'quarta', 'turno1');
    this.setHorarios(dados, this.f.hquarta0201.value, this.f.hquarta0202.value, 'quarta', 'turno2');
    this.setHorarios(dados, this.f.hquinta0101.value, this.f.hquinta0102.value, 'quinta', 'turno1');
    this.setHorarios(dados, this.f.hquinta0201.value, this.f.hquinta0202.value, 'quinta', 'turno2');
    this.setHorarios(dados, this.f.hsexta0101.value, this.f.hsexta0102.value, 'sexta', 'turno1');
    this.setHorarios(dados, this.f.hsexta0201.value, this.f.hsexta0202.value, 'sexta', 'turno2');
    this.setHorarios(dados, this.f.hsabado0101.value, this.f.hsabado0102.value, 'sabado', 'turno1');
    this.setHorarios(dados, this.f.hsabado0201.value, this.f.hsabado0202.value, 'sabado', 'turno2');
    this.setHorarios(dados, this.f.hdomingo0101.value, this.f.hdomingo0102.value, 'domingo', 'turno1');
    this.setHorarios(dados, this.f.hdomingo0201.value, this.f.hdomingo0202.value, 'domingo', 'turno2');

    const uploadPromises = [];
    if (this.ponto == null) {
      if (this.imagenspreview.capa.updated) {
        uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.capa.src, this.imagenspreview.capa.filetype, 'ponto').then((urlCapa) => {
          dados.imagemCapa = urlCapa;
        }));
      }

      if (this.imagenspreview.logo.updated) {
        uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.logo.src, this.imagenspreview.logo.filetype, 'ponto').then((urlPonto) => {
          dados.imagemLogo = urlPonto;
        }));
      }

      if (this.imagenspreview.insta.updated) {
        uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.insta.src, this.imagenspreview.insta.filetype, 'ponto').then((urlInsta) => {
          dados.imagemInsta = urlInsta;
        }));
      }

      if (this.imagenspreview.pinonline.updated) {
        uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.pinonline.src, this.imagenspreview.pinonline.filetype, 'ponto').then((urlPinOnline) => {
          dados.imagemPinOnline = urlPinOnline;
        }));
      }

      if (this.imagenspreview.pinoffline.updated) {
        uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.pinoffline.src, this.imagenspreview.pinoffline.filetype, 'ponto').then((urlPinOffline) => {
          dados.imagemPinOffline = urlPinOffline;
        }));
      }

      if (this.imagenspreview.pinprivado.updated) {
        uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.pinprivado.src, this.imagenspreview.pinprivado.filetype, 'ponto').then((urlPinPrivado) => {
          dados.imagemPinPrivado = urlPinPrivado;
        }));
      }

      for (let i = 0; i < this.localImages.length; i++) {
        if (this.localImages[i].updated) {
          uploadPromises.push(this.fireStorage.uploadImageData(this.localImages[i].src, this.localImages[i].filetype, 'ponto').then((urlimg) => {
            dados.localImages[i] = urlimg;
          }));
        }
      }
    } else {
      if (!dados.imagemCapa && this.imagenspreview.capa.updated) {
        uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.capa.src, this.imagenspreview.capa.filetype, 'ponto').then((urlCapa) => {
          dados.imagemCapa = urlCapa;
        }));
      } else if (this.imagenspreview.capa.updated) {
        this.fireStorage.updateImageDataFromURL(dados.imagemCapa, this.imagenspreview.capa.src);
      }

      if (!dados.imagemLogo && this.imagenspreview.logo.updated) {
        uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.logo.src, this.imagenspreview.logo.filetype, 'ponto').then((urlPonto) => {
          dados.imagemLogo = urlPonto;
        }));
      } else if (this.imagenspreview.logo.updated) {
        this.fireStorage.updateImageDataFromURL(dados.imagemLogo, this.imagenspreview.logo.src);
      }

      if (this.imagenspreview.insta.updated) {
        if (dados.imagemInsta != null) {
          this.fireStorage.updateImageDataFromURL(dados.imagemInsta, this.imagenspreview.insta.src);
        } else {
          uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.insta.src, this.imagenspreview.insta.filetype, 'ponto').then((urlInsta) => {
            dados.imagemInsta = urlInsta;
          }));
        }
      }

      if (!dados.imagemPinOnline && this.imagenspreview.pinonline.updated) {
        uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.pinonline.src, this.imagenspreview.pinonline.filetype, 'ponto').then((urlPinOnline) => {
          dados.imagemPinOnline = urlPinOnline;
        }));
      } else if (this.imagenspreview.pinonline.updated) {
        this.fireStorage.updateImageDataFromURL(dados.imagemPinOnline, this.imagenspreview.pinonline.src);
      }

      if (!dados.imagemPinOffline && this.imagenspreview.pinoffline.updated) {
        uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.pinoffline.src, this.imagenspreview.pinoffline.filetype, 'ponto').then((urlPinOffline) => {
          dados.imagemPinOffline = urlPinOffline;
        }));
      } else if (this.imagenspreview.pinoffline.updated) {
        this.fireStorage.updateImageDataFromURL(dados.imagemPinOffline, this.imagenspreview.pinoffline.src);
      }

      if (!dados.imagemPinPrivado && this.imagenspreview.pinprivado.updated) {
        uploadPromises.push(this.fireStorage.uploadImageData(this.imagenspreview.pinprivado.src, this.imagenspreview.pinprivado.filetype, 'ponto').then((urlPinPrivado) => {
          dados.imagemPinPrivado = urlPinPrivado;
        }));
      } else if (this.imagenspreview.pinprivado.updated) {
        this.fireStorage.updateImageDataFromURL(dados.imagemPinPrivado, this.imagenspreview.pinprivado.src);
      }

      for (let i = 0; i < this.localImages.length; i++) {
        if (this.localImages[i].updated) {
          if (!dados.localImages[i]) {
            uploadPromises.push(this.fireStorage.uploadImageData(this.localImages[i].src, this.localImages[i].filetype, 'ponto').then((urlimg: any) => {
              dados.localImages[i] = urlimg;
            }));
          } else {
            this.fireStorage.updateImageDataFromURL(dados.localImages[i], this.localImages[i].src);
          }
        } else if (!this.localImages[i].src && dados.localImages[i]) {
          this.fireStorage.deleteImageFromURL(dados.localImages[i]);
          dados.localImages[i] = null;
        }
      }
    }

    Promise.all(uploadPromises).then(() => {
      if (this.ponto == null) {
        return this.pontoProvider.add(dados).then(() => {
          swal('Exito', 'Ponto cadastrado com sucesso!', 'success').then(() => {
            this.router.navigate(['/estabelecimentos']);
          });
        });
      }
      return this.pontoProvider.update(this.pontouid, dados).then(() => {
        swal('Exito', 'Ponto editado com sucesso!', 'success').then(() => {
          this.router.navigate(['/estabelecimentos']);
        });
      });
    }).catch((err) => {
      console.log(err);
      swal('Ops!', 'De algum modo, em algum lugar, alguma coisa deu errado.', 'error');
      this.showpreloader = false;
    });
  }

  private getGategorias() {
    this.categoriaProvider.getWhere('status', '==', true)
      .then((docs) => {
        const aux = [];
        docs.forEach(v => {
          const cat = v.data();
          cat.uid = v.id;
          aux.push(cat);
        });

        this.icategorias$1 = of(aux);
      });
  }

  private getPlanos() {
    this.planoProvider.getWhere('status', '==', true)
      .then((docs) => {
        docs.forEach(v => {
          this.iplanos.push({ uid: v.id, ...v.data() });
        });

        setTimeout(() => {
          this.f.plano.setValue(this.iplanos[0].uid);
        }, 1500);
      });
  }

  private getDescobriu() {
    this._comoDescobriu.getWhere('status', '==', true)
      .then((docs) => {
        docs.forEach(v => {
          this.idescobriu.push({ id: v.id, nome: v.data().nome });
        });
      });
  }

  private getUsers() {
    this.usuarioProvider.getWhere('ativo', '==', true)
      .then((docs) => {
        docs.forEach(v => {
          const user = v.data();
          const userarr = {
            uid: v.id,
            nomeCompleto: user.nomeCompleto
          };
          this.iusers.push(userarr);
        });
      });
  }

  public get f() {
    return this.form.controls;
  }

  public openBrowser(id, event) {
    event.preventDefault();
    const elem: HTMLElement = document.getElementById(id) as HTMLElement;
    elem.click();
  }

  public galleryChange(pos, file) {
    const modalCrop = this.modalService.open(CropmodalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalCrop.result.then((result) => {
      this.localImages[pos] = {};
      this.localImages[pos].show = true;
      this.localImages[pos].filename = file.name;
      this.localImages[pos].filetype = file.name.substring(file.name.lastIndexOf('.') + 1);
      this.localImages[pos].src = result.image;
      this.localImages[pos].updated = true;
    }).catch((error) => {
      console.log(error);
    });

    const image: any = new Image();
    const myReader: FileReader = new FileReader();
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      modalCrop.componentInstance.init(image, 500, 500, 100, 100, false);
    };
    myReader.readAsDataURL(file);
  }

  deleteGalleryImage(pos) {
    this.localImages[pos] = {};
  }

  public onFileChange(node, event) {
    const file: File = event.target.files[0];
    if (node == 'capa' || node == 'logo') {
      const modalRef = this.modalService.open(CropmodalComponent, { ariaLabelledBy: 'modal-basic-title' });
      modalRef.result.then((result) => {
        this.setImagensPreviewNode(node, file.name, result.image);
      }).catch((error) => {
        console.log(error);
      });

      const image: any = new Image();
      const myReader: FileReader = new FileReader();
      myReader.onloadend = function (loadEvent: any) {
        image.src = loadEvent.target.result;
        if (node == 'capa') {
          modalRef.componentInstance.init(image, 644, 362, 100, 57, false);
        } else {
          modalRef.componentInstance.init(image, 200, 200, 100, 100);
        }
      };
      myReader.readAsDataURL(file);
    } else {
      if ((node === 'pinonline' || node === 'pinoffline') && this.f.plano.value === 'eNEn6bJdJfwcNfUoAQns') {
        const modalRef = this.modalService.open(CropmodalComponent, { ariaLabelledBy: 'modal-basic-title' });
        modalRef.result.then(async (result) => {
          const resFetch: any = await fetch(result.image);
          const blob = await resFetch.blob();
          const formData = new FormData();
          formData.append('file', blob, file.name);
          this.http.post(`http://operativenode.azurewebsites.net/api/keep/createPin/${node === 'pinonline' ? 'on-line' : 'off-line'}`,
            formData, { responseType: 'blob' })
            .toPromise()
            .then(blob => {
              this.fireStorage.readFileAsDataURL(blob).then((dataurl: any) => {
                this.setImagensPreviewNode(node, file.name, dataurl);
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }).catch((error) => {
          console.error(error);
        });

        this.fireStorage.readFileAsDataURL(file).then((dataurl: any) => {
          const image = new Image();
          image.src = dataurl;
          modalRef.componentInstance.init(image, 52, 52, 152, 152, false);
        });
      } else {
        this.fireStorage.readFileAsDataURL(file).then((dataurl: any) => {
          this.setImagensPreviewNode(node, file.name, dataurl);
        });
      }
    }
  }

  setImagensPreviewNode(node, filename, src) {
    this.imagenspreview[node].show = true;
    this.imagenspreview[node].filename = filename;
    this.imagenspreview[node].filetype = filename.substring(filename.lastIndexOf('.') + 1);
    this.imagenspreview[node].src = src;
    this.imagenspreview[node].updated = true;
  }

  public consultaCep() {
    this.submittedcep = true;
    if (this.f.cep.valid) {
      if (this.cepconsultado != this.f.cep.value) {
        this.cepconsultado = this.f.cep.value;
        this.http.get('https://api.postmon.com.br/v1/cep/' + this.f.cep.value).subscribe((res: any) => {
          this.f.bairro.setValue(res.bairro);
          this.f.cidade.setValue(res.cidade);
          this.f.logradouro.setValue(res.logradouro);

          this.f.numero.enable();
        });
      }
    }
  }

  public consultaGeo() {
    if (this.f.cep.valid) {
      if (this.numeroconsultado != this.f.numero.value) {
        this.numeroconsultado = this.f.numero.value;
        const address = this.f.logradouro.value + ', ' + this.f.numero.value + ' - ' + this.f.bairro.value + ', ' + this.f.cidade.value + ' - ' + this.f.estado.value + ', ' + this.f.cep.value + ', Brasil';
        this.http.get('https://maps.google.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyDbwbskI_qcwW6U4kfPIJU7R7lLmH6aDWs').subscribe((res: any) => {
          if (res.status == 'OK' && res.results.length > 0) {
            this.f.longitude.enable();
            this.f.longitude.setValue(res.results[0].geometry.location.lng);
            this.f.latitude.enable();
            this.f.latitude.setValue(res.results[0].geometry.location.lat);
          }
        });
      }
    }
  }

  private setHorarios(obj, input1, input2, dia, turno) {
    if (!!input1 && !!input2 && input1 != 'Fechado' && input2 != 'Fechado') {
      obj.horarioAtendimento[dia][turno] = {
        inicio: input1,
        fim: input2
      };
    }
  }

  private getHorarioIndex(node, inicio) {
    if (node == null) {
      return 'Fechado';
    }

    if (inicio) {
      return node.inicio;
    }

    return node.fim;
  }

  private validHorarioInput(input1, input2, dia, priseg) {
    if (!input1 && !input2) {
      return true;
    }

    if (!input1) {
      this.validHorarios[dia][priseg].invalid = true;
      this.validHorarios[dia][priseg].sprimeiro = true;
      return false;
    }

    if (!input2) {
      this.validHorarios[dia][priseg].invalid = true;
      this.validHorarios[dia][priseg].ssegundo = true;
      return false;
    }

    if (input1 != 'Fechado' && input2 != 'Fechado' && this.ihorarios.indexOf(input1) == this.ihorarios.indexOf(input2)) {
      this.validHorarios[dia][priseg].invalid = true;
      this.validHorarios[dia][priseg].igual = true;
      return false;
    }

    return true;
  }

  private initValidHorarios() {
    const obj = JSON.stringify({
      pri: {
        invalid: false,
        sprimeiro: false,
        ssegundo: false,
        igual: false
      },
      seg: {
        invalid: false,
        sprimeiro: false,
        ssegundo: false,
        igual: false
      }
    });

    this.validHorarios = {
      segunda: JSON.parse(obj),
      terca: JSON.parse(obj),
      quarta: JSON.parse(obj),
      quinta: JSON.parse(obj),
      sexta: JSON.parse(obj),
      sabado: JSON.parse(obj),
      domingo: JSON.parse(obj)
    };
  }

  public blurImageInstagram() {
    this.imagenspreview.insta.show = false;
    this.imagenspreview.insta.src = '';
    this.imagenspreview.insta.error = false;

    const instagram = this.f.instagram.value.replace('@', '').replace('https://www.instagram.com/', '').replace('https://instagram.com/', '').replace('/', '');
    if (instagram != '') {
      this.imagenspreview.insta.loader = true;
      this.http.get('https://www.instagram.com/web/search/topsearch/?context=user&count=0&query=' + instagram).subscribe((res: any) => {
        if (res.users.length > 0) {
          this.http.get(res.users[0].user.profile_pic_url, { responseType: 'blob' }).subscribe((response: any) => {
            const dataType = response.type;
            this.fireStorage.readFileAsDataURL(new File([response], 'nameimage.' + dataType.split('/')[1], { type: dataType })).then((dataurl: any) => {
              this.imagenspreview.insta.show = true;
              this.imagenspreview.insta.src = dataurl;
              this.imagenspreview.insta.filetype = dataType.split('/')[1];
              this.imagenspreview.insta.updated = true;
              this.imagenspreview.insta.loader = false;
            });
          });
        } else {
          this.imagenspreview.insta.loader = false;
          this.imagenspreview.insta.error = true;
        }
      });
    }
  }

  private formReset() {
    this.formInit();
    this.submitted = false;
    this.submittedcep = false;
    this.cepconsultado = '';
    this.numeroconsultado = '';
    this.showdatetest = false;
    this.inValidValidadeTestData = false;
    this.initValidHorarios();
    this.ponto = null;
    this.pontouid = null;
    this.initiatesVariables();
  }

  public onStatusChange(value) {
    this.showdatetest = value == 2;
    this.inValidValidadeTestData = value == 2;
  }

  public onVencimentoTesteDataChange() {
    this.inValidValidadeTestData = this.inValidDateInput(this.f.vencimentoTesteData.value);
  }

  private inValidDateInput(date) {
    if (date == '') {
      return true;
    }
    const dateSplit = date.split('-');
    const vencimentoTesteData = new Date(dateSplit[0], parseInt(dateSplit[1], 10) - 1, parseInt(dateSplit[2], 10));
    const currentDate = new Date();
    return currentDate > vencimentoTesteData;
  }

  setIconDefalt(pin) {
    switch (pin) {
      case '':
        return JSON.stringify({ show: false, src: '', filetype: '', filename: '', updated: false });
      case 'on':
        return JSON.stringify({
          show: true,
          src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAtCAYAAADP5GkqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NDEzZDNlNy05MzQ4LTQyYjgtODQwNy1mMmJlYjQ1MzVhYWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjM2RTRBNDQwMzk3MTFFOUFBNzNDOTZENzE4MjJBOEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjM2RTRBNDMwMzk3MTFFOUFBNzNDOTZENzE4MjJBOEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkMjc2Zjc5OS04ZDFiLTQxZmItYTQyNS01ODBiYTk1NjNiYjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTQxM2QzZTctOTM0OC00MmI4LTg0MDctZjJiZWI0NTM1YWFm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',
          filetype: '',
          filename: '',
          updated: false
        });
      case 'off':
        return JSON.stringify({
          show: true,
          src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAtCAYAAADP5GkqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NDEzZDNlNy05MzQ4LTQyYjgtODQwNy1mMmJlYjQ1MzVhYWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjM2RTRBNDgwMzk3MTFFOUFBNzNDOTZENzE4MjJBOEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjM2RTRBNDcwMzk3MTFFOUFBNzNDOTZENzE4MjJBOEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkMjc2Zjc5OS04ZDFiLTQxZmItYTQyNS01ODBiYTk1NjNiYjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTQxM2QzZTctOTM0OC00MmI4LTg0MDctZjJiZWI0NTM1YWFm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',
          filetype: '',
          filename: '',
          updated: false
        });
      case 'privado':
        return JSON.stringify({
          show: true,
          src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAtCAYAAADP5GkqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1NDEzZDNlNy05MzQ4LTQyYjgtODQwNy1mMmJlYjQ1MzVhYWYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTgzQzBFRUQwM0JBMTFFOUFBNzNDOTZENzE4MjJBOEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTgzQzBFRUMwM0JBMTFFOUFBNzNDOTZENzE4MjJBOEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpkMjc2Zjc5OS04ZDFiLTQxZmItYTQyNS01ODBiYTk1NjNiYjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTQxM2QzZTctOTM0OC00MmI4LTg0MDctZjJiZWI0NTM1YWFm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',
          filetype: '',
          filename: '',
          updated: false
        });
      default:
        return JSON.stringify({ show: false, src: '', filetype: '', filename: '', updated: false });
    }
  }

  replicarHorarios() {
    this.f.hsegunda201.setValue(this.f.hsegunda101.value);
    this.f.hsegunda202.setValue(this.f.hsegunda102.value);

    this.f.hterca0101.setValue(this.f.hsegunda101.value);
    this.f.hterca0102.setValue(this.f.hsegunda102.value);
    this.f.hterca0201.setValue(this.f.hsegunda101.value);
    this.f.hterca0202.setValue(this.f.hsegunda102.value);

    this.f.hquarta0101.setValue(this.f.hsegunda101.value);
    this.f.hquarta0102.setValue(this.f.hsegunda102.value);
    this.f.hquarta0201.setValue(this.f.hsegunda101.value);
    this.f.hquarta0202.setValue(this.f.hsegunda102.value);

    this.f.hquinta0101.setValue(this.f.hsegunda101.value);
    this.f.hquinta0102.setValue(this.f.hsegunda102.value);
    this.f.hquinta0201.setValue(this.f.hsegunda101.value);
    this.f.hquinta0202.setValue(this.f.hsegunda102.value);

    this.f.hsexta0101.setValue(this.f.hsegunda101.value);
    this.f.hsexta0102.setValue(this.f.hsegunda102.value);
    this.f.hsexta0201.setValue(this.f.hsegunda101.value);
    this.f.hsexta0202.setValue(this.f.hsegunda102.value);

    this.f.hsabado0101.setValue(this.f.hsegunda101.value);
    this.f.hsabado0102.setValue(this.f.hsegunda102.value);
    this.f.hsabado0201.setValue(this.f.hsegunda101.value);
    this.f.hsabado0202.setValue(this.f.hsegunda102.value);

    this.f.hdomingo0101.setValue(this.f.hsegunda101.value);
    this.f.hdomingo0102.setValue(this.f.hsegunda102.value);
    this.f.hdomingo0201.setValue(this.f.hsegunda101.value);
    this.f.hdomingo0202.setValue(this.f.hsegunda102.value);
  }

  public isInvalidTipoCabos() {
    let checked = false;
    for (const cabo of this.tiposDeCabos) {
      if (this.f['cabo' + cabo.id].value) {
        checked = true;
        break;
      }
    }

    return !checked;
  }
}
