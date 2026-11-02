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
import { HttpClient } from '@angular/common/http';

import * as Papa from 'papaparse';
import { Checkpoint } from '../_interfaces/checkpoint';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
  imports: []
})
export class TestingComponent implements OnInit {
  appService = inject(AppService);
  auth = inject(Auth);

  http = inject(HttpClient);
  datos: Checkpoint[] = [];

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

  cargarCSV() {
    this.http.get('assets/iters.csv', { responseType: 'text' }).subscribe({
      next: (csvText) => {
        // 2. Usamos Papa.parse para procesarlo mágicamente
        Papa.parse<Checkpoint>(csvText, {
          header: true,          // Usa la primera fila como nombres de propiedades (keys)
          skipEmptyLines: true,  // Ignora líneas vacías automáticamente
          complete: (result) => {
            this.datos = result.data;
            console.log('Datos limpios y estructurados:', this.datos);
          },
          error: (error: any) => {
            console.error('Error al parsear el CSV:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar el archivo CSV:', error);
      }
    });
  }


}
