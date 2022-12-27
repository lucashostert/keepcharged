export class Promocao {
  imagem: string;
  titulo: string;
  descricao: string;
  regra: string;
  horarios: Horarios;
  dataValidade: Date;
  local: Local;

  toLiteral() {
    return {
      imagem: this.imagem,
      titulo: this.titulo,
      descricao: this.descricao,
      regra: this.regra,
      horarios: this.horarios.toLiteral(),
      dataValidade: this.dataValidade,
      local: this.local.toLiteral()
    };
  }

  constructor() {
    this.horarios = new Horarios();
    this.local = new Local();
  }

  toPromocao(data: any) {
    this.imagem = data.imagem;
    this.titulo = data.titulo;
    this.descricao = data.descricao;
    this.regra = data.regra;
    this.horarios.toHorarios(data.horarios);
    this.dataValidade = data.dataValidade ? data.dataValidade.toDate() : null;
    if (data.local) {
      this.local.toLocal(data.local);
    }
  }
}

class Horarios {
  segunda: Turno;
  terca: Turno;
  quarta: Turno;
  quinta: Turno;
  sexta: Turno;
  sabado: Turno;
  domingo: Turno;

  constructor() {
    this.segunda = new Turno();
    this.terca = new Turno();
    this.quarta = new Turno();
    this.quinta = new Turno();
    this.sexta = new Turno();
    this.sabado = new Turno();
    this.domingo = new Turno();
  }

  toLiteral() {
    return {
      segunda: this.segunda.toLiteral(),
      terca: this.terca.toLiteral(),
      quarta: this.quarta.toLiteral(),
      quinta: this.quinta.toLiteral(),
      sexta: this.sexta.toLiteral(),
      sabado: this.sabado.toLiteral(),
      domingo: this.domingo.toLiteral(),
    };
  }

  toHorarios(data: any) {
    this.segunda.toTurno(data.segunda);
    this.terca.toTurno(data.terca);
    this.quarta.toTurno(data.quarta);
    this.quinta.toTurno(data.quinta);
    this.sexta.toTurno(data.sexta);
    this.sabado.toTurno(data.sabado);
    this.domingo.toTurno(data.domingo);
  }
}

class Turno {
  turno1: TurnoTime;
  turno2: TurnoTime;

  constructor() {
    this.turno1 = new TurnoTime();
    this.turno2 = new TurnoTime();
  }

  toLiteral() {
    return {
      turno1: this.turno1.toLiteral(),
      turno2: this.turno2.toLiteral()
    };
  }

  toTurno(data: any) {
    this.turno1.toTurnoTime(data.turno1);
    this.turno2.toTurnoTime(data.turno2);
  }
}

class TurnoTime {
  inicio: string;
  fim: string;

  constructor() {
    this.inicio = '';
    this.fim = '';
  }

  toLiteral() {
    if (!this.inicio && !this.fim) {
      return {
        inicio: null,
        fim: null
      };
    }
    return {
      inicio: this.inicio,
      fim: this.fim
    };
  }

  toTurnoTime(data: any) {
    this.inicio = data.inicio;
    this.fim = data.fim;
  }
}

class Local {
  nome: string;
  imagem: string;

  toLiteral() {
    if (!this.nome && !this.imagem) {
      return null;
    }
    return {
      nome: this.nome,
      imagem: this.imagem
    };
  }

  toLocal(data: any) {
    this.nome = data.nome;
    this.imagem = data.imagem;
  }
}