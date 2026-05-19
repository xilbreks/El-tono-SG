import { Component, OnDestroy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, user, User } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent implements OnDestroy {
  private auth: Auth = inject(Auth);
  private router: Router = inject(Router);
  private userSubscription: Subscription;

  lLoggin = signal<boolean>(false);
  sError = signal<string | null>(null);

  constructor() {
    /////////////////////////////////////////////
    ////////////  VERIFICAR USUARIO /////////////
    /////////////////////////////////////////////
    this.userSubscription = user(this.auth).subscribe((u: User | null) => {
      if (u) {
        this.redirectUser(u.displayName, '');
      }
    })
  }

  async login(suser: any, spassword: any): Promise<void> {
    this.lLoggin.set(true);
    this.sError.set(null);
    const email = `${suser}@silvaguillenabogados.com`;

    try {
      const result = await signInWithEmailAndPassword(this.auth, email, spassword);

      // Guardar en localStorage
      localStorage.setItem('idusuario', suser);
      localStorage.setItem('nombre', result.user?.displayName || 'Error 12345');

      this.redirectUser(result.user?.displayName, suser);
    } catch (error: any) {
      this.sError.set(error.code);
      // console.error("Error en login:", error);
    } finally {
      this.lLoggin.set(false);
    }
  }

  private redirectUser(displayName: string | null, suser: string): void {
    if (displayName === 'ADMIN' || suser === 'admin') {
      this.router.navigate(['/admin-rdt']);
    } else {
      this.router.navigate(['/colaborador-rdt']);
    }
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
