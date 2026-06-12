import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, startWith, Observable } from 'rxjs';
import {
  collection, collectionData, doc,
  Firestore, getDoc, getDocs, orderBy,
  query, setDoc, updateDoc, where,
  limit, QueryDocumentSnapshot,
  deleteDoc,
} from '@angular/fire/firestore';
import {
  Storage, ref, uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
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
import { Cita } from './_interfaces/cita';
import { Audiencia } from './_interfaces/audiencia';
import { Arancel } from './_interfaces/arancel';
import { Resolucion } from './_interfaces/resolucion';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private auth = inject(Auth);
  private storage = inject(Storage);
  private db = inject(Firestore);

  private bsExps = new BehaviorSubject([]);
  public expedientes = this.bsExps.asObservable();

  public usuario$ = user(this.auth);

  constructor() {
    this.getExpedientes();
  }

  public getExpedientes() {
    const fileRef = ref(this.storage, '/expedientes/expedientes.json');
    getDownloadURL(fileRef)
      .then((url) => {
        return fetch(url);
      })
      .then((res) => res.json())
      .then((expedientes) => {
        this.bsExps.next(expedientes);
      })
      .catch((err) => {
        console.error('ERROR al obtener expedientes:', err);
      });
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
    const docRef = doc(this.db, 'usuarios', uid);

    try {
      const docSnap = await getDoc(docRef);
      // const docSnap = await runInInjectionContext(this.injector, () => getDoc(docRef));

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
    const ref = doc(this.db, 'tareo', idTareo);

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

  // B.3 Leer lista de tareos de un usuario

  async tareosPorUsuario(nick: string): Promise<Tareo[]> {
    const ref = collection(this.db, 'tareo');
    const q = query(ref,
      where('idUsuario', '==', nick),
      orderBy('fecha', 'desc'),
      limit(25),
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
        .map((obj: any) => {
          return {
            ...obj,
            horaIngreso: obj.entradaHora,
            minutoIngreso: obj.entradaMinuto,
            horaSalida: obj.salidaHora,
            minutoSalida: obj.salidaMinuto,
          }
        })

    } catch (error) {
      console.log('Error obteniendo tareo', error);
      return [];
    }
  }

  // B.4 Leer lista de tareos de un dia en especifico

  async tareosPorFecha(fecha: string): Promise<Tareo[]> {
    const ref = collection(this.db, 'tareo');
    const q = query(ref,
      where('fecha', '==', fecha),
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
        .map((obj: any) => {
          return {
            ...obj,
            horaIngreso: obj.entradaHora,
            minutoIngreso: obj.entradaMinuto,
            horaSalida: obj.salidaHora,
            minutoSalida: obj.salidaMinuto,
          }
        })

    } catch (error) {
      console.log('Error obteniendo tareo', error);
      return [];
    }
  }

  // B.5 - Registrar Tareo individual

  async registrarTareo(idTareo: string, tareo: Tareo): Promise<void> {
    const ref = doc(this.db, 'tareo', idTareo);
    try {
      await setDoc(ref, tareo);
    } catch (error) {
      console.log('ocurrio un error al registrar tareo');
    }
  }

  // B.6 - Actualizar documento de Tareo

  async actualizarTareo(idTareo: string, payload: Partial<Tareo>): Promise<boolean> {
    const ref = doc(this.db, 'tareo', idTareo);
    try {
      await updateDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('ocurrio un error al registrar tareo', error);
      return false;
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

  async expedientePorID(idExpediente: string): Promise<Expediente[]> {
    const ref = collection(this.db, 'expedientes');
    const q = query(ref,
      where('idExpediente', '==', idExpediente),
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
      console.log('Error buscando expediente por ID', error);
      return [];
    }
  }

  // E.3 Leer datos del expediente por numero

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

  // E.4 Leer datos del expediente por numero

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

  // E.5 Encontrar expedientes asociados al principal

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

  // E.6 - Leer todo los expedientes, todos

  async expedientesTodos(): Promise<Expediente[]> {
    const ref = collection(this.db, 'expedientes');
    const q = query(ref);

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
      console.log('Error leyendo los expedientes', error);
      return [];
    }
  }

  // E.7 - Registrar nuevo expediente

  async registrarExpediente(idExpediente: string, payload: Expediente): Promise<boolean> {
    const ref = doc(this.db, 'expedientes', idExpediente);

    try {
      await setDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('ocurrio un error al registrar expediente');
      return false;
    }
  }

  // E.8 - Verificar si existe expediente

  async existeExpediente(numero: string): Promise<boolean> {
    const ref = collection(this.db, 'expedientes');
    const q = query(ref,
      where('numero', '==', numero),
    )

    try {
      const querySnapshot = await getDocs(q);

      return !querySnapshot.empty;
    } catch (error) {
      console.error('Error al verificar si existe el expediente:', error);
      return true;
    }
  }

  // E.9 - Generar numero correlativo de expediente

  async generarNuevoIdExpediente(): Promise<string> {
    const ref = collection(this.db, 'expedientes');
    const q = query(ref,
      orderBy('idExpediente', 'desc'),
      limit(1),
    );

    try {
      const querySnapshot = await getDocs(q);

      // Si la colección está vacía (primer expediente de la historia)
      if (querySnapshot.empty) {
        return 'E000001';
      }

      const ultimoDoc = querySnapshot.docs[0].data();
      const ultimoId = ultimoDoc['idExpediente'];

      // Extrae el número, sumamos 1 y formateamos con ceros a la izquierda usando padStart
      const numeroActual = Number(ultimoId.slice(1, 7));
      const siguienteNumero = numeroActual + 1;

      // padStart(6, '0') asegura que el número tenga 6 dígitos, rellenando con '0' si hace falta
      const idExpediente = `E${String(siguienteNumero).padStart(6, '0')}`;

      return idExpediente;

    } catch (error) {
      console.error('Error al generar el nuevo ID de expediente:', error);
      throw error;
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

  // H.1 - Listar las citas de un expediente

  async citasPorExpediente(numero: string): Promise<Cita[]> {
    const ref = collection(this.db, 'citas');
    const q = query(ref,
      where('sexpediente', '==', numero),
      orderBy('idcita', 'desc'),
      limit(10)
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Cita;
        })
        .map(cita => {
          let sDay = cita.sfecha.slice(8, 10);
          let sMonth = cita.sfecha.slice(5, 7);
          let sYear = cita.sfecha.slice(0, 4);
          return {
            ...cita,
            sfechauser: sDay + '/' + sMonth + '/' + sYear,
          }
        })
        .sort((a, b) => {
          let sfecha1 = a.sfecha + '-' + a.shora;
          let sfecha2 = b.sfecha + '-' + b.shora;
          return sfecha1 > sfecha2 ? -1 : 1;
        });

    } catch (error) {
      console.log('Error buscando citas', error);
      return [];
    }
  }

  // H.2 - Registrar nueva cita

  async registrarCita(idCita: string, payload: Cita): Promise<boolean> {
    const ref = doc(this.db, 'citas', idCita);

    try {
      await setDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('ocurrio un error al registrar cita');
      return false;
    }
  }

  // H.3 - Actualizar cita

  async actualizarCita(idCita: string, payload: Partial<Cita>): Promise<boolean> {
    const ref = doc(this.db, 'citas', idCita);

    try {
      await updateDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('error al actualizar cita');
      return false;
    }
  }

  // H.4 - Eliminar Cita

  async eliminarCita(idCita: string): Promise<boolean> {
    const ref = doc(this.db, 'citas', idCita);

    try {
      await deleteDoc(ref);
      return true;
    } catch (error) {
      console.log('error al actualizar cita');
      return false;
    }
  }

  // H.5 - Listar las citas por rango de fecha

  async citasPorRangoFecha(inicio: string, final: string): Promise<Cita[]> {
    const ref = collection(this.db, 'citas');
    const q = query(ref,
      where('sfecha', '>=', inicio),
      where('sfecha', '<=', final),
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Cita;
        })
        .map(cita => {
          let sDay = cita.sfecha.slice(8, 10);
          let sMonth = cita.sfecha.slice(5, 7);
          let sYear = cita.sfecha.slice(0, 4);

          // Colocar nombre a los dias y el mes
          let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
          let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
          let fecha = new Date(`${cita.sfecha}T00:00`);
          let numeroDiaSemana = fecha.getUTCDay();
          let numeroMes = fecha.getMonth();
          let nombreDia = dias[numeroDiaSemana];
          let nombreMes = meses[numeroMes];

          return {
            ...cita,
            sfechauser: sDay + '/' + sMonth + '/' + sYear,
            scliente: cita.scliente.toUpperCase(),
            nombreDia,
            numeroDia: sDay,
            nombreMes,
          }
        }).sort((a, b) => {
          let sfecha1 = a.sfecha + '-' + a.shora;
          let sfecha2 = b.sfecha + '-' + b.shora;
          return sfecha1 < sfecha2 ? -1 : 1;
        });

    } catch (error) {
      console.log('Error buscando citas', error);
      return [];
    }
  }

  // I.1 - Listar Audiencias

  async audienciasPorExpediente(numero: string): Promise<Audiencia[]> {
    const ref = collection(this.db, 'audiencias');
    const q = query(ref,
      where('sexpediente', '==', numero),
      limit(10),
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Audiencia;
        })
        .map(cita => {
          let sDay = cita.sfecha.slice(8, 10);
          let sMonth = cita.sfecha.slice(5, 7);
          let sYear = cita.sfecha.slice(0, 4);
          return {
            ...cita,
            sfechauser: sDay + '/' + sMonth + '/' + sYear,
          }
        })
        .sort((a, b) => {
          let sfecha1 = a.sfecha + '-' + a.shora;
          let sfecha2 = b.sfecha + '-' + b.shora;
          return sfecha1 > sfecha2 ? -1 : 1;
        });

    } catch (error) {
      console.log('Error buscando audiencias', error);
      return [];
    }
  }

  // I.2 - Registrar nueva audiencia

  async registrarAudiencia(idAudiencia: string, payload: Audiencia): Promise<boolean> {
    const ref = doc(this.db, 'audiencias', idAudiencia);

    try {
      await setDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('ocurrio un error al registrar audiencia');
      return false;
    }
  }

  // I.3 - Actualizar audiencia

  async actualizarAudiencia(idAudiencia: string, payload: Partial<Audiencia>): Promise<boolean> {
    const ref = doc(this.db, 'audiencias', idAudiencia);

    try {
      await updateDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('error al actualizar audiencia');
      return false;
    }
  }

  // I.4 - Eliminar audiencia

  async eliminarAudiencia(idAudiencia: string): Promise<boolean> {
    const ref = doc(this.db, 'audiencias', idAudiencia);

    try {
      await deleteDoc(ref);
      return true;
    } catch (error) {
      console.log('error al actualizar audiencia');
      return false;
    }
  }

  // I.5 - Listar Audiencias por rango fecha

  async audienciasPorRangoFecha(inicio: string, final: string): Promise<Audiencia[]> {
    const ref = collection(this.db, 'audiencias');
    const q = query(ref,
      where('sfecha', '>=', inicio),
      where('sfecha', '<=', final)
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Audiencia;
        })
        .map(audiencia => {
          // Fecha mas legible
          let sDay = audiencia.sfecha.slice(8, 10);
          let sMonth = audiencia.sfecha.slice(5, 7);
          let sYear = audiencia.sfecha.slice(0, 4);

          // Detecion de enlace meet en el url
          const regexMeet = /meet\.google\.com\/[a-z]{3}-{0,1}[a-z]{4}-{0,1}[a-z]{3}/i;
          let prefijo = audiencia.surl;
          let cuerpo = '';
          let sufijo = '';
          const texto: string = audiencia.surl;
          const enlace: RegExpMatchArray | null = texto.match(regexMeet);

          // Existe link
          if (enlace) {
            let indiceInicio: number = texto.indexOf(enlace[0])

            prefijo = texto.slice(0, indiceInicio);
            cuerpo = texto.slice(indiceInicio, indiceInicio + 28).toLowerCase();
            sufijo = texto.slice(indiceInicio + 29);
          }

          // Dia de la semana y mes del año
          let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
          let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
          let fecha = new Date(`${audiencia.sfecha}T00:00`);
          let numeroDiaSemana = fecha.getUTCDay();
          let numeroMes = fecha.getMonth();
          let nombreDia = dias[numeroDiaSemana];
          let nombreMes = meses[numeroMes];
          let numeroDia = fecha.getDate();
          let numeroAnio = fecha.getFullYear();

          return {
            ...audiencia,
            sfechauser: sDay + '/' + sMonth + '/' + sYear,
            sprefijolink: prefijo,
            scuerpolink: cuerpo,
            ssufijolink: sufijo,
            nombreDia,
            nombreMes,
            numeroDia: sDay,
            numeroAnio,
          }
        }).sort((a, b) => {
          let sfecha1 = a.sfecha + '-' + a.shora;
          let sfecha2 = b.sfecha + '-' + b.shora;
          return sfecha1 < sfecha2 ? -1 : 1;
        });

    } catch (error) {
      console.log('Error buscando audiencias', error);
      return [];
    }
  }

  // J.1 - Leer abonos por expediente

  async abonosPorExpediente(idExpediente: string): Promise<Abono[]> {
    const ref = collection(this.db, 'abonos');
    const q = query(ref,
      where('idExpediente', '==', idExpediente),
      orderBy('fecha', 'asc'),
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
      console.log('Error buscando abonos', error);
      return [];
    }
  }

  // J.2 - Registrar nuevo abono

  async registrarAbono(idAbono: string, payload: Abono): Promise<boolean> {
    const ref = doc(this.db, 'abonos', idAbono);

    try {
      await setDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('ocurrio un error al registrar abono');
      return false;
    }
  }

  // J.3 - Actualizar abono

  async actualizarAbono(idAbono: string, payload: Partial<Abono>): Promise<boolean> {
    const ref = doc(this.db, 'abonos', idAbono);

    try {
      await updateDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('error al actualizar abono');
      return false;
    }
  }

  // J.4 - Eliminar abono

  async eliminarAbono(idAbono: string): Promise<boolean> {
    const ref = doc(this.db, 'abonos', idAbono);

    try {
      await deleteDoc(ref);
      return true;
    } catch (error) {
      console.log('error al eliminar abono');
      return false;
    }
  }

  // K.1 - Leer cuotas por expediente

  async cuotasPorExpediente(idExpediente: string): Promise<Cuota[]> {
    const ref = collection(this.db, 'cuotas');
    const q = query(ref,
      where('idExpediente', '==', idExpediente),
      orderBy('numero', 'asc'),
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
      console.log('Error buscando cuotas', error);
      return [];
    }
  }

  // K.2 - Registrar nueva cuota

  async registrarCuota(idCuota: string, payload: Cuota): Promise<boolean> {
    const ref = doc(this.db, 'cuotas', idCuota);

    try {
      await setDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('ocurrio un error al registrar cuota');
      return false;
    }
  }

  // K.3 - Actualizar cuota

  async actualizarCuota(idCuota: string, payload: Partial<Cuota>): Promise<boolean> {
    const ref = doc(this.db, 'cuotas', idCuota);

    try {
      await updateDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('error al actualizar cuota');
      return false;
    }
  }

  // K.4 - Eliminar cuota

  async eliminarCuota(idCuota: string): Promise<boolean> {
    const ref = doc(this.db, 'cuotas', idCuota);

    try {
      await deleteDoc(ref);
      return true;
    } catch (error) {
      console.log('error al eliminar cuota');
      return false;
    }
  }

  // L.1 - Leer aranceles por expediente

  async arancelesPorExpediente(idExpediente: string): Promise<Arancel[]> {
    const ref = collection(this.db, 'aranceles');
    const q = query(ref,
      where('idExpediente', '==', idExpediente),
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Arancel;
        })
    } catch (error) {
      console.log('Error buscando aranceles', error);
      return [];
    }
  }

  // L.2 - Registrar nuevo arancel

  async registrarArancel(idArancel: string, payload: Arancel): Promise<boolean> {
    const ref = doc(this.db, 'aranceles', idArancel);

    try {
      await setDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('ocurrio un error al registrar arancel');
      return false;
    }
  }

  // L.3 - Actualizar arancel

  async actualizarArancel(idArancel: string, payload: Partial<Arancel>): Promise<boolean> {
    const ref = doc(this.db, 'aranceles', idArancel);

    try {
      await updateDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('error al actualizar arancel');
      return false;
    }
  }

  // L.4 - Eliminar arancel

  async eliminarArancel(idArancel: string): Promise<boolean> {
    const ref = doc(this.db, 'aranceles', idArancel);

    try {
      await deleteDoc(ref);
      return true;
    } catch (error) {
      console.log('error al eliminar arancel');
      return false;
    }
  }

  // M.1 - Leer resoluciones por expediente

  async resolucionesPorExpediente(numero: string): Promise<Resolucion[]> {
    const ref = collection(this.db, 'resoluciones');
    const q = query(ref,
      where('numeroExpediente', '==', numero),
      orderBy('fechaNotificacion', 'desc'),
      limit(10),
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Resolucion;
        })
        .map(r => {
          if (r.fechaNotificacion.length == 10) {
            let year = r.fechaNotificacion.slice(0, 4);
            let month = r.fechaNotificacion.slice(5, 7);
            let day = r.fechaNotificacion.slice(8, 10);
            let fecha = `${day}/${month}/${year}`
            return { ...r, fechaNotificacion: fecha };
          }
          return r;
        });
    } catch (error) {
      console.log('Error buscando resoluciones', error);
      return [];
    }
  }

  // M.2 - Leer resoluciones por nick del encargado

  async resolucionesPorEncargado(nick: string): Promise<Resolucion[]> {
    const ref = collection(this.db, 'resoluciones');
    const q = query(ref,
      where('idEncargado', '==', nick),
      orderBy('fechaCreacion', 'desc'),
      limit(25),
    )

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Resolucion;
        })
        .map((t: Resolucion) => {
          let scolor = 'black';
          if (t.plazo) {
            let year = Number(t.plazo.slice(0, 4));
            let month = Number(t.plazo.slice(5, 7));
            let day = Number(t.plazo.slice(8, 10));
            let dPlazo = new Date(year, month - 1, day + 1);
            let dToday = new Date();
            let diff = dPlazo.getTime() - dToday.getTime();

            if (t.cumplimiento) {
              scolor = 'green'
            } else if (diff > 0) {
              scolor = 'gold'
            } else if (diff < 0) {
              scolor = 'red'
            }
          }

          return {
            ...t,
            color: scolor
          }
        });
    } catch (error) {
      console.log('Error buscando resoluciones', error);
      return [];
    }
  }

  // M.3 - Leer resoluciones por nick del encargado

  async resolucionesPorCumplimientoYColaborador(cumplimiento: string, nick: string): Promise<Resolucion[]> {    
    const ref = collection(this.db, 'resoluciones');
    let q;
    // POSIBILIDADES DE SUCESOS EN EL FILTRO
    if (cumplimiento == 'all' && nick == 'all') {
      q = query(ref,
        orderBy('fechaCreacion', 'desc'),
        limit(25),
      )
    } else if (cumplimiento == 'all' && nick != 'all') {
      q = query(ref,
        where('idEncargado', '==', nick),
        orderBy('fechaCreacion', 'desc'),
        limit(25),
      )
    } else if (cumplimiento != 'all' && nick == 'all') {
      q = query(ref,
        where('cumplimiento', '==', /^true$/i.test(cumplimiento)),
        orderBy('fechaCreacion', 'desc'),
        limit(25),
      )
    } else if (cumplimiento != 'all' && nick != 'all') {
      q = query(ref,
        where('cumplimiento', '==', /^true$/i.test(cumplimiento)),
        where('idEncargado', '==', nick),
        orderBy('fechaCreacion', 'desc'),
        limit(25),
      )
    } else {
      console.log('filtros incorrectos')
      return [];
    }

    try {
      const snapshot = await getDocs(q);

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc: QueryDocumentSnapshot) => {
          return {
            // id: doc.id,
            ...doc.data()
          } as Resolucion;
        })
        .map((t: Resolucion) => {
          let scolor = 'black';
          if (t.plazo) {
            let year = Number(t.plazo.slice(0, 4));
            let month = Number(t.plazo.slice(5, 7));
            let day = Number(t.plazo.slice(8, 10));
            let dPlazo = new Date(year, month - 1, day + 1);
            let dToday = new Date();
            let diff = dPlazo.getTime() - dToday.getTime();

            if (t.cumplimiento) {
              scolor = 'green'
            } else if (diff > 0) {
              scolor = 'gold'
            } else if (diff < 0) {
              scolor = 'red'
            }
          }

          return {
            ...t,
            color: scolor
          }
        });
    } catch (error) {
      console.log('Error buscando resoluciones', error);
      return [];
    }
  }

  // M.4 - Registrar nueva resolucion

  async registrarResolucion(idResolucion: string, payload: Resolucion): Promise<boolean> {
    const ref = doc(this.db, 'resoluciones', idResolucion);

    try {
      await setDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('ocurrio un error al registrar resolucion');
      return false;
    }
  }

  // M.5 - Actualizar resolucion

  async actualizarResolucion(idResolucion: string, payload: Partial<Resolucion>): Promise<boolean> {
    const ref = doc(this.db, 'resoluciones', idResolucion);

    try {
      await updateDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('error al actualizar resolucion');
      return false;
    }
  }

  // M.6 - Eliminar resolucion

  async eliminarResolucion(idResolucion: string): Promise<boolean> {
    const ref = doc(this.db, 'resoluciones', idResolucion);

    try {
      await deleteDoc(ref);
      return true;
    } catch (error) {
      console.log('error al eliminar resolucion');
      return false;
    }
  }

  // N.1 - Listado de tareas por usuario

  async tareasPorFecha(fecha: string): Promise<Tarea[]> {
    const ref = collection(this.db, 'tareas');
    const q = query(ref,
      where('fechaTarea', '==', fecha),
    )

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
      console.log('Error buscando tareas', error);
      return [];
    }
  }

  // N.2 - Listado de tareas agrupado por Tareo

  async tareasPorTareo(idTareo: string): Promise<Tarea[]> {
    const ref = collection(this.db, 'tareas');
    const q = query(ref,
      where('idTareo', '==', idTareo),
    )

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
      console.log('Error buscando tareas', error);
      return [];
    }
  }

  // N.3 - Listado de tareas agrupado por Expediente

  async tareasPorExpediente(idExpediente: string, limite: number): Promise<Tarea[]> {
    const ref = collection(this.db, 'tareas');
    const q = query(ref,
      where('idExpediente', '==', idExpediente),
      orderBy('fechaTarea', 'desc'),
      limit(limite),
    )

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
      console.log('Error buscando tareas', error);
      return [];
    }
  }

  // N.4 - Registrar nueva tarea

  async registrarTarea(idTarea: string, payload: Tarea): Promise<boolean> {
    const ref = doc(this.db, 'tareas', idTarea);

    try {
      await setDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('ocurrio un error al registrar tarea');
      return false;
    }
  }

  // H.3 - Actualizar tarea

  async actualizarTarea(idTarea: string, payload: Partial<Tarea>): Promise<boolean> {
    const ref = doc(this.db, 'tareas', idTarea);

    try {
      await updateDoc(ref, payload);
      return true;
    } catch (error) {
      console.log('error al actualizar tarea');
      return false;
    }
  }

  // H.4 - Eliminar Tarea

  async eliminarTarea(idTarea: string): Promise<boolean> {
    const ref = doc(this.db, 'tareas', idTarea);

    try {
      await deleteDoc(ref);
      return true;
    } catch (error) {
      console.log('error al eliminar tarea');
      return false;
    }
  }

  // O.1 - Lista de las Materias

  materias() {
    const materias = [
      {
        "id": "CIV-ACCI-A",
        "idmateria": "CIV-ACCI-A",
        "smateria": "ACCION DE AMPARO",
        "sespecialidad": "CIVIL"
      },
      {
        "id": "CIV-ACCI-P",
        "sespecialidad": "CIVIL",
        "smateria": "ACCIÓN PAULIANA",
        "idmateria": "CIV-ACCI-P"
      },
      {
        "id": "CIV-ADOP",
        "idmateria": "CIV-ADOP",
        "smateria": "ADOPCION",
        "sespecialidad": "CIVIL"
      },
      {
        "id": "CIV-CAMBI-N-SNYOAN",
        "idmateria": "CIV-CAMBI-N-SNYOAN",
        "smateria": "CAMBIO DE NOMBRE, SUPRESION DE NOMBRE Y/O ADICION DE NOMBRE",
        "sespecialidad": "CIVIL"
      },
      {
        "id": "CIV-CONC",
        "sespecialidad": "CIVIL",
        "smateria": "CONCILIACIÓN",
        "idmateria": "CIV-CONC"
      },
      {
        "id": "CIV-CONS",
        "sespecialidad": "CIVIL",
        "smateria": "CONSTITUCIÓN",
        "idmateria": "CIV-CONS"
      },
      {
        "id": "CIV-CONV-JOAG",
        "sespecialidad": "CIVIL",
        "smateria": "CONVOCATORIA A JUNTA O ASAMBLEA GENERAL",
        "idmateria": "CIV-CONV-JOAG"
      },
      {
        "id": "CIV-DESA",
        "sespecialidad": "CIVIL",
        "smateria": "DESALOJO",
        "idmateria": "CIV-DESA"
      },
      {
        "id": "CIV-DIVI-PDB",
        "smateria": "DIVISION Y PARTICIPACION DE BIENES",
        "sespecialidad": "CIVIL",
        "idmateria": "CIV-DIVI-PDB"
      },
      {
        "id": "CIV-EJEC-AC",
        "idmateria": "CIV-EJEC-AC",
        "sespecialidad": "CIVIL",
        "smateria": "EJECUCION DE ACTA DE CONCILIACION"
      },
      {
        "id": "CIV-EJEC-G",
        "smateria": "EJECUCION DE GARANTIAS",
        "sespecialidad": "CIVIL",
        "idmateria": "CIV-EJEC-G"
      },
      {
        "id": "CIV-IMPU-A",
        "sespecialidad": "CIVIL",
        "smateria": "IMPUGNACION DE ACUERDOS",
        "idmateria": "CIV-IMPU-A"
      },
      {
        "id": "CIV-INDE-PDYP",
        "smateria": "INDEMNIZACION POR DAÑOS Y PERJUICIOS",
        "sespecialidad": "CIVIL",
        "idmateria": "CIV-INDE-PDYP"
      },
      {
        "id": "CIV-NOT-ADM",
        "smateria": "NOTARIAL ADMINISTRATIVO",
        "sespecialidad": "CIVIL",
        "idmateria": "CIV-NOT-ADM"
      },
      {
        "id": "CIV-NULI-AJ",
        "idmateria": "CIV-NULI-AJ",
        "sespecialidad": "CIVIL",
        "smateria": "NULIDAD DE ACTO JURIDICO"
      },
      {
        "id": "CIV-NULI-RA",
        "smateria": "NULIDAD DE RESOLUCION ADMINISTRATIVA",
        "sespecialidad": "CIVIL",
        "idmateria": "CIV-NULI-RA"
      },
      {
        "id": "CIV-OBLI-DSD",
        "idmateria": "CIV-OBLI-DSD",
        "sespecialidad": "CIVIL",
        "smateria": "OBLIGACION DE DAR SUMA DE DINERO"
      },
      {
        "id": "CIV-OBLI-H",
        "sespecialidad": "CIVIL",
        "smateria": "OBLIGACION DE HACER",
        "idmateria": "CIV-OBLI-H"
      },
      {
        "id": "CIV-OTOR-EP",
        "sespecialidad": "CIVIL",
        "smateria": "OTORGAMIENTO DE ESCRITURA PUBLICA",
        "idmateria": "CIV-OTOR-EP"
      },
      {
        "id": "CIV-PAGO",
        "idmateria": "CIV-PAGO",
        "sespecialidad": "CIVIL",
        "smateria": "PAGO DE FRUTOS"
      },
      {
        "id": "CIV-PETI-H",
        "sespecialidad": "CIVIL",
        "smateria": "PETICIÓN DE HERENCIA",
        "idmateria": "CIV-PETI-H"
      },
      {
        "id": "CIV-PRES-A",
        "smateria": "PRESCRIPCION ADQUISITIVA",
        "sespecialidad": "CIVIL",
        "idmateria": "CIV-PRES-A"
      },
      {
        "id": "CIV-PROT-C",
        "idmateria": "CIV-PROT-C",
        "sespecialidad": "CIVIL",
        "smateria": "PROTECCIÓN AL CONSUMIDOR"
      },
      {
        "id": "CIV-REGI-TD",
        "sespecialidad": "CIVIL",
        "smateria": "REGISTRAL - TRASLADO DE DOMINIO",
        "idmateria": "CIV-REGI-TD"
      },
      {
        "id": "CIV-REIV",
        "idmateria": "CIV-REIV",
        "sespecialidad": "CIVIL",
        "smateria": "REIVINDICACION"
      },
      {
        "id": "CIV-RETR",
        "sespecialidad": "CIVIL",
        "smateria": "RETRACTO",
        "idmateria": "CIV-RETR"
      },
      {
        "id": "CIV-REVE-D",
        "smateria": "REVERSIÓN DE DONACIÓN Y CAMBIO DE NOMBRE DE TITULAR",
        "sespecialidad": "CIVIL",
        "idmateria": "CIV-REVE-D"
      },
      {
        "id": "CIV-SUCE-I",
        "sespecialidad": "CIVIL",
        "smateria": "SUCESION INTESTADA",
        "idmateria": "CIV-SUCE-I"
      },
      {
        "id": "CIV-TERC",
        "idmateria": "CIV-TERC",
        "smateria": "TERCERIA",
        "sespecialidad": "CIVIL"
      },
      {
        "id": "CIV-VARI",
        "smateria": "VARIOS",
        "sespecialidad": "CIVIL",
        "idmateria": "CIV-VARI"
      },
      {
        "id": "CON-ACCI-A",
        "idmateria": "CON-ACCI-A",
        "smateria": "ACCION DE AMPARO",
        "sespecialidad": "CONSTITUCIONAL"
      },
      {
        "id": "CON-HABE-C",
        "idmateria": "CON-HABE-C",
        "smateria": "HABEAS CORPUS",
        "sespecialidad": "CONSTITUCIONAL"
      },
      {
        "id": "FAM-ADOP",
        "idmateria": "FAM-ADOP",
        "smateria": "ADOPCION",
        "sespecialidad": "FAMILIA"
      },
      {
        "id": "FAM-ALIM",
        "idmateria": "FAM-ALIM",
        "sespecialidad": "FAMILIA",
        "smateria": "ALIMENTOS"
      },
      {
        "id": "FAM-AUME-A",
        "sespecialidad": "FAMILIA",
        "smateria": "AUMENTO DE ALIMENTOS",
        "idmateria": "FAM-AUME-A"
      },
      {
        "id": "FAM-CAMB-FPA",
        "idmateria": "FAM-CAMB-FPA",
        "smateria": "CAMBIO EN LA FORMA DE PRESTAR ALIMENTOS",
        "sespecialidad": "FAMILIA"
      },
      {
        "id": "FAM-DETE-AYS",
        "sespecialidad": "FAMILIA",
        "smateria": "DETERMINACIÓN DE APOYOS Y SALVAGUARDAS",
        "idmateria": "FAM-DETE-AYS"
      },
      {
        "id": "FAM-DIVO-C",
        "idmateria": "FAM-DIVO-C",
        "sespecialidad": "FAMILIA",
        "smateria": "DIVORCIO POR CAUSAL"
      },
      {
        "id": "FAM-EJEC-AC",
        "sespecialidad": "FAMILIA",
        "smateria": "EJECUCION DE ACTA DE CONCILIACION",
        "idmateria": "FAM-EJEC-AC"
      },
      {
        "id": "FAM-EXON-A",
        "idmateria": "FAM-EXON-A",
        "smateria": "EXONERACION DE ALIMENTOS",
        "sespecialidad": "FAMILIA"
      },
      {
        "id": "FAM-FILI",
        "idmateria": "FAM-FILI",
        "sespecialidad": "FAMILIA",
        "smateria": "FILIACION"
      },
      {
        "id": "FAM-IMPU-P",
        "idmateria": "FAM-IMPU-P",
        "sespecialidad": "FAMILIA",
        "smateria": "IMPUGNACION DE PATERNIDAD"
      },
      {
        "id": "FAM-INTE",
        "idmateria": "FAM-INTE",
        "smateria": "INTERDICCION",
        "sespecialidad": "FAMILIA"
      },
      {
        "id": "FAM-PORD",
        "idmateria": "FAM-PORD",
        "smateria": "POR DEFINIR",
        "sespecialidad": "FAMILIA"
      },
      {
        "id": "FAM-PROR-A",
        "smateria": "PRORRATEO DE ALIMENTOS",
        "sespecialidad": "FAMILIA",
        "idmateria": "FAM-PROR-A"
      },
      {
        "id": "FAM-RECO-UDH",
        "smateria": "RECONOCIMIENTO DE UNION DE HECHO",
        "sespecialidad": "FAMILIA",
        "idmateria": "FAM-RECO-UDH"
      },
      {
        "id": "FAM-REDU-A",
        "idmateria": "FAM-REDU-A",
        "smateria": "REDUCCION DE ALIMENTOS",
        "sespecialidad": "FAMILIA"
      },
      {
        "id": "FAM-REGI-V",
        "idmateria": "FAM-REGI-V",
        "smateria": "REGIMEN DE VISITAS",
        "sespecialidad": "FAMILIA"
      },
      {
        "id": "FAM-TENE",
        "idmateria": "FAM-TENE",
        "sespecialidad": "FAMILIA",
        "smateria": "TENENCIA"
      },
      {
        "id": "FAM-VIOL-CLM-IGF",
        "sespecialidad": "FAMILIA",
        "smateria": "VIOLENCIA CONTRA LAS MUJERES Y LOS INTEGRANTES DEL GRUPO FAMILIAR",
        "idmateria": "FAM-VIOL-CLM-IGF"
      },
      {
        "id": "FAM-VIOL-F",
        "sespecialidad": "FAMILIA",
        "smateria": "VIOLENCIA FAMILIAR",
        "idmateria": "FAM-VIOL-F"
      },
      {
        "id": "LAB-ACCI-A",
        "idmateria": "LAB-ACCI-A",
        "smateria": "ACCION DE AMPARO",
        "sespecialidad": "LABORAL"
      },
      {
        "id": "LAB-ACCI-CA",
        "smateria": "ACCION CONTENCIOSA ADMINISTRATIVA",
        "sespecialidad": "LABORAL",
        "idmateria": "LAB-ACCI-CA"
      },
      {
        "id": "LAB-ANUL-LA",
        "sespecialidad": "LABORAL",
        "smateria": "ANULACION DE LAUDOS ARBITRALES",
        "idmateria": "LAB-ANUL-LA"
      },
      {
        "id": "LAB-CESE-AHE",
        "smateria": "CESE DE ACTOS DE HOSTILIDAD DEL EMPLEADOR",
        "sespecialidad": "LABORAL",
        "idmateria": "LAB-CESE-AHE"
      },
      {
        "id": "LAB-COBR-R",
        "sespecialidad": "LABORAL",
        "smateria": "COBRO DE REMUNERACIONES",
        "idmateria": "LAB-COBR-R"
      },
      {
        "id": "LAB-CONS",
        "idmateria": "LAB-CONS",
        "smateria": "CONSIGNACION",
        "sespecialidad": "LABORAL"
      },
      {
        "id": "LAB-CONS-LPP-CS",
        "sespecialidad": "LABORAL",
        "smateria": "CONSIGNACIONES LABORALES POR PAGO DE CUOTA SINDICAL",
        "idmateria": "LAB-CONS-LPP-CS"
      },
      {
        "id": "LAB-CRED-L",
        "smateria": "CREDITOS LABORALES",
        "sespecialidad": "LABORAL",
        "idmateria": "LAB-CRED-L"
      },
      {
        "id": "LAB-DESN-C",
        "idmateria": "LAB-DESN-C",
        "smateria": "DESNATURALIZACIÓN DE CONTRATO",
        "sespecialidad": "LABORAL"
      },
      {
        "id": "LAB-DESP-FRAU",
        "idmateria": "LAB-DESP-FRAU",
        "smateria": "DESPIDO FRAUDULENTO",
        "sespecialidad": "LABORAL"
      },
      {
        "id": "LAB-IMPU-D",
        "idmateria": "LAB-IMPU-D",
        "sespecialidad": "LABORAL",
        "smateria": "IMPUGNACION DE DESPIDO"
      },
      {
        "id": "LAB-IMPU-SDIPEE",
        "idmateria": "LAB-IMPU-SDIPEE",
        "sespecialidad": "LABORAL",
        "smateria": "IMPUGNACION DE LAS SANCIONES DISCIPLINARIAS IMPUESTAS POR EL EMPLEADOR"
      },
      {
        "id": "LAB-INDE-PDA-O",
        "idmateria": "LAB-INDE-PDA-O",
        "smateria": "INDEMNIZACION POR DESPIDO ARBITRARIO Y OTROS",
        "sespecialidad": "LABORAL"
      },
      {
        "id": "LAB-INDE-PDYP-PIC",
        "idmateria": "LAB-INDE-PDYP-PIC",
        "sespecialidad": "LABORAL",
        "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE CONTRATO"
      },
      {
        "id": "LAB-INDE-PDYP-PINL",
        "idmateria": "LAB-INDE-PDYP-PINL",
        "sespecialidad": "LABORAL",
        "smateria": "INDEM. POR DAÑOS Y PERJUICIOS POR INCUMP. DE NORMAS LABORAL"
      },
      {
        "id": "LAB-INOP-DERE",
        "idmateria": "LAB-INOP-DERE",
        "sespecialidad": "LABORAL",
        "smateria": "INOPONIBILIDAD DE DERECHOS"
      },
      {
        "id": "LAB-NULI-D",
        "sespecialidad": "LABORAL",
        "smateria": "NULIDAD DE DESPIDO",
        "idmateria": "LAB-NULI-D"
      },
      {
        "id": "LAB-PAGO-BE",
        "smateria": "PAGO DE BENEFICIOS ECONOMICOS",
        "sespecialidad": "LABORAL",
        "idmateria": "LAB-PAGO-BE"
      },
      {
        "id": "LAB-PAGO-BS",
        "idmateria": "LAB-PAGO-BS",
        "sespecialidad": "LABORAL",
        "smateria": "PAGO DE BENEFICIOS SOCIALES"
      },
      {
        "id": "LAB-PAGO-BSI-OBS",
        "smateria": "PAGO DE BENEFICIOS SOCIALES Y/O INDEMNIZACION U OTROS BENEFICIOS ECONOMICOS",
        "sespecialidad": "LABORAL",
        "idmateria": "LAB-PAGO-BSI-OBS"
      },
      {
        "id": "LAB-PAGO-R",
        "sespecialidad": "LABORAL",
        "smateria": "PAGO DE REMUNERACIONES",
        "idmateria": "LAB-PAGO-R"
      },
      {
        "id": "LAB-PORD",
        "sespecialidad": "LABORAL",
        "smateria": "POR DEFINIR",
        "idmateria": "LAB-PORD"
      },
      {
        "id": "LAB-RECO-VL",
        "idmateria": "LAB-RECO-VL",
        "smateria": "RECONOCIMIENTO DE VINCULO LABORAL",
        "sespecialidad": "LABORAL"
      },
      {
        "id": "LAB-RELA-LI",
        "smateria": "RELACIÓN LABORAL INDETERMINADO",
        "sespecialidad": "LABORAL",
        "idmateria": "LAB-RELA-LI"
      },
      {
        "id": "LAB-REPO",
        "idmateria": "LAB-REPO",
        "sespecialidad": "LABORAL",
        "smateria": "REPOSICION"
      },
      {
        "id": "LAB-REPO-D-I",
        "smateria": "REPOSICIÓN POR DESPIDO INCAUSADO",
        "sespecialidad": "LABORAL",
        "idmateria": "LAB-REPO-D-I"
      },
      {
        "id": "LAB-TERC",
        "idmateria": "LAB-TERC",
        "sespecialidad": "LABORAL",
        "smateria": "TERCERIA"
      },
      {
        "id": "PEN-ACTO-CEP",
        "idmateria": "PEN-ACTO-CEP",
        "sespecialidad": "PENAL",
        "smateria": "ACTOS CONTRA EL PUDOR"
      },
      {
        "id": "PEN-AGRE-CLM-IGF",
        "sespecialidad": "PENAL",
        "smateria": "AGRESIONES EN CONTRA DE LAS MUJERES O INTEGRANTES DEL GRUPO FAMILIAR",
        "idmateria": "PEN-AGRE-CLM-IGF"
      },
      {
        "id": "PEN-APRO-ILI",
        "smateria": "APROPIACION ILICITA",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-APRO-ILI"
      },
      {
        "id": "PEN-CART-NOT",
        "idmateria": "PEN-CART-NOT",
        "smateria": "CARTA NOTARIAL",
        "sespecialidad": "PENAL"
      },
      {
        "id": "PEN-CONS-PCS",
        "sespecialidad": "PENAL",
        "smateria": "CONSIGANCIONES LABORALES POR PAGO DE CUOTA SINDICAL",
        "idmateria": "PEN-CONS-PCS"
      },
      {
        "id": "PEN-CONV-PAF",
        "idmateria": "PEN-CONV-PAF",
        "sespecialidad": "PENAL",
        "smateria": "CONVERSIÓN DE LA PENA AGRESIONES FÍSICAS"
      },
      {
        "id": "PEN-DELI-INF",
        "smateria": "DELITO INFORMATICO",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-DELI-INF"
      },
      {
        "id": "PEN-DESO-A",
        "idmateria": "PEN-DESO-A",
        "sespecialidad": "PENAL",
        "smateria": "DESOBEDIENCIA A LA AUTORIDAD"
      },
      {
        "id": "PEN-DIFA",
        "smateria": "DIFAMACION",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-DIFA"
      },
      {
        "id": "PEN-ELIM-P",
        "idmateria": "PEN-ELIM-P",
        "smateria": "ELIMINACIÓN DE PROCESOS",
        "sespecialidad": "PENAL"
      },
      {
        "id": "PEN-ESTA",
        "idmateria": "PEN-ESTA",
        "sespecialidad": "PENAL",
        "smateria": "ESTAFA"
      },
      {
        "id": "PEN-FALS-DEC-PA",
        "sespecialidad": "PENAL",
        "smateria": "FALSA DECLARACION EN PROC. ADMINISTRATIVO FALSIFICACION DOCUMENTARIO",
        "idmateria": "PEN-FALS-DEC-PA"
      },
      {
        "id": "PEN-FALS-DEN",
        "sespecialidad": "PENAL",
        "smateria": "FALSA DENUNCIA",
        "idmateria": "PEN-FALS-DEN"
      },
      {
        "id": "PEN-FALS-IDE",
        "sespecialidad": "PENAL",
        "smateria": "FALSEDAD IDEOLÓGICA",
        "idmateria": "PEN-FALS-IDE"
      },
      {
        "id": "PEN-FRAU-INF",
        "sespecialidad": "PENAL",
        "smateria": "FRAUDE INFORMATICO",
        "idmateria": "PEN-FRAU-INF"
      },
      {
        "id": "PEN-HOMI-CUL",
        "smateria": "HOMICIDIO CULPOSO",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-HOMI-CUL"
      },
      {
        "id": "PEN-HURT",
        "smateria": "HURTO",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-HURT"
      },
      {
        "id": "PEN-HURT-A",
        "idmateria": "PEN-HURT-A",
        "smateria": "HURTO AGRAVADO",
        "sespecialidad": "PENAL"
      },
      {
        "id": "PEN-HURT-G",
        "idmateria": "PEN-HURT-G",
        "sespecialidad": "PENAL",
        "smateria": "HURTO DE GANADO"
      },
      {
        "id": "PEN-LAVA-A",
        "smateria": "LAVADO DE ACTIVOS",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-LAVA-A"
      },
      {
        "id": "PEN-LESI-C",
        "smateria": "LESIONES CULPOSAS",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-LESI-C"
      },
      {
        "id": "PEN-LESI-C-OSYEP",
        "sespecialidad": "PENAL",
        "smateria": "LESIONES CULPOSAS/OMISION DE SOCORRO Y EXOSICION AL PELIGRO",
        "idmateria": "PEN-LESI-C-OSYEP"
      },
      {
        "id": "PEN-LESI-DYC",
        "smateria": "LESIÓN DOLOSA Y CULPOSA",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-LESI-DYC"
      },
      {
        "id": "PEN-LESI-L",
        "idmateria": "PEN-LESI-L",
        "smateria": "LESIONES LEVES",
        "sespecialidad": "PENAL"
      },
      {
        "id": "PEN-LESI-L-VF",
        "smateria": "LESIONES LEVES POR VIOLENCIA FAMILIAR",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-LESI-L-VF"
      },
      {
        "id": "PEN-OAF",
        "idmateria": "PEN-OAF",
        "smateria": "OAF",
        "sespecialidad": "PENAL"
      },
      {
        "id": "PEN-OMIS-A",
        "idmateria": "PEN-OMIS-A",
        "sespecialidad": "PENAL",
        "smateria": "OMISIÓN DE ALIMENTOS"
      },
      {
        "id": "PEN-OMIS-AF",
        "sespecialidad": "PENAL",
        "smateria": "OMISION A LA ASISTENCIA FAMILIAR",
        "idmateria": "PEN-OMIS-AF"
      },
      {
        "id": "PEN-PAGO-M",
        "idmateria": "PEN-PAGO-M",
        "sespecialidad": "PENAL",
        "smateria": "PAGO DE MULTA"
      },
      {
        "id": "PEN-RECE",
        "idmateria": "PEN-RECE",
        "smateria": "RECEPTACION",
        "sespecialidad": "PENAL"
      },
      {
        "id": "PEN-RESI-AUT",
        "idmateria": "PEN-RESI-AUT",
        "sespecialidad": "PENAL",
        "smateria": "RESISTENCIA Y DESOBEDIENCIA A LA AUTORIDAD"
      },
      {
        "id": "PEN-ROBO-AGR",
        "sespecialidad": "PENAL",
        "smateria": "ROBO AGRAVADO",
        "idmateria": "PEN-ROBO-AGR"
      },
      {
        "id": "PEN-SDYO-DOC",
        "idmateria": "PEN-SDYO-DOC",
        "smateria": "SUPRESIÓN, DESTRUCCIÓN Y OCULTAMIENTO DE DOCUMENTOS",
        "sespecialidad": "PENAL"
      },
      {
        "id": "PEN-SUST-M",
        "sespecialidad": "PENAL",
        "smateria": "SUSTRACCIÓN DE MENOR",
        "idmateria": "PEN-SUST-M"
      },
      {
        "id": "PEN-TOCA-CS-ACP",
        "smateria": "TOCAMIENTOS DE CONNOTACION SEXUAL Y ACTOS CONTRA EL PUDOR",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-TOCA-CS-ACP"
      },
      {
        "id": "PEN-TOCA-IND",
        "smateria": "TOCAMIENTOS INDEBIDOS",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-TOCA-IND"
      },
      {
        "id": "PEN-USUR",
        "idmateria": "PEN-USUR",
        "sespecialidad": "PENAL",
        "smateria": "USURPACIÓN"
      },
      {
        "id": "PEN-VIOL-CLM-IGF",
        "smateria": "VIOLENCIA CONTRA LAS MUJERES Y LOS INTEGRANTES DEL GRUPO FAMILIAR",
        "sespecialidad": "PENAL",
        "idmateria": "PEN-VIOL-CLM-IGF"
      },
      {
        "id": "PEN-VIOL-F",
        "idmateria": "PEN-VIOL-F",
        "smateria": "VIOLENCIA FAMILIAR",
        "sespecialidad": "PENAL"
      }
    ];
    return materias;
  }

  // P.1 - Generar Letra Aleatoria

  letraAleatoria(): string {
    const codigoASCII_A = 65;
    const codigoASCII_Z = 90;

    const codigoAleatorio = Math.floor(Math.random() * (codigoASCII_Z - codigoASCII_A + 1)) + codigoASCII_A;

    // Convierte el código ASCII a su carácter correspondiente
    const letraAleatoria = String.fromCharCode(codigoAleatorio);

    return letraAleatoria;
  }
}
