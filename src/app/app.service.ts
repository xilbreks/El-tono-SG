import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, startWith, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Usuario } from './_interfaces/usuario';
import {
  collection, collectionData, Firestore, orderBy, query, where
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private bsExps = new BehaviorSubject([]);
  public expedientes = this.bsExps.asObservable();

  db = inject(Firestore);

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

  /**
   * Listado de usuarios activos de la app (sin el admin)
   */
  obtenerUsuariosActivos(): Observable<Usuario[]> {
    const colRef = collection(this.db, 'usuarios');
    const q = query(
      colRef,
      where('esActivo', '==', true),
      orderBy('nombre', 'asc')
    );

    return (collectionData(q, { idField: 'id' }) as Observable<Usuario[]>).pipe(
      startWith([]),
      map((usuarios: Usuario[]) => {
        return usuarios.filter(u => u.rol != 'admin');
      })
    );
  }

  /**
   * Listado de usuarios inactivos de la app
   */
  obtenerUsuariosInactivos(): Observable<Usuario[]> {
    const colRef = collection(this.db, 'usuarios');
    const q = query(
      colRef,
      where('esActivo', '==', false),
      orderBy('nombre', 'asc')
    );

    return (collectionData(q, { idField: 'id' }) as Observable<Usuario[]>).pipe(
      startWith([]),
    );
  }

}
