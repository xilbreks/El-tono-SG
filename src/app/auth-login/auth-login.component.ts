import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  lLoggin: boolean = false;
  sError = null;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
  ) {
    /////////////////////////////////////////////
    ////////////  VERIFICAR USUARIO /////////////
    /////////////////////////////////////////////
    this.afAuth.user.subscribe(u => {
      if (u) {
        if (u.displayName == 'ADMIN') {
          this.router.navigate(['/', 'admin-rdt']);
        } else {
          this.router.navigate(['/', 'colaborador-rdt']);
        }
      }
    })
  }

  login(suser: any, spassword: any): boolean {
    this.lLoggin = true;
    this.afAuth
      .signInWithEmailAndPassword(suser + '@silvaguillenabogados.com', spassword)
      .then((result) => {
        this.sError = null;
        localStorage.setItem('idusuario', suser);
        if (suser == 'admin') {
          this.router.navigate(['/', 'admin-rdt']);
        } else {
          this.router.navigate(['/', 'colaborador-rdt']);
        }
      })
      .catch((error) => {
        this.sError = error.code;
      })
      .finally(() => {
        this.lLoggin = false;
      });
    return false;
  }
}
