import { AngularFirestore } from '@angular/fire/firestore';

export class FirebaseProvider {
  constructor(
    public db: AngularFirestore,
    public data: string) {
  }

  public add(data) {
    delete data.id;
    return this.db.firestore.collection(this.data).add(data);
  }

  public getById(id) {
    return this.db.firestore.collection(this.data).doc(id).get().then(doc => {
      return doc.exists ? { id: doc.id, ...doc.data() } : null;
    });
  }

  public update(id, data) {
    delete data.id;
    return this.db.firestore.collection(this.data).doc(id).update(data);
  }

  public set(id, data) {
    delete data.id;
    return this.db.firestore.collection(this.data).doc(id).set(data);
  }

  public getWhere(field, operator, value) {
    return this.db.firestore.collection(this.data).where(field, operator, value).get();
  }

  public getWhereOrderBy(field, operator, value, orderBy) {
    return this.db.firestore.collection(this.data).where(field, operator, value).orderBy(orderBy).get();
  }
}
