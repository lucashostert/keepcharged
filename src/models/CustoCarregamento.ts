import { defined } from './utils';

export class CustoCarregamento {
  id: string;
  status: boolean;
  nome: string;

  public constructor(data?: any) {
    this.id = defined(data) ? data.id || null : null;
    this.status = defined(data) ? data.status || true : true;
    this.nome = defined(data) ? data.nome || '' : '';
  }

  public toObject() {
    const that = JSON.parse(JSON.stringify(this));
    delete that.id;

    return that;
  }
}
