import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseProvider } from './firebase.provider';
import { User } from 'src/models/User';

@Injectable()
export class UsuarioProvider extends FirebaseProvider {
  public collectionName;

  constructor(public db: AngularFirestore) {
    super(db, 'usuario');
    this.collectionName = 'usuario';
  }

  public async getUsersByEmail(searchEmail) {
    const users = await this.db.firestore.collection(this.collectionName)
      .limit(10)
      .orderBy('email')
      .startAt(searchEmail)
      .endAt(`${searchEmail}\uf8ff`)
      .get();

    const array = [];
    users.forEach(element => {
      array.push(new User({ id: element.id, ...element.data() }));
    });
    return array;
  }

  public async getAllWithRole() {
    const users = await this.db.firestore.collection(this.collectionName).where('cargo', '>', '').get();
    const array = [];
    users.forEach(element => {
      array.push(new User({ id: element.id, ...element.data() }));
    });
    return array;
  }
}
