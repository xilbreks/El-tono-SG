import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrl: './auth-logout.component.scss'
})
export class AuthLogoutComponent {
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
  ) {
    localStorage.clear();
    this.afAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/', 'login']);
      })
      .catch((reason: any) => {
        window.alert(reason);
      });
  }
}
