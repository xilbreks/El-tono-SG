import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
  ) {
    localStorage.clear();
    this.afAuth
      .signOut()
      .then(()=>{
        this.router.navigate(['/','login']);
      })
      .catch((reason: any) => {
        window.alert(reason);
      });
  }
}
