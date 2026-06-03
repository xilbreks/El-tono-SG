import { Injectable, inject } from '@angular/core';
import {
  Auth, user, signInWithEmailAndPassword,
  signOut, createUserWithEmailAndPassword
} from '@angular/fire/auth';
import {
  Firestore, doc, setDoc, collection,
  collectionData, updateDoc,
  query, where, orderBy,
  getDoc, getDocs
} from '@angular/fire/firestore';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private db = inject(Firestore);

  user$ = user(this.auth);

  constructor() {
    // console.log('soy el servicio')
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

  // 4. Listado de usuarios activos

  getUsuariosActivos() {
    const usuariosRef = collection(this.db, 'usuarios');
    const q = query(usuariosRef,
      where('esActivo', '==', true),
      orderBy('nombre', 'asc')
    );
    return getDocs(q);
  }

  // 5. Listado de usuarios inactivos con maximo 90 dias

  getUsuariosInactivos() {
    const hoyMs = new Date().getTime();
    const noventaDiasEnMs = 90 * 24 * 60 * 60 * 1000;
    const tiempoLimite = hoyMs - noventaDiasEnMs;

    const usuariosRef = collection(this.db, 'usuarios');
    const q = query(usuariosRef,
      where('esActivo', '==', false),
      where('fechaRetiro', '>=', tiempoLimite),
      orderBy('fechaRetiro', 'desc')
    );

    return getDocs(q);
  }

  // 6. Detalles de usuario individual

  getUsuario(uid: string) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    return getDoc(docRef);
  }

  // 7. Dar de baja a usuario

  async darDeBaja(uid: string) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      esActivo: false,
      fechaRetiro: new Date().getTime(),
    })
  }

  // 8. Dar de alta a usuario

  async darDeAlta(uid: string) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      esActivo: true,
      fechaRetiro: null
    })
  }

  // 9. Modificar Datos: Rol y Departamento

  async modificarDatos(uid: string, data: { rol: string, departamento: string }) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      rol: data.rol,
      departamento: data.departamento
    })
  }

  // 10. Cambiar de Nombre

  async cambiarNombre(uid: string, nuevoNombre: string) {
    const docRef = doc(this.db, `usuarios/${uid}`);
    await updateDoc(docRef, {
      nombre: nuevoNombre,
    })
  }

  // 11. Listado de usuario activos de un area

  getUsuariosAsistentes(departamento: string) {
    const usuariosRef = collection(this.db, 'usuarios');
    const q = query(usuariosRef,
      where('esActivo', '==', true),
      where('departamento', '==', departamento),
      where('rol', '==', 'asistente'),
      orderBy('nombre', 'asc')
    );
    return getDocs(q);
  }

}
