import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  appService = inject(AppService);
  router = inject(Router);

  lLoggin = signal<boolean>(false);
  sError = signal<string | null>(null);

  constructor() { }

  async login(email: any, password: any) {
    this.lLoggin.set(true);
    this.sError.set(null);

    try {
      const userCredential = await this.appService.login(email, password);

      const usuario = await this.appService.usuario(userCredential.user.uid);
      if (!usuario) {
        console.log('No existe usuario');
        return;
      }

      console.log('log in exitoso', usuario)
      // Guardar en localStorage
      localStorage.setItem('nick', usuario.nick);
      localStorage.setItem('nombre', usuario.nombre);
      localStorage.setItem('rol', usuario.rol);
      localStorage.setItem('departamento', usuario.departamento);

      // redireccionar al dashboar o al rdt
      this.redirectUser(usuario.rol, usuario.esActivo);

    } catch (error: any) {
      this.sError.set(error.code);
      console.error("Error en login:", error);
    } finally {
      this.lLoggin.set(false);
    }
  }

  private redirectUser(rol: string, esActivo: boolean): void {
    if (rol == 'admin') {
      this.router.navigate(['/admin-rdt']);
    } else {
      // Verificar que no le hayan expulsado del equipo
      if (esActivo) {
        this.router.navigate(['/colaborador-rdt']);
      } else {
        this.sError.set('Permisos insuficientes');
        this.appService.logout();
      }

    }
  }

}
