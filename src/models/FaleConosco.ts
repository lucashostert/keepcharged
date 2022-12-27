export class FaleConosco {
  email: string;
  endereco: { cidade: string, estado: string };
  point: any;
  nome: string;
  mensagem: string;
  telefone: string;
  status: boolean;
  observacao: string;

  toLiteral() {
    const literal = JSON.parse(JSON.stringify(this));
    if(typeof(literal.status)=="string")
    literal.status=literal.status=="true";
    return literal;
  }

  toObject(data: any) {
    this.email = data.email;
    this.nome = data.nome;
    this.telefone = data.telefone;
    this.email = data.email;
    this.status = data.status;
    this.observacao = data.observacao;
    if (data.endereco) {
      this.endereco = {
        cidade: data.endereco.cidade ? data.endereco.cidade : '', estado: data.endereco.estado ? data.endereco.estado : ''
      };
    }
    this.mensagem = data.mensagem;

  }



}
