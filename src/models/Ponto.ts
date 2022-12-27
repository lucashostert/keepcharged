import { TipoCabo } from './TipoCabo';

export class AdminObservation {
  observation: string;
  date: Date | firebase.firestore.FieldValue;
  userName: string;
  userId: string;
}
export class Ponto {
  nome: string;
  email: string;
  fraseEfeito: string;
  categorias: any[];
  nomeResponsavel: string;
  wifi: boolean;
  banheiro: boolean;
  privado: boolean;
  idPlano: string;
  endereco: Endereco;
  custoCarregamentoCliente: string;
  custoCarregamentoNaoCliente: string;
  facebook: string;
  instagram: string;
  tipoContato: string;
  site: string;
  whatsApp: string;
  telefone: string;
  telefoneRepresentante: string;
  descricao: string;
  horarioAtendimento: HorarioAtendimento;
  vencimentoTesteData: Date;
  imagemCapa: string;
  imagemLogo: string;
  imagemInsta: string;
  imagemPinOnline: string;
  imagemPinOffline: string;
  imagemPinPrivado: string;
  status: number; // 0 = Desativado | 1 = Ativo | 2 = Em Teste | 3 = Atrasado | 4 = Pré cadastro
  tiposDeCabos: TipoCabo[];
  idRepresentante: string;
  idComoDescobriu: string;
  localImages: any[];
  adminObservation?: AdminObservation[];
  promoCode: string;

  constructor() {
    this.nome = null;
    this.email = null;
    this.fraseEfeito = null;
    this.categorias = [];
    this.nomeResponsavel = null;
    this.wifi = false;
    this.banheiro = false;
    this.privado = false;
    this.idPlano = null;
    this.endereco = new Endereco();
    this.custoCarregamentoCliente = null;
    this.custoCarregamentoNaoCliente = null;
    this.facebook = null;
    this.instagram = null;
    this.site = null;
    this.whatsApp = null;
    this.telefone = null;
    this.telefoneRepresentante = null;
    this.descricao = null;
    this.horarioAtendimento = new HorarioAtendimento();
    this.vencimentoTesteData = null;
    this.imagemCapa = null;
    this.imagemLogo = null;
    this.imagemInsta = null;
    this.imagemPinOnline = null;
    this.imagemPinOffline = null;
    this.imagemPinPrivado = null;
    this.status = 1;
    this.tiposDeCabos = [];
    this.idRepresentante = null;
    this.idComoDescobriu = null;
    this.localImages = [];
    this.promoCode = null;
    this.tipoContato = null;
  }

  constructorByLiteral(data: any) {
    this.nome = data.nome || null;
    this.email = data.email || null;
    this.fraseEfeito = data.fraseEfeito || null;
    this.categorias = data.categorias || [];
    this.nomeResponsavel = data.nomeResponsavel || null;
    this.wifi = data.wifi || false;
    this.banheiro = data.banheiro || false;
    this.privado = data.privado || false;
    this.idPlano = data.idPlano || null;
    this.endereco = new Endereco().constructorByLiteral(data.endereco);
    this.custoCarregamentoCliente = data.custoCarregamentoCliente || null;
    this.custoCarregamentoNaoCliente = data.custoCarregamentoNaoCliente || null;
    this.facebook = data.facebook || null;
    this.instagram = data.instagram || null;
    this.site = data.site || null;
    this.whatsApp = data.whatsApp || null;
    this.telefone = data.telefone || null;
    this.telefoneRepresentante = data.telefoneRepresentante || null;
    this.descricao = data.descricao || null;
    this.horarioAtendimento = new HorarioAtendimento().constructorByLiteral(data.horarioAtendimento);
    this.vencimentoTesteData = data.vencimentoTesteData != null ? data.vencimentoTesteData.toDate() : null;
    this.imagemCapa = data.imagemCapa || null;
    this.imagemLogo = data.imagemLogo || null;
    this.imagemInsta = data.imagemInsta || null;
    this.imagemPinOnline = data.imagemPinOnline || null;
    this.imagemPinOffline = data.imagemPinOffline || null;
    this.imagemPinPrivado = data.imagemPinPrivado || null;
    this.status = data.status || 1;
    this.tiposDeCabos = data.tiposDeCabos ? data.tiposDeCabos.map((tc) => new TipoCabo().toTipoCabo(tc)) : [];
    this.idRepresentante = data.idRepresentante || null;
    this.idComoDescobriu = data.idComoDescobriu || null;
    this.localImages = data.localImages === undefined ? [] : data.localImages;
    this.promoCode = data.promoCode || null;
    this.tipoContato = data.tipoContato || null;
    if (data.adminObservation) {
      this.adminObservation = data.adminObservation;
    }
    return this;
  }

  toLiteral() {
    const that = JSON.parse(JSON.stringify(this));
    that.tiposDeCabos = this.tiposDeCabos.map(e => e.toObject());
    delete that.id;

    return that;
  }

  static getStatus(status: any) {
    switch (status) {
      case 0:
        return 'Inativo';
      case 1:
        return 'Ativo';
      case 2:
        return 'Em Teste';
      case 3:
        return 'Atrasado';
      case 4:
        return 'Pré Cadastro';
    }
  }

  static getStatusList() {
    return [{
      id: 0,
      name: 'Inativo'
    }, {
      id: 1,
      name: 'Ativo'
    }, {
      id: 2,
      name: 'Em Teste'
    }, {
      id: 3,
      name: 'Atrasado'
    }, {
      id: 4,
      name: 'Pré Cadastro'
    }];
  }
}

export class Endereco {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  point: Geopoint;

  constructor() {
    this.cep = null;
    this.logradouro = null;
    this.numero = null;
    this.bairro = null;
    this.cidade = null;
    this.estado = null;
    this.point = new Geopoint();
  }

  constructorByLiteral(data: any) {
    this.cep = data.cep;
    this.logradouro = data.logradouro;
    this.numero = data.numero;
    this.bairro = data.bairro;
    this.cidade = data.cidade;
    this.estado = data.estado;
    this.point = new Geopoint(data.point.lat, data.point.lon);

    return this;
  }
}

export class Geopoint {
  lat: number;
  lon: number;

  constructor(lat = null, lon = null) {
    this.lat = lat;
    this.lon = lon;
  }
}

export class HorarioAtendimento {
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

  constructorByLiteral(data: any) {
    this.segunda = new Turno().constructorByLiteral(data.segunda);
    this.terca = new Turno().constructorByLiteral(data.terca);
    this.quarta = new Turno().constructorByLiteral(data.quarta);
    this.quinta = new Turno().constructorByLiteral(data.quinta);
    this.sexta = new Turno().constructorByLiteral(data.sexta);
    this.sabado = new Turno().constructorByLiteral(data.sabado);
    this.domingo = new Turno().constructorByLiteral(data.domingo);

    return this;
  }
}

export class Turno {
  turno1: TurnoTime;
  turno2: TurnoTime;

  constructor(turno1 = new TurnoTime(), turno2 = new TurnoTime()) {
    this.turno1 = turno1;
    this.turno2 = turno2;
  }

  constructorByLiteral(data: any) {
    this.turno1 = new TurnoTime().constructorByLiteral(data.turno1);
    this.turno2 = new TurnoTime().constructorByLiteral(data.turno2);

    return this;
  }
}

export class TurnoTime {
  inicio: string;
  fim: string;

  constructor(inicio = null, fim = null) {
    this.inicio = inicio;
    this.fim = fim;
  }

  constructorByLiteral(data: any) {
    if (!data) {
      return null;
    }

    this.inicio = data.inicio;
    this.fim = data.fim;

    return this;
  }
}
