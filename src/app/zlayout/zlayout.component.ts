import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { map, tap, filter } from 'rxjs';
import { AppService } from '../app.service';
import { Usuario } from './../_interfaces/usuario';

interface Version {
  version: string,
}

@Component({
  selector: 'app-zlayout',
  templateUrl: './zlayout.component.html',
  styleUrl: './zlayout.component.scss'
})
export class ZlayoutComponent implements OnInit, OnDestroy {
  appService = inject(AppService);
  db = inject(Firestore);
  router = inject(Router);

  versionApp = '3.1.10';
  versionObs;
  usuarioApp: Usuario | null = null;
  usuarioObs;

  constructor() {
    // Verificar que la version sea la correcta
    const docRef = doc(this.db, 'versionado/master');
    this.versionObs = docData(docRef).pipe(
      tap((v: any) => console.log('version: ', v.version)),
    ).subscribe((data: any) => {
      const version = data as Version;
      if (version.version == this.versionApp) {
        // todo ok
        // console.log('todo ok con la version')
      } else {
        // recargar pagina
        this.recargarPagina();
        console.log('hay nueva actualizacion, recargar pagina')
      }
    });

    // Leer usuario y acceso
    this.usuarioObs = this.appService.usuario$
      .pipe(
      // filter((u) => u ? true : false),
      // map((u: any) => u?.uid)
    ).subscribe((user: any) => {
      if (!user) {
        console.log('user en el layout: ', user, 'ir al login');
        // mandar al login
        this.router.navigate(['/logout']);
      }

      // Activar escucha del permiso de usuario
      console.log('user en el layout: ', user.uid, 'mantenerse aqui');
      this.getCurrentUser(user.uid);
    });
  }

  ngOnInit(): void {
    
  }

  async getCurrentUser(uid: string) {
    this.usuarioApp = await this.appService.usuario(uid);
    if (!this.usuarioApp?.esActivo) {
      console.log('te quitaron el permiso papu');
      this.router.navigate(['/logout']);
    }
  }

  recargarPagina() {
    setTimeout(() => {
      window.location.reload();
    }, 2500)
  }

  ngOnDestroy(): void {
    this.versionObs.unsubscribe();
    this.usuarioObs.unsubscribe();
  }
}
