import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private bsExpsActivos = new BehaviorSubject([]);
  private bsExpsDepurados = new BehaviorSubject([]);

  public lstExpsActivos = this.bsExpsActivos.asObservable();
  public lstExpsDepurados = this.bsExpsDepurados.asObservable();

  constructor(private storage: AngularFireStorage) {
    this.getExpsActivos();
    this.getExpsDepurados();
  }

  public getExpsActivos() {
    this.storage.ref('/expedientes/expedientes.json')
      .getDownloadURL()
      .subscribe(url => {
        fetch(url)
          .then(res => {
            return res.json();
          })
          .then(expedientes => {
            this.bsExpsActivos.next(expedientes)
          }).catch(err => {
            console.log('ERROR', err);
          });

      })
  }

  public getExpsDepurados() {
    this.storage.ref('/expedientes/expedientes-depurados.json')
      .getDownloadURL()
      .subscribe(url => {
        fetch(url)
          .then(res => {
            return res.json();
          })
          .then(expedientes => {
            this.bsExpsDepurados.next(expedientes)
          }).catch(err => {
            console.log('ERROR', err);
          });

      })
  }
}
