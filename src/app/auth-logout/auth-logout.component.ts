import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrl: './auth-logout.component.scss'
})
export class AuthLogoutComponent  {
  private auth = inject(Auth);
  private router = inject(Router);

  constructor() {
    this.salir();
  }

  async salir() {
    try {
      await signOut(this.auth);
      localStorage.clear();
      this.router.navigate(['/', 'login']);
      // console.log('Cierre de sesecion exitoso');
    } catch (error: any) {
      // console.error('Error al cerrar sesión:', error);
      window.alert('No se pudo cerrar la sesión: ' + error.message);
    }
  }

}
