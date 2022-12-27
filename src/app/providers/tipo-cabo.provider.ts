import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseProvider } from './firebase.provider';
import { TipoCabo } from 'src/models/TipoCabo';

@Injectable()
export class TipoCaboProvider extends FirebaseProvider {
  public collectionName;

  public constructor(public db: AngularFirestore) {
    super(db, 'tiposDeCabos');
    this.collectionName = 'tiposDeCabos';
  }

  public async getActives() {
    const res = await this.db.firestore.collection(this.data)
      .where('status', '==', true)
      .get();

    if (!res.empty) {
      return res.docs.map((doc) => new TipoCabo().toTipoCabo({ id: doc.id, ...doc.data() }));
    }

    return [];
  }
}
