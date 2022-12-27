import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirebaseProvider} from './firebase.provider';

@Injectable()
export class ContatoProvider extends FirebaseProvider {
  public collectionName;

  constructor(public db: AngularFirestore) {
    super(db, 'contato');
    this.collectionName = 'contato';
  }
}
