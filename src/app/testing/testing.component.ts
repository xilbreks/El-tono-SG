import { Component, inject, OnInit } from '@angular/core';

import {
  Firestore,
  collection,
  query,
  where,
  getDocs,
  DocumentData
} from '@angular/fire/firestore';
import { AppService } from '../app.service';
import { tap } from 'rxjs';

import { Auth, signInWithEmailAndPassword, updatePassword } from '@angular/fire/auth';

@Component({
    selector: 'app-testing',
    templateUrl: './testing.component.html',
    styleUrls: ['./testing.component.scss'],
    imports: []
})
export class TestingComponent implements OnInit {
  appService = inject(AppService);
  auth = inject(Auth);

  constructor() { }

  ngOnInit(): void {

  }

  async cambiarContra() {
    const email = 'admsilvaguillenabogados@gmail.com';
    const passActual = 'adm@2026rdt';
    const nuevaPass = 'ADMIN2026@'; // <--- Tu nueva contraseña aquí

    try {
      // 1. Inicia sesión con el usuario
      const credencial = await signInWithEmailAndPassword(this.auth, email, passActual);
      
      // 2. Cambia la contraseña de forma directa
      await updatePassword(credencial.user, nuevaPass);
      
      console.log('¡Contraseña cambiada con éxito!');
    } catch (error) {
      console.error('Error:', error);
    }
  }

}
