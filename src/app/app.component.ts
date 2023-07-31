import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: any;
  constructor(
    private router: Router, 
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user)=>{
      this.user = user;
      if (!user) this.router.navigate(['/', 'login']);
    })
  }
}
