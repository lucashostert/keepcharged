import { Component, OnInit, ViewChild } from '@angular/core';
import { FormValidator } from 'src/app/utils/validator/FormValidator';
import { NgForm } from '@angular/forms';
import { FaleConosco } from 'src/models/FaleConosco';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireStorageProvider } from 'src/app/providers/fire-storage.provider';
import { ActivatedRoute, Router } from '@angular/router';
import { CropmodalComponent } from 'src/app/cropmodal/cropmodal.component';
import { ContatoProvider } from 'src/app/providers/contato.provider';
import swal from 'sweetalert';
@Component({
  selector: 'app-fale',
  templateUrl: './fale.component.html',
  styleUrls: ['./fale.component.scss']
})
export class FaleComponent extends FormValidator implements OnInit {
  @ViewChild('eventoForm') form: NgForm;

  public showpreloader = false;
  public fale: FaleConosco;
  private eventoUid;
  public extraControls; // outhers inputs

  public constructor(
    private modalService: NgbModal,
    private _contatoProvider: ContatoProvider,
    private fireStorage: FireStorageProvider,
    private route: ActivatedRoute,
    private router: Router) {
    super();
    this.eventoUid = null;
  }

  public ngOnInit() {
    this._form = this.form; // _form vem da classe FormValidator
    this.fale = new FaleConosco();

    this.extraControls = {
      email: '',
      endereco: {cidade:'',estado:''},
      point: '',
      nome: '',
      mensagem: '',
      telefone: '',  
      status: true,  
      observacao: true,  
    };
    if (this.route.snapshot.paramMap.get('id')) {
      this.showpreloader = true;
      this._contatoProvider.getById(this.route.snapshot.paramMap.get('id'))
        .then((doc: any) => {
          if (doc == null) {
            this.router.navigate(['/faleConosco']);
          } else {
            
            this.eventoUid = doc.id;
            this.fale.toObject(doc);
            this.extraControls=this.fale;
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
    Promise.resolve(null) // criar uma cadeia de promises
      .then(() => {
        if (this.eventoUid == null) {
          return this._contatoProvider.add(this.fale.toLiteral())
            .then(() => null); // return null e não uma referencia do documento.
        }
        return this._contatoProvider.update(this.eventoUid, this.fale.toLiteral()); // return null
      })
      .then(() => swal('Exito', `FaleConosco ${this.eventoUid == null ? 'cadastrado' : 'alterado'} com sucesso!`, 'success'))
      .then(() => {
        this.router.navigate(['/faleConosco']);
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
