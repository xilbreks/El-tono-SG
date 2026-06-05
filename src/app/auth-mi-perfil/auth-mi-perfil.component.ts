import { Component, inject } from '@angular/core';
import { AppService } from '../app.service';
import { Usuario } from '../_interfaces/usuario';

@Component({
  selector: 'app-auth-mi-perfil',
  templateUrl: './auth-mi-perfil.component.html',
  styleUrl: './auth-mi-perfil.component.scss',
  standalone: true,
})
export class AuthMiPerfilComponent {
  appService = inject(AppService);
  usuarioApp: Usuario | null = null;

  usuarioObs;

  constructor() {
    // Leer usuario y acceso
    this.usuarioObs = this.appService.usuario$
      .pipe(
      // filter((u) => u ? true : false),
      // map((u: any) => u?.uid)
    ).subscribe((user: any) => {
      if (!user) {
        // sin usuario
      }

      // Activar escucha del permiso de usuario
      console.log('user en el layout: ', user.uid, 'mantenerse aqui');
      this.getCurrentUser(user.uid);
    });
  }

  async getCurrentUser(uid: string) {
    this.usuarioApp = await this.appService.usuario(uid);
  }
}
