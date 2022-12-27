import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class PaginationProvider {
  private data;
  private lastDoc;
  private limit = 25;
  private arrayData: any[];
  private countData;

  constructor(private db: AngularFirestore) {
    this.reset();
  }

  reset() {
    this.data = '';
    this.lastDoc = null;
    this.arrayData = [];
    this.countData = 0;
  }

  start(data, refactorData = null) {
    this.data = data;

    return this.searchData(refactorData).then(() => {
      this.countData = this.arrayData.length;
    });
  }

  private searchData(refactorData = null) {
    let collection = this.db.firestore.collection(this.data).limit(this.limit);

    if (this.lastDoc != null) {
      collection = collection.startAfter(this.lastDoc);
    }

    return collection.get().then(snapshot => {
      this.lastDoc = snapshot.docs[snapshot.docs.length - 1];

      snapshot.forEach(v => {
        if (refactorData == null) {
          this.arrayData.push({ id: v.id, ...v.data() });
        } else {
          this.arrayData.push(refactorData({ id: v.id, ...v.data() }));
        }
      });

      if (snapshot.docs.length === this.limit) {
        return this.searchData(refactorData);
      }

      return Promise.resolve(null);
    });
  }

  public getData() {
    return this.arrayData;
  }

  public setData(data) {
    this.arrayData = data;
  }
}
