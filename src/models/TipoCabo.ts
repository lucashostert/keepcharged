export class TipoCabo {
  id: string;
  status: boolean;
  nome: string;

  public constructor() {
    this.id = null;
    this.status = true;
    this.nome = '';
  }

  public toTipoCabo(data: any) {
    this.id = data.id;
    this.status = data.status;
    this.nome = data.nome;

    return this;
  }

  public toObject() {
    const that = JSON.parse(JSON.stringify(this));
    delete that.id;

    return that;
  }
}
