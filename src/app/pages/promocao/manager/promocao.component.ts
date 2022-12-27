import { Component, OnInit, ViewChild } from '@angular/core';
import { Promocao } from '../../../../models/Promocao';
import { FormValidator } from '../../../utils/validator/FormValidator';
import { NgForm } from '@angular/forms';
import { CropmodalComponent } from '../../../cropmodal/cropmodal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireStorageProvider } from '../../../providers/fire-storage.provider';
import { PromocaoProvider } from '../../../providers/promocao.provider';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert';
import { DateUtils } from 'src/app/utils/DateUtils';

@Component({
  selector: 'app-promocao',
  templateUrl: './promocao.component.html',
  styleUrls: ['./promocao.component.scss']
})
export class PromocaoComponent extends FormValidator implements OnInit {
  @ViewChild('promocaoForm') form: NgForm;

  public showpreloader = false;
  public promocao: Promocao;
  private promocaoUid;
  public extraControls; // outhers inputs
  public ihorarios = ['Não Valido',
    '00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30',
  ];

  public constructor(
    private modalService: NgbModal,
    private promocaoProvider: PromocaoProvider,
    private fireStorage: FireStorageProvider,
    private route: ActivatedRoute,
    private router: Router) {
    super();
    this.promocaoUid = null;
  }

  public ngOnInit() {
    this._form = this.form; // _form vem da classe FormValidator
    this.promocao = new Promocao();

    this.extraControls = {
      imagem: {
        val: null,
        src: null,
        srcType: null
      },
      imagemLocal: {
        val: null,
        src: null,
        srcType: null
      },
      dataValidade: {
        val: null,
        min: DateUtils.dateToDateInput(new Date())
      },
    };

    this.initExtraControlsSchedule();

    if (this.route.snapshot.paramMap.get('id')) {
      this.showpreloader = true;
      this.promocaoProvider.getById(this.route.snapshot.paramMap.get('id'))
        .then((doc: any) => {
          if (doc == null) {
            this.router.navigate(['/promocoes']);
          } else {
            this.promocaoUid = doc.id;
            this.promocao.toPromocao(doc);
            this.extraControls.imagem.src = this.promocao.imagem;
            // para passar na validação ao clicar em gravar, caso não tenha selecionado outra imagem
            this.extraControls.imagem.val = 'Imagem selecionada';

            if (this.promocao.local) {
              this.extraControls.imagemLocal.src = this.promocao.local.imagem;
              // para passar na validação ao clicar em gravar, caso não tenha selecionado outra imagem
              this.extraControls.imagemLocal.val = 'Imagem selecionada';
            }

            if (doc.dataValidade) {
              this.extraControls.dataValidade.val = DateUtils.dateToDateInput(doc.dataValidade.toDate());
            }

            this.defineHorariosNaoValidos();

            this.showpreloader = false;
          }
        });
    }
  }

  public initExtraControlsSchedule() {
    const objValidation = JSON.stringify({
      invalid: false,
      touched: false,
      errors: {
        required: false,
        repeatedValue: false
      }
    });

    this._validationExtra = {
      segundaTurno1Input1: JSON.parse(objValidation),
      segundaTurno1Input2: JSON.parse(objValidation),
      segundaTurno2Input1: JSON.parse(objValidation),
      segundaTurno2Input2: JSON.parse(objValidation),
      tercaTurno1Input1: JSON.parse(objValidation),
      tercaTurno1Input2: JSON.parse(objValidation),
      tercaTurno2Input1: JSON.parse(objValidation),
      tercaTurno2Input2: JSON.parse(objValidation),
      quartaTurno1Input1: JSON.parse(objValidation),
      quartaTurno1Input2: JSON.parse(objValidation),
      quartaTurno2Input1: JSON.parse(objValidation),
      quartaTurno2Input2: JSON.parse(objValidation),
      quintaTurno1Input1: JSON.parse(objValidation),
      quintaTurno1Input2: JSON.parse(objValidation),
      quintaTurno2Input1: JSON.parse(objValidation),
      quintaTurno2Input2: JSON.parse(objValidation),
      sextaTurno1Input1: JSON.parse(objValidation),
      sextaTurno1Input2: JSON.parse(objValidation),
      sextaTurno2Input1: JSON.parse(objValidation),
      sextaTurno2Input2: JSON.parse(objValidation),
      sabadoTurno1Input1: JSON.parse(objValidation),
      sabadoTurno1Input2: JSON.parse(objValidation),
      sabadoTurno2Input1: JSON.parse(objValidation),
      sabadoTurno2Input2: JSON.parse(objValidation),
      domingoTurno1Input1: JSON.parse(objValidation),
      domingoTurno1Input2: JSON.parse(objValidation),
      domingoTurno2Input1: JSON.parse(objValidation),
      domingoTurno2Input2: JSON.parse(objValidation)
    };
  }

