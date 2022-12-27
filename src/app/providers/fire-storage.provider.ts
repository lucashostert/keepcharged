import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class FireStorageProvider {
  constructor(private storage: AngularFireStorage) {
  }

  public uploadImageData(imagedata, extension, path) {
    const date = new Date();
    const nameimage = `${date.getTime()}${date.getMilliseconds()}${Math.floor((Math.random() * 10000000) + 1)}.${extension}`;
    return new Promise(resolve => {
      const fileRef = this.storage.ref(`/imagens/${path}/${nameimage}`);
      const task = fileRef.putString(imagedata, 'data_url');
      task.snapshotChanges().pipe(finalize(() => fileRef.getDownloadURL().subscribe(url => resolve(url)))).subscribe();
    });
  }
  public updateImageDataFromURL(url, imagedata) {
    var storageRef = null;
    if (url && url.length < 300) {
      storageRef = firebase.storage().refFromURL(url);
      storageRef.putString(imagedata, 'data_url');
    }
    else
      this.storage.storage.refFromURL(url).putString(imagedata, 'data_url');
  }

  public deleteImageFromURL(url) {
    return firebase.storage().refFromURL(url).delete();
  }

  public readFileAsDataURL(file) {
    return new Promise(resolve => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    });
  }
}
