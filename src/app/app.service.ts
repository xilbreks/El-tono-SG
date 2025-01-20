import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private bsExps = new BehaviorSubject([]);
  public expedientes = this.bsExps.asObservable();

  constructor(private storage: AngularFireStorage) {
    this.getExpedientes();
  }

  public getExpedientes() {
    this.storage.ref('/expedientes/expedientes.json')
      .getDownloadURL()
      .subscribe(url => {
        fetch(url)
          .then(res => {
            return res.json();
          })
          .then(expedientes => {
            this.bsExps.next(expedientes)
          }).catch(err => {
            console.log('ERROR', err);
          });

      })
  }

}
