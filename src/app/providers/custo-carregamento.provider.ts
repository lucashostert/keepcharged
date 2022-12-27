import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseProvider } from './firebase.provider';
import { CustoCarregamento } from 'src/models/CustoCarregamento';

@Injectable()
export class CustoCarregamentoProvider extends FirebaseProvider {
  public collectionName;

  public constructor(public db: AngularFirestore) {
    super(db, 'custoCarregamento');
    this.collectionName = 'custoCarregamento';
  }

  public async getActives() {
    const res = await this.db.firestore.collection(this.data)
      .where('status', '==', true)
      .get();

    if (!res.empty) {
      return res.docs.map((doc) => new CustoCarregamento({ id: doc.id, ...doc.data() }));
    }

    return [];
  }
}
