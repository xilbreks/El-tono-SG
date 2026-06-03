import { Component, OnDestroy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword, user, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent implements OnDestroy {
  private authService = inject(AuthService);
  private router: Router = inject(Router);

  lLoggin = signal<boolean>(false);
  sError = signal<string | null>(null);

  constructor() {
    /////////////////////////////////////////////
    ////////////  VERIFICAR USUARIO /////////////
    /////////////////////////////////////////////
    // this.userSubscription = user(this.auth).subscribe((u: User | null) => {
    //   if (u) {
    //     this.redirectUser(u.displayName, '');
    //   }
    // })
  }

  async login(email: any, password: any) {
    this.lLoggin.set(true);
    this.sError.set(null);

    try {
      const userCredential = await this.authService.login(email, password);

      const docSnap = await this.authService.getUsuario(userCredential.user.uid);
      if (!docSnap.exists()) {
        console.log('No existe usuario');
        return;
      }

      const datosUsuario: any = docSnap.data();
      console.log('log in exitoso', datosUsuario)
      // Guardar en localStorage
      localStorage.setItem('nick', datosUsuario.nick);
      localStorage.setItem('nombre', datosUsuario.nombre);
      localStorage.setItem('rol', datosUsuario.rol);
      localStorage.setItem('departamento', datosUsuario.departamento);

      // redireccionar al dashboar o al rdt
      this.redirectUser(datosUsuario.rol, datosUsuario.esActivo);

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
        this.authService.logout();
      }

    }
  }

  ngOnDestroy(): void {
    // this.userSubscription?.unsubscribe();
  }
}
