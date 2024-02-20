import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  user: any;
  sversion = '1.4.4';

  constructor(
    private router: Router,
    private db: AngularFirestore,
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      if (!user) this.router.navigate(['/', 'login']);
    });
    this.db.collection('versionado')
      .doc('master')
      .valueChanges()
      .subscribe((res: any) => {
        console.log('version: ', res)
        if (res.version == this.sversion) {
          // nothing
        } else {
          // reload
          this.recargarPagina();
        }
      });
  }

  recargarPagina() {
    setTimeout(()=>{
      window.location.reload();
    },2500)
  }
}
