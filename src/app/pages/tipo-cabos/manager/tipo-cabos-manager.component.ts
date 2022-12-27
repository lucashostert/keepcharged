import { Component, OnInit, ViewChild } from '@angular/core';
import { FormValidator } from 'src/app/utils/validator/FormValidator';
import { TipoCabo } from 'src/models/TipoCabo';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoCaboProvider } from 'src/app/providers/tipo-cabo.provider';
import swal from 'sweetalert';

@Component({
  selector: 'app-tipo-cabos-manager',
  templateUrl: './tipo-cabos-manager.component.html',
  styleUrls: ['./tipo-cabos-manager.component.scss']
})
export class TipoCabosManagerComponent extends FormValidator implements OnInit {
  @ViewChild('tipoCaboForm') _form: NgForm;

  public showpreloader = false;
  public tipoCabo = new TipoCabo();

  public constructor(
    private tipoCaboProvider: TipoCaboProvider,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  public async ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.showpreloader = true;

      const doc: any = await this.tipoCaboProvider.getById(this.route.snapshot.paramMap.get('id'));
      if (doc === null) {
        this.router.navigate(['/tipocabos']);
      } else {
        this.tipoCabo.toTipoCabo(doc);
        this.showpreloader = false;
      }
    }
  }

  public async save() {
    if (this.formInvalid()) {
      swal('Ops!', 'Verifique os campos!', 'error');
      return;
    }

    this.showpreloader = true;

    try {
      if (this.tipoCabo.id === null) {
        await this.tipoCaboProvider.add(this.tipoCabo.toObject());
      } else {
        await this.tipoCaboProvider.update(this.tipoCabo.id, this.tipoCabo.toObject());
      }

      await swal('Exito', `Cabo ${this.tipoCabo.id === null ? 'cadastrado' : 'alterado'} com sucesso!`, 'success');
      this.router.navigate(['/tipocabos']);
    } catch (err) {
      console.error('Erro ao salvar tipo de cabo: ', err);
      await swal('Ops!', 'De algum modo, em algum lugar, alguma coisa deu errado.', 'error');
    }

    this.showpreloader = false;
  }
}
