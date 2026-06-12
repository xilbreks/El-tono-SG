import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import { AppService } from '../app.service';
import { Usuario } from './../_interfaces/usuario';

interface Version {
  version: string,
}

@Component({
  selector: 'app-zlayout',
  templateUrl: './zlayout.component.html',
  styleUrl: './zlayout.component.scss',
  imports: [
    RouterLink,
    RouterOutlet
  ]
})
export class ZlayoutComponent implements OnInit, OnDestroy {
  appService = inject(AppService);
  db = inject(Firestore);
  router = inject(Router);

  versionApp = '3.3.0';
  versionObs;
  usuarioApp: Usuario | null = null;
  usuarioObs;

  constructor() {
    // 2. La referencia al documento está perfecta separada por comas
    const docRef = doc(this.db, 'versionado', 'master');

    // 3. Usamos onSnapshot directamente en lugar de docData().subscribe()
    // onSnapshot se encarga de escuchar los cambios en tiempo real sin romper los tipos
    this.versionObs = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data() as Version;

      if (data) {
        console.log('version: ', data.version);

        if (data.version === this.versionApp) {
          // todo ok
        } else {
          // recargar pagina
          this.recargarPagina();
          console.log('hay nueva actualizacion, recargar pagina');
        }
      }
    }, (error) => {
      console.error("Error al obtener la versión:", error);
    });

    // Leer usuario y acceso (Tu código de abajo se queda exactamente igual)
    this.usuarioObs = this.appService.usuario$.subscribe((user: any) => {
      if (!user) {
        console.log('user en el layout: ', user, 'ir al login');
        this.router.navigate(['/logout']);
        return;
      }
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
    if (this.versionObs) this.versionObs();
    this.usuarioObs.unsubscribe();
  }
}
