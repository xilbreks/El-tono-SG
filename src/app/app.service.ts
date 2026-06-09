import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, startWith, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  collection, collectionData, doc,
  Firestore, getDoc, getDocs, orderBy,
  query, setDoc, updateDoc, where,
  limit, QueryDocumentSnapshot
} from '@angular/fire/firestore';
import {
  Auth, user, signInWithEmailAndPassword,
  signOut, createUserWithEmailAndPassword
} from '@angular/fire/auth';

import { Usuario } from './_interfaces/usuario';
import { Tareo } from './_interfaces/tareo';
import { Tarea } from './_interfaces/tarea';
import { Cuota } from './_interfaces/cuota';
import { Abono } from './_interfaces/abono';
import { Expediente } from './_interfaces/expediente';
import { Changelog } from './_interfaces/changelog';

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


  // A.1 - Login

  login(email: string, pass: string) {
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  // A.2 - Logout

  logout() {
    return signOut(this.auth);
  }

  // A.3 - Registro y Dar de Alta

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

  // A.4 - Listado de usuarios activos SNAPSHOT

  async usuariosActivos(): Promise<Usuario[]> {
    const ref = collection(this.db, 'usuarios');
    const q = query(ref,
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

  // A.5 - Listado de usuarios activos STREAM
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

  // A.6 - Listado de usuarios inactivos con maximo 90 dias SNAPSHOT

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

  // A.7 - Listado de usuarios inactivos con maximo 90 dias STREAM

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

  // A.8 - Listado de usuario asistentes de un departamento SNAPSHOT

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

  // A.9 - Detalles de usuario individual SNAPSHOT

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

  // A.10 - Dar de baja a usuario

  async darDeBaja(uid: string) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      esActivo: false,
      fechaRetiro: new Date().getTime(),
    })
  }

  // A.11 - Dar de alta a usuario

  async darDeAlta(uid: string) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      esActivo: true,
      fechaRetiro: null
    })
  }

  // A.12 - Modificar Datos: Rol y Departamento

  async modificarRol(uid: string, data: { rol: string, departamento: string }) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      rol: data.rol,
      departamento: data.departamento
    })
  }

  // A.13 - Cambiar de Nombre

  async cambiarNombre(uid: string, nuevoNombre: string) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      nombre: nuevoNombre,
    })
  }

  // B.1 Leer tareo individual
  async tareo(idTareo: string): Promise<Tareo | null> {
    const ref = doc(this.db, `tareo/${idTareo}`);

    try {
      const snapshot = await getDoc(ref);

      if (!snapshot.exists()) return null;

      return {
        // id: docSnap.id, 
        ...snapshot.data()
      } as Tareo;

    } catch (error) {
      console.log('Error obteniendo tareo', error);
      return null;
    }
  }

  // B.2 Leer lista de tareos de un usuario
  async tareos(inicio: string, final: string, nick: string): Promise<Tareo[]> {
    const ref = collection(this.db, 'tareo');
    const q = query(ref,
      where('fecha', '>=', inicio),
      where('fecha', '<=', final),
      where('idUsuario', '==', nick),
    );

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Tareo;
        })

    } catch (error) {
      console.log('Error obteniendo tareo', error);
      return [];
    }
  }

  // B.3 - Registrar Tareo individual

  async registrarTareo(idTareo: string, tareo: Tareo): Promise<void> {
    const ref = doc(this.db, 'tareo', idTareo);
    try {
      await setDoc(ref, tareo);
    } catch (error) {
      console.log('ocurrio un error al registrar tareo');
    }
  }

  // C.1 Leer tareas agrupados por Tareo

  async tareas(idTareo: string): Promise<Tarea[]> {
    const ref = collection(this.db, 'tareas');
    const q = query(ref,
      where('idTareo', '==', idTareo),
    );

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Tarea;
        })

    } catch (error) {
      console.log('Error obteniendo tareas', error);
      return [];
    }
  }

  // C.2 Leer tareas agrupados por Expediente

  async tareasExpediente(idExpediente: string, max: number): Promise<Tarea[]> {
    const ref = collection(this.db, 'tareas');
    const q = query(ref,
      where('idExpediente', '==', idExpediente),
      orderBy('fechaTarea', 'desc'),
      limit(max),
    );

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Tarea;
        })

    } catch (error) {
      console.log('Error obteniendo tareas', error);
      return [];
    }
  }

  // D.1 Leer cuotas/vencimientos para el planner

  async plannerVencimientos(inicio: string, final: string): Promise<Cuota[]> {
    const ref = collection(this.db, 'cuotas');
    const q = query(ref,
      where('vencimiento', '>=', inicio),
      where('vencimiento', '<=', final)
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Cuota;
        })

    } catch (error) {
      console.log('Error obteniendo cuotas', error);
      return [];
    }
  }

  // E.1 Actualizar datos expediente, true = ok, false = error

  async actualizarExpediente(idExpediente: string, payload: Partial<Expediente>): Promise<boolean> {
    const ref = doc(this.db, 'expedientes', idExpediente);

    try {
      await updateDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('error al actualizar expediente');
      return false;
    }
  }

  // E.2 Leer datos del expediente por numero

  async expedientePorNumero(numero: string): Promise<Expediente[]> {
    const ref = collection(this.db, 'expedientes');
    const q = query(ref,
      where('numero', '==', numero),
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Expediente;
        })

    } catch (error) {
      console.log('Error buscando expediente', error);
      return [];
    }
  }

  // E.3 Leer datos del expediente por numero

  async expedientePorNumeroProvisional(numero: string): Promise<Expediente[]> {
    const ref = collection(this.db, 'expedientes');
    const q = query(ref,
      where('numeroProvisional', '==', numero),
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Expediente;
        })

    } catch (error) {
      console.log('Error buscando expediente', error);
      return [];
    }
  }

  // E.4 Encontrar expedientes asociados al principal

  async expedientesAsociados(numero: string): Promise<Expediente[]> {
    const ref = collection(this.db, 'expedientes');
    const q = query(ref,
      where('numeroPrincipal', '==', numero),
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Expediente;
        })
        .sort((a, b) => a.numero > b.numero ? -1 : 1)

    } catch (error) {
      console.log('Error buscando expediente', error);
      return [];
    }
  }

  // F.1 Leer abonos segun rango de fecha

  async abonosRangoFecha(inicio: string, final: string): Promise<Abono[]> {
    const ref = collection(this.db, 'abonos');
    const q = query(ref,
      where('fecha', '>=', inicio),
      where('fecha', '<=', final)
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Abono;
        })

    } catch (error) {
      console.log('Error obteniendo abonos', error);
      return [];
    }
  }

  // G.1 - Registrar nuevo documento de Changelog, true = ok, false = error

  async registrarChangelog(idChangelog: string, payload: Changelog): Promise<boolean> {
    const ref = doc(this.db, 'changelog', idChangelog);

    try {
      await setDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('ocurrio un error al registrar changelog');
      return false;
    }
  }

}
