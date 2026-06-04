import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, startWith, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  collection, collectionData, doc,
  Firestore, getDoc, getDocs, orderBy,
  query, setDoc, updateDoc, where,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
import {
  Auth, user, signInWithEmailAndPassword,
  signOut, createUserWithEmailAndPassword
} from '@angular/fire/auth';

import { Usuario } from './_interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private auth = inject(Auth);
  private db = inject(Firestore);

  private bsExps = new BehaviorSubject([]);
  public expedientes = this.bsExps.asObservable();

  public usuario$ = user(this.auth);

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


  // 1. Login

  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  // 2. Logout

  logout() {
    return signOut(this.auth);
  }

  // 3. Registro y Dar de Alta

  async registrarUsuario(data: {
    nombre: string,
    nick: string,
    email: string,
    password: string,

    rol: string,
    departamento: string,
  }) {
    const credencial = await createUserWithEmailAndPassword(this.auth, data.email, data.password);
    const uid = credencial.user.uid;
    const docRef = doc(this.db, `usuarios/${uid}`);

    await setDoc(docRef, {
      uid,
      nombre: data.nombre,
      nick: data.nick,
      rol: data.rol,
      departamento: data.departamento,
      email: data.email,
      emailVerificado: false,
      password: data.password,
      esActivo: true,
      fechaRegistro: new Date().getTime(),
      fechaRetiro: null,
    });
  }

  // 4. Listado de usuarios activos SNAPSHOT

  async usuariosActivos(): Promise<Usuario[]> {
    const usuariosRef = collection(this.db, 'usuarios');
    const q = query(usuariosRef,
      where('esActivo', '==', true),
      orderBy('nombre', 'asc')
    );

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Usuario;
        })
        .filter(usuario => usuario.rol !== 'admin');

    } catch (error) {
      console.log('Error obteniendo usuarios', error);
      return [];
    }
  }

  // 5. Listado de usuarios activos STREAM
  usuariosActivosStream(): Observable<Usuario[]> {
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

  // 6. Listado de usuarios inactivos con maximo 90 dias SNAPSHOT

  async usuariosInactivos(): Promise<Usuario[]> {
    const hoyMs = new Date().getTime();
    const noventaDiasEnMs = 90 * 24 * 60 * 60 * 1000;
    const tiempoLimite = hoyMs - noventaDiasEnMs;

    const usuariosRef = collection(this.db, 'usuarios');
    const q = query(usuariosRef,
      where('esActivo', '==', false),
      where('fechaRetiro', '>=', tiempoLimite),
      orderBy('fechaRetiro', 'desc')
    );

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Usuario;
        })

    } catch (error) {
      console.log('Error obteniendo usuarios inactivos', error);
      return [];
    }
  }

  // 7. Listado de usuarios inactivos con maximo 90 dias STREAM

  usuariosInactivosStream(): Observable<Usuario[]> {
    const hoyMs = new Date().getTime();
    const noventaDiasEnMs = 90 * 24 * 60 * 60 * 1000;
    const tiempoLimite = hoyMs - noventaDiasEnMs;

    const usuariosRef = collection(this.db, 'usuarios');
    const q = query(usuariosRef,
      where('esActivo', '==', false),
      where('fechaRetiro', '>=', tiempoLimite),
      orderBy('fechaRetiro', 'desc')
    );

    return (collectionData(q, { idField: 'id' }) as Observable<Usuario[]>).pipe(
      startWith([]),
    );
  }

  // 8. Listado de usuario asistentes de un departamento SNAPSHOT

  async usuariosAsistentes(departamento: string): Promise<Usuario[]> {
    const usuariosRef = collection(this.db, 'usuarios');
    const q = query(usuariosRef,
      where('esActivo', '==', true),
      where('departamento', '==', departamento),
      where('rol', '==', 'asistente'),
      orderBy('nombre', 'asc')
    );

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Usuario;
        })

    } catch (error) {
      console.log('Error obteniendo asistentes', error);
      return [];
    }
  }

  // 9. Detalles de usuario individual SNAPSHOT

  async usuario(uid: string): Promise<Usuario | null> {
    const docRef = doc(this.db, `usuarios/${uid}`);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          // id: docSnap.id, 
          ...docSnap.data()
        } as Usuario;
      }

      console.warn(`El usuario con UID: ${uid} no existe.`);
      return null;

    } catch (error) {
      console.error('Error al obtener el usuario:', error);
      return null;
    }
  }

  // 10. Dar de baja a usuario

  async darDeBaja(uid: string) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      esActivo: false,
      fechaRetiro: new Date().getTime(),
    })
  }

  // 11. Dar de alta a usuario

  async darDeAlta(uid: string) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      esActivo: true,
      fechaRetiro: null
    })
  }

  // 12. Modificar Datos: Rol y Departamento

  async modificarRol(uid: string, data: { rol: string, departamento: string }) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      rol: data.rol,
      departamento: data.departamento
    })
  }

  // 13. Cambiar de Nombre

  async cambiarNombre(uid: string, nuevoNombre: string) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      nombre: nuevoNombre,
    })
  }

}
