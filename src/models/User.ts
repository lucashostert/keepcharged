import { defined, convertToDate } from './utils';

export class User {
  id: string;
  nomeCompleto: string;
  dataNascimento: string;
  sexo: string;
  email: string;
  estado: string;
  cidade: string;
  facebook: boolean;
  dataCriacao: Date;
  dataUpdated: Date;
  passwordUpdate: boolean;
  avatar: string;
  fcmToken: string;
  status: number;
  diagnostic: any;
  preferenciaMusical: boolean[];
  cargo: string;
  cpf: string;
  ativo: boolean;
  promocode: string;

  public constructor(data?: any) {
    this.id = defined(data) ? data.id || null : null;
    this.nomeCompleto = defined(data) ? data.nomeCompleto || null : null;
    this.dataNascimento = defined(data) ? data.dataNascimento || null : null;
    this.sexo = defined(data) ? data.sexo || null : null;
    this.email = defined(data) ? data.email || null : null;
    this.estado = defined(data) ? data.estado || null : null;
    this.cidade = defined(data) ? data.cidade || null : null;
    this.facebook = defined(data) ? (defined(data.facebook) ? data.facebook : false) : false;
    this.dataCriacao = defined(data) ? convertToDate(data.dataCriacao) : null;
    this.dataUpdated = defined(data) ? convertToDate(data.dataUpdated) : null;

    this.passwordUpdate = defined(data) ? defined(data.passwordUpdate) ? data.passwordUpdate : false : false;
    this.avatar = defined(data) ? data.avatar || null : null;
    this.fcmToken = defined(data) ? data.fcmToken || null : null;
    this.status = defined(data) ? defined(data.status) ? data.status : 0 : 0;
    this.diagnostic = defined(data) ? data.diagnostic || null : null;
    this.preferenciaMusical = defined(data) ? data.preferenciaMusical || [] : [];
    this.cargo = defined(data) ? data.cargo || '' : '';
    this.cpf = defined(data) ? data.cpf || null : null;
    this.ativo = defined(data) ? defined(data.ativo) ? data.ativo : true : true;
    this.promocode = defined(data) ? data.promocode || null : null;
  }

  public toObject() {
    const that = JSON.parse(JSON.stringify(this));
    that.dataCriacao = this.dataCriacao;
    that.dataUpdated = this.dataUpdated;
    that.cpf = this.cpf.replace(/\D/g, '');
    delete that.id;

    return that;
  }
}
