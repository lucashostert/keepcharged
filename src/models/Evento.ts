export class Evento {
  imagem: string;
  dataDoEvento: Date;
  link: string;

  toLiteral() {
    const literal = JSON.parse(JSON.stringify(this));
    literal.dataDoEvento = new Date(literal.dataDoEvento);
    return literal;
  }

  toEvento(data: any) {
    this.imagem = data.imagem;
    this.dataDoEvento = data.dataDoEvento;
    this.link = data.link;
  }
}
