import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CropmodalComponent } from '../../../cropmodal/cropmodal.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { CargoProvider } from '../../../providers/cargo.provider';
import { UsuarioProvider } from '../../../providers/usuario.provider';
import swal from 'sweetalert';
import { FormValidator } from 'src/app/utils/validator/FormValidator';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/User';
import { Validators } from 'src/app/utils/validator/Validators';

@Component({
  selector: 'app-representante',
  templateUrl: './representante.component.html',
  styleUrls: ['./representante.component.scss']
})
export class RepresentanteComponent extends FormValidator implements OnInit {
  @ViewChild('representanteForm') _form: NgForm;

  public showpreloader = false;
  public iCargos = [];
  public avatar: any;
  public password: string;
  public user = new User();
  public funcSearchFromEmailUsers: any;
  public ifoundusers: User[] = [];
  public openAutoComplete = true;
  public editing = false;

  public constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private modalService: NgbModal,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private cargoProvider: CargoProvider,
    private usuarioProvider: UsuarioProvider) {
    super();

    this.avatar = {
      updated: false,
      image: null,
      val: null
    };
  }

  public async ngOnInit() {
    this.showpreloader = true;

    if (this.route.snapshot.paramMap.get('id')) {
      const doc: any = await this.usuarioProvider.getById(this.route.snapshot.paramMap.get('id'));
      if (doc === null) {
        this.router.navigate(['/representantes']);
        return;
      }

      this.user = new User(doc);
      if (this.user.avatar) {
        this.avatar.image = this.user.avatar;
      }
      this.cpfMask();
      this.editing = true;
    }

    await this.loadCargos();

    setTimeout(() => {
      this._form.controls.userEmail.setValidators([Validators.email]);
      this._form.controls.userCpf.setValidators([Validators.cpf]);
    });

    this.showpreloader = false;
  }

  private async loadCargos() {
    const docs = await this.cargoProvider.getWhereOrderBy('status', '==', true, 'nivelAcesso');
    docs.forEach(v => {
      this.iCargos.push({ id: v.id, ...v.data() });
    });
  }

  public cpfMask() {
    if (this.user.cpf) {
      this.user.cpf = this.user.cpf
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
  }

  public searchFromEmailUsers() {
    if (!this.editing && this.user.email && this.user.email.length > 5) {
      clearTimeout(this.funcSearchFromEmailUsers);
      this.funcSearchFromEmailUsers = setTimeout(async () => {
        const users = await this.usuarioProvider.getUsersByEmail(this.user.email);
        this.ifoundusers = users;
        this.openAutoComplete = true;
      }, 1000);
    }
  }

  public searchEmailFocusOut() {
    setTimeout(() => {
      this.openAutoComplete = false;
    }, 200);
  }

  public onOptionSelectUser(user) {
    this.user = user;
    if (this.user.avatar) {
      this.avatar.image = this.user.avatar;
    }
    this.cpfMask();
  }

  public async save() {
    if (this.formInvalid()) {
      swal('Ops!', 'Verifique os campos!', 'error');
      return;
    }

    this.showpreloader = true;

    try {
      let created = false;
      if (this.user.id === null) {
        this.afAuth.auth.signOut();
        const user = await this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.password);

        this.user.id = user.user.uid;
        this.afAuth.auth.signOut();

        const autologin = JSON.parse(localStorage.getItem('forautologin'));
        await this.afAuth.auth.signInWithEmailAndPassword(autologin.email, autologin.senha);
        created = true;
      }

      if (this.avatar.updated) {
        if (this.user.avatar !== null) {
          this.updateFileImageFile(this.user.avatar, this.avatar.image);
        } else {
          const extension = this.avatar.image.split('base64')[0].replace('data:image/', '').replace(';', '');
          const date = new Date();
          const nameimage = date.getTime().toString() + date.getMilliseconds().toString() + '.' + extension;
          this.user.avatar = await this.getFileImageFile(nameimage, this.avatar.image);
        }
      }

      if (created) {
        await this.usuarioProvider.set(this.user.id, this.user.toObject());
      } else {
        this.user.dataUpdated = new Date();
        await this.usuarioProvider.update(this.user.id, this.user.toObject());
      }

      await swal('Exito', `Representante ${created ? 'alterado' : 'cadastrado'} com sucesso!`, 'success');
      this.router.navigate(['/representantes']);
    } catch (error) {
      console.error('Erro ao salvar usuário: ', error);
      await swal('Ops!', 'De algum modo, em algum lugar, alguma coisa deu errado.', 'error');
      this.showpreloader = false;
    }
  }

  public onAvatarChange(file) {
    const modalRef = this.modalService.open(CropmodalComponent, { ariaLabelledBy: 'modal-basic-title' });

    modalRef.result.then(result => {
      this.avatar = {
        updated: true,
        image: result.image,
        val: file.name
      };
    }).catch(() => {
    });

    const fileReader = new FileReader();
    fileReader.onloadend = function (event: any) {
      const image = new Image();
      image.src = event.target.result;
      modalRef.componentInstance.init(image, 200, 200, 50, 50);
    };
    fileReader.readAsDataURL(file);
  }

  private getFileImageFile(name, image): Promise<string> {
    return new Promise(resolve => {
      const fileRef = this.storage.ref('/imagens/avatar/' + name);
      const task = fileRef.putString(image, 'data_url');
      task.snapshotChanges().pipe(
        finalize(() => fileRef.getDownloadURL().subscribe((url: string) => resolve(url)))
      ).subscribe();
    });
  }

  private updateFileImageFile(url, image) {
    this.storage.storage.refFromURL(url).putString(image, 'data_url');
  }
}
