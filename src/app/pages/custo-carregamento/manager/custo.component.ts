import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustoCarregamento } from 'src/models/CustoCarregamento';
import { CustoCarregamentoProvider } from 'src/app/providers/custo-carregamento.provider';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidator } from 'src/app/utils/validator/FormValidator';
import swal from 'sweetalert';

@Component({
  selector: 'app-custo',
  templateUrl: './custo.component.html',
  styleUrls: ['./custo.component.scss']
})
export class CustoComponent extends FormValidator implements OnInit {
  @ViewChild('custoForm') _form: NgForm;

  public showpreloader = false;
  public custoCarregamento = new CustoCarregamento();

  public constructor(
    private custoCarregamentoProvider: CustoCarregamentoProvider,
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  public async ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.showpreloader = true;

      const doc: any = await this.custoCarregamentoProvider.getById(this.route.snapshot.paramMap.get('id'));
      if (doc === null) {
        this.router.navigate(['/custocarregamento']);
      } else {
        this.custoCarregamento = new CustoCarregamento(doc);
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
      if (this.custoCarregamento.id === null) {
        await this.custoCarregamentoProvider.add(this.custoCarregamento.toObject());
      } else {
        await this.custoCarregamentoProvider.update(this.custoCarregamento.id, this.custoCarregamento.toObject());
      }

      await swal('Exito', `Custo de Carregamento ${this.custoCarregamento.id === null ? 'cadastrado' : 'alterado'} com sucesso!`, 'success');
      this.router.navigate(['/custocarregamento']);
    } catch (err) {
      console.error('Erro ao salvar custo de carregamento: ', err);
      await swal('Ops!', 'De algum modo, em algum lugar, alguma coisa deu errado.', 'error');
    }

    this.showpreloader = false;
  }
}
