import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirebaseProvider} from './firebase.provider';

@Injectable()
export class PromocaoProvider extends FirebaseProvider {
  public collectionName;

  constructor(public db: AngularFirestore) {
    super(db, 'promocao');
    this.collectionName = 'promocao';
  }
}