  public save() {
    if (this.formInvalid()) {
      swal('Ops!', 'Verifique os campos!', 'error');
      return;
    }

    this.removeHorariosNaoValidos();

    this.showpreloader = true;
    // convert date input to Data object
    this.promocao.dataValidade = DateUtils.dateInputToDate(this.extraControls.dataValidade.val);

    Promise.resolve(null) // criar uma cadeia de promises
      .then(() => {
        if (this.promocaoUid == null) { // insert
          return this.fireStorage.uploadImageData(
            this.extraControls.imagem.src,
            this.extraControls.imagem.srcType,
            this.promocaoProvider.collectionName)
            .then((urlImagemPromocao: string) => this.promocao.imagem = urlImagemPromocao);
        } else if (this.extraControls.imagem.srcType) { // editando, e alterou a imagem
          this.fireStorage.updateImageDataFromURL(this.promocao.imagem, this.extraControls.imagem.src);
        }
        return null;
      })
      .then(() => {
        if (this.promocaoUid == null) { // insert
          return this.fireStorage.uploadImageData(
            this.extraControls.imagemLocal.src,
            this.extraControls.imagemLocal.srcType,
            this.promocaoProvider.collectionName)
            .then((urlImagemLocal: string) => this.promocao.local.imagem = urlImagemLocal);
        } else if (this.extraControls.imagemLocal.srcType) { // editando, e alterou a imagem
          this.fireStorage.updateImageDataFromURL(this.promocao.local.imagem, this.extraControls.imagemLocal.src);
        }
        return null;
      })
      .then(() => {
        if (this.promocaoUid == null) {
          return this.promocaoProvider.add(this.promocao.toLiteral())
            .then(() => null); // return null e não uma referencia do documento.
        }
        return this.promocaoProvider.update(this.promocaoUid, this.promocao.toLiteral()); // return null
      })
      .then(() => swal('Exito', `Promoção ${this.promocaoUid == null ? 'cadastrada' : 'alterada'} com sucesso!`, 'success'))
      .then(() => {
        this.router.navigate(['/promocoes']);
      })
      .catch((err) => {
        this.showpreloader = false;
        console.log(err);
      });
  }

  public onImageFileChange(file: File) {
    const modalRef = this.modalService.open(CropmodalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.result.then((result) => {
      this.extraControls.imagem.val = file.name;
      this.extraControls.imagem.src = result.image;
      this.extraControls.imagem.srcType = file.name.substring(file.name.lastIndexOf('.') + 1);
    }).catch((error) => {
      console.log(error);
    });

    const image: any = new Image();
    const fr: FileReader = new FileReader();
    fr.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      modalRef.componentInstance.init(image, 1280, 720, 100, 57, false);
    };
    fr.readAsDataURL(file);
  }

