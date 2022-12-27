import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirebaseProvider} from './firebase.provider';

@Injectable()
export class comoDescobriuProvider extends FirebaseProvider {
  public collectionName;

  constructor(public db: AngularFirestore) {
    super(db, 'comoDescobriu');
    this.collectionName = 'comoDescobriu';
  }
}
