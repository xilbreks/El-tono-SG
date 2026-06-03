import { Component, inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './../_interfaces/usuario';
import { AuthService } from './../auth.service';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, map, tap, filter } from 'rxjs';

interface Version {
  version: string,
}

@Component({
  selector: 'app-zlayout',
  templateUrl: './zlayout.component.html',
  styleUrl: './zlayout.component.scss'
})
export class ZlayoutComponent implements OnDestroy {
  authService = inject(AuthService);
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

    // Leer usuario
    this.usuarioObs = this.authService.user$
      .pipe(
        // tap((u) => console.log('current user: ', u)),
        filter((u) => u ? true : false),
        map((u: any) => u?.uid)
      )
      .subscribe((uid: string) => {
        console.log('user: ', uid)
        this.getCurrentUser(uid);
      });
  }

  async getCurrentUser(uid: string) {
    const userSnapshot = await this.authService.getUsuario(uid);
    if (userSnapshot.exists()) {
      const datosUsuario: any = userSnapshot.data();
      this.usuarioApp = datosUsuario;
      // console.log({ datosUsuario });
    } else {
      console.log('No existe usuario')
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