  public onImageLocalFileChange(file: File) {
    const modalRef = this.modalService.open(CropmodalComponent, { ariaLabelledBy: 'modal-basic-title' });
    modalRef.result.then((result) => {
      this.extraControls.imagemLocal.val = file.name;
      this.extraControls.imagemLocal.src = result.image;
      this.extraControls.imagemLocal.srcType = file.name.substring(file.name.lastIndexOf('.') + 1);
    }).catch((error) => {
      console.log(error);
    });

    const image: any = new Image();
    const fr: FileReader = new FileReader();
    fr.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      modalRef.componentInstance.init(image, 200, 200, 80, 80, false);
    };
    fr.readAsDataURL(file);
  }

  public onInputChange(field, value) {
    this._validationExtra[field].invalid = false;
    this._validationExtra[field].errors.required = false;

    let input2;
    let inputExtra;
    let dia;
    let turno;
    let inifim;

    switch (field) {
      case 'segundaTurno1Input1':
        input2 = 'segundaTurno1Input2';
        inputExtra = 'segundaTurno1Input2';
        dia = 'segunda';
        turno = 'turno1';
        inifim = 'fim';
        break;
      case 'segundaTurno1Input2':
        input2 = 'segundaTurno1Input1';
        inputExtra = 'segundaTurno1Input2';
        dia = 'segunda';
        turno = 'turno1';
        inifim = 'inicio';
        break;

      case 'segundaTurno2Input1':
        input2 = 'segundaTurno2Input2';
        inputExtra = 'segundaTurno2Input2';
        dia = 'segunda';
        turno = 'turno2';
        inifim = 'fim';
        break;
      case 'segundaTurno2Input2':
        input2 = 'segundaTurno2Input1';
        inputExtra = 'segundaTurno2Input2';
        dia = 'segunda';
        turno = 'turno2';
        inifim = 'inicio';
        break;

      case 'tercaTurno1Input1':
        input2 = 'tercaTurno1Input2';
        inputExtra = 'tercaTurno1Input2';
        dia = 'terca';
        turno = 'turno1';
        inifim = 'fim';
        break;
      case 'tercaTurno1Input2':
        input2 = 'tercaTurno1Input1';
        inputExtra = 'tercaTurno1Input2';
        dia = 'terca';
        turno = 'turno1';
        inifim = 'inicio';
        break;

      case 'tercaTurno2Input1':
        input2 = 'tercaTurno2Input2';
        inputExtra = 'tercaTurno2Input2';
        dia = 'terca';
        turno = 'turno2';
        inifim = 'fim';
        break;
      case 'tercaTurno2Input2':
        input2 = 'tercaTurno2Input1';
        inputExtra = 'tercaTurno2Input2';
        dia = 'terca';
        turno = 'turno2';
        inifim = 'inicio';
        break;

      case 'quartaTurno1Input1':
        input2 = 'quartaTurno1Input2';
        inputExtra = 'quartaTurno1Input2';
        dia = 'quarta';
        turno = 'turno1';
        inifim = 'fim';
        break;
      case 'quartaTurno1Input2':
        input2 = 'quartaTurno1Input1';
        inputExtra = 'quartaTurno1Input2';
        dia = 'quarta';
        turno = 'turno1';
        inifim = 'inicio';
        break;

      case 'quartaTurno2Input1':
        input2 = 'quartaTurno2Input2';
        inputExtra = 'quartaTurno2Input2';
        dia = 'quarta';
        turno = 'turno2';
        inifim = 'fim';
        break;
      case 'quartaTurno2Input2':
        input2 = 'quartaTurno2Input1';
        inputExtra = 'quartaTurno2Input2';
        dia = 'quarta';
        turno = 'turno2';
        inifim = 'inicio';
        break;

      case 'quintaTurno1Input1':
        input2 = 'quintaTurno1Input2';
        inputExtra = 'quintaTurno1Input2';
        dia = 'quinta';
        turno = 'turno1';
        inifim = 'fim';
        break;
      case 'quintaTurno1Input2':
        input2 = 'quintaTurno1Input1';
        inputExtra = 'quintaTurno1Input2';
        dia = 'quinta';
        turno = 'turno1';
        inifim = 'inicio';
        break;

      case 'quintaTurno2Input1':
        input2 = 'quintaTurno2Input2';
        inputExtra = 'quintaTurno2Input2';
        dia = 'quinta';
        turno = 'turno2';
        inifim = 'fim';
        break;
      case 'quintaTurno2Input2':
        input2 = 'quintaTurno2Input1';
        inputExtra = 'quintaTurno2Input2';
        dia = 'quinta';
        turno = 'turno2';
        inifim = 'inicio';
        break;

      case 'sextaTurno1Input1':
        input2 = 'sextaTurno1Input2';
        inputExtra = 'sextaTurno1Input2';
        dia = 'sexta';
        turno = 'turno1';
        inifim = 'fim';
        break;
      case 'sextaTurno1Input2':
        input2 = 'sextaTurno1Input1';
        inputExtra = 'sextaTurno1Input2';
        dia = 'sexta';
        turno = 'turno1';
        inifim = 'inicio';
        break;

      case 'sextaTurno2Input1':
        input2 = 'sextaTurno2Input2';
        inputExtra = 'sextaTurno2Input2';
        dia = 'sexta';
        turno = 'turno2';
        inifim = 'fim';
        break;
      case 'sextaTurno2Input2':
        input2 = 'sextaTurno2Input1';
        inputExtra = 'sextaTurno2Input2';
        dia = 'sexta';
        turno = 'turno2';
        inifim = 'inicio';
        break;

      case 'sabadoTurno1Input1':
        input2 = 'sabadoTurno1Input2';
        inputExtra = 'sabadoTurno1Input2';
        dia = 'sabado';
        turno = 'turno1';
        inifim = 'fim';
        break;
      case 'sabadoTurno1Input2':
        input2 = 'sabadoTurno1Input1';
        inputExtra = 'sabadoTurno1Input2';
        dia = 'sabado';
        turno = 'turno1';
        inifim = 'inicio';
        break;

      case 'sabadoTurno2Input1':
        input2 = 'sabadoTurno2Input2';
        inputExtra = 'sabadoTurno2Input2';
        dia = 'sabado';
        turno = 'turno2';
        inifim = 'fim';
        break;
      case 'sabadoTurno2Input2':
        input2 = 'sabadoTurno2Input1';
        inputExtra = 'sabadoTurno2Input2';
        dia = 'sabado';
        turno = 'turno2';
        inifim = 'inicio';
        break;

      case 'domingoTurno1Input1':
        input2 = 'domingoTurno1Input2';
        inputExtra = 'domingoTurno1Input2';
        dia = 'domingo';
        turno = 'turno1';
        inifim = 'fim';
        break;
      case 'domingoTurno1Input2':
        input2 = 'domingoTurno1Input1';
        inputExtra = 'domingoTurno1Input2';
        dia = 'domingo';
        turno = 'turno1';
        inifim = 'inicio';
        break;

      case 'domingoTurno2Input1':
        input2 = 'domingoTurno2Input2';
        inputExtra = 'domingoTurno2Input2';
        dia = 'domingo';
        turno = 'turno2';
        inifim = 'fim';
        break;
      case 'domingoTurno2Input2':
        input2 = 'domingoTurno2Input1';
        inputExtra = 'domingoTurno2Input2';
        dia = 'domingo';
        turno = 'turno2';
        inifim = 'inicio';
        break;
    }

    const horario = this.promocao.horarios[dia][turno][inifim];
    if (value && value !== 'Não Valido') {
      if (!horario) {
        this._validationExtra[input2].invalid = true;
        this._validationExtra[input2].errors.required = true;
      } else {
        this._validationExtra[inputExtra].invalid = (value === horario);
        this._validationExtra[inputExtra].errors.repeatedValue = (value === horario);
      }
    } else {
      this._validationExtra[inputExtra].errors.repeatedValue = false;
      if (horario && horario !== 'Não Valido') {
        this._validationExtra[field].invalid = true;
        this._validationExtra[field].errors.required = true;
      } else {
        this._validationExtra[input2].invalid = false;
        this._validationExtra[input2].errors.required = false;
      }
    }
  }

  private removeHorariosNaoValidos() {
    const dias = Object.keys(this.promocao.horarios);
    for (const dia of dias) {
      if (this.promocao.horarios[dia].turno1.inicio === 'Não Valido') {
        this.promocao.horarios[dia].turno1.inicio = null;
      }
      if (this.promocao.horarios[dia].turno1.fim === 'Não Valido') {
        this.promocao.horarios[dia].turno1.fim = null;
      }
      if (this.promocao.horarios[dia].turno2.inicio === 'Não Valido') {
        this.promocao.horarios[dia].turno2.inicio = null;
      }
      if (this.promocao.horarios[dia].turno2.fim === 'Não Valido') {
        this.promocao.horarios[dia].turno2.fim = null;
      }
    }
  }

  private defineHorariosNaoValidos() {
    const dias = Object.keys(this.promocao.horarios);
    for (const dia of dias) {
      if (this.promocao.horarios[dia].turno1.inicio === null) {
        this.promocao.horarios[dia].turno1.inicio = 'Não Valido';
      }
      if (this.promocao.horarios[dia].turno1.fim === null) {
        this.promocao.horarios[dia].turno1.fim = 'Não Valido';
      }
      if (this.promocao.horarios[dia].turno2.inicio === null) {
        this.promocao.horarios[dia].turno2.inicio = 'Não Valido';
      }
      if (this.promocao.horarios[dia].turno2.fim === null) {
        this.promocao.horarios[dia].turno2.fim = 'Não Valido';
      }
    }
  }

  public replicarHorarios() {
    Object.keys(this.promocao.horarios).forEach(v => {
      this.promocao.horarios[v].turno1.inicio = this.promocao.horarios.segunda.turno1.inicio;
      this.promocao.horarios[v].turno1.fim = this.promocao.horarios.segunda.turno1.fim;
      this.promocao.horarios[v].turno2.inicio = this.promocao.horarios.segunda.turno1.inicio;
      this.promocao.horarios[v].turno2.fim = this.promocao.horarios.segunda.turno1.fim;
    });
  }
}
