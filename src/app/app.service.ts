import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  expedientes = new BehaviorSubject([]);
  lstExps = this.expedientes.asObservable();

  constructor(private storage: AngularFireStorage) {
    this.updateList();
  }

  updateList() {
    let obs = this.storage.ref('/expedientes/expedientes.json')
      .getDownloadURL()
      .subscribe(url => {
        fetch(url)
          .then(res => {
            return res.json();
          })
          .then(expedientes => {
            expedientes.shift();

            this.expedientes.next(expedientes)
          }).catch(err => {
            console.log('ERROR', err);
          }).finally(() => {
          });

        obs.unsubscribe();
      })
  }
}
