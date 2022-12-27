import {Component, OnInit, ViewChild} from '@angular/core';
import {Evento} from '../../../../models/Evento';
import {NgForm} from '@angular/forms';
import {FormValidator} from '../../../utils/validator/FormValidator';
import {CropmodalComponent} from '../../../cropmodal/cropmodal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventoProvider} from '../../../providers/evento.provider';
import {FireStorageProvider} from '../../../providers/fire-storage.provider';
import {DateUtils} from '../../../utils/DateUtils';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent extends FormValidator implements OnInit {
  @ViewChild('eventoForm') form: NgForm;

  public showpreloader = false;
  public evento: Evento;
  private eventoUid;
  public extraControls; // outhers inputs

  public constructor(
    private modalService: NgbModal,
    private eventoProvider: EventoProvider,
    private fireStorage: FireStorageProvider,
    private route: ActivatedRoute,
    private router: Router) {
    super();
    this.eventoUid = null;
  }

  public ngOnInit() {
    this._form = this.form; // _form vem da classe FormValidator
    this.evento = new Evento();

    this.extraControls = {
      dataDoEvento: {
        val: null
      },
      imagem: {
        val: null,
        src: null,
        srcType: null
      }
    };

    if (this.route.snapshot.paramMap.get('id')) {
      this.showpreloader = true;
      this.eventoProvider.getById(this.route.snapshot.paramMap.get('id'))
        .then((doc: any) => {
          if (doc == null) {
            this.router.navigate(['/eventos']);
          } else {
            this.eventoUid = doc.id;
            this.evento.toEvento(doc);
            this.extraControls.dataDoEvento.val = DateUtils.dateToDateInput(doc.dataDoEvento.toDate());
            this.extraControls.imagem.src = this.evento.imagem;
            // para passar na validação ao clicar em gravar, caso não tenha selecionado outra imagem
            this.extraControls.imagem.val = 'Imagem selecionada';

            this.showpreloader = false;
          }
        });
    }
  }

  public save() {
    if (this.form.invalid) {
      swal('Ops!', 'Verifique os campos!', 'error');
      return;
    }

    this.showpreloader = true;
    // convert date input to Data object
    this.evento.dataDoEvento = DateUtils.dateInputToDate(this.extraControls.dataDoEvento.val);

    Promise.resolve(null) // criar uma cadeia de promises
      .then(() => {
        if (this.eventoUid == null) { // insert
          return this.fireStorage.uploadImageData(
            this.extraControls.imagem.src,
            this.extraControls.imagem.srcType,
            this.eventoProvider.collectionName)
            .then((urlImagemEvento: string) => this.evento.imagem = urlImagemEvento);
        } else if (this.extraControls.imagem.srcType) { // editando, e alterou a imagem
          this.fireStorage.updateImageDataFromURL(this.evento.imagem, this.extraControls.imagem.src);
        }
        return null;
      })
      .then(() => {
        if (this.eventoUid == null) {
          return this.eventoProvider.add(this.evento.toLiteral())
            .then(() => null); // return null e não uma referencia do documento.
        }
        return this.eventoProvider.update(this.eventoUid, this.evento.toLiteral()); // return null
      })
      .then(() => swal('Exito', `Evento ${this.eventoUid == null ? 'cadastrado' : 'alterado'} com sucesso!`, 'success'))
      .then(() => {
        this.router.navigate(['/eventos']);
      })
      .catch((err) => {
        this.showpreloader = false;
        console.log(err);
      });
  }

  public onImageFileChange(file: File) {
    const modalRef = this.modalService.open(CropmodalComponent, {ariaLabelledBy: 'modal-basic-title'});
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
      modalRef.componentInstance.init(image, 720, 720, 100, 100, false);
    };
    fr.readAsDataURL(file);
  }
}
