import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  lCreating = false;
  frmUsuario: FormGroup;

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) {
    this.frmUsuario = new FormGroup({
      id: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^\S*$/)
      ])),
      sname: new FormControl(null, Validators.required),
      scargo: new FormControl(null, Validators.required),
      spassword: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^\S*$/)
      ])),
    });
  }

  registrarUsuario() {
    this.lCreating = true;
    let id: string = this.frmUsuario.controls['id'].value;
    let spassword: string = this.frmUsuario.controls['spassword'].value;

    this.afAuth.createUserWithEmailAndPassword(id + '@silvaguillenabogados.com', spassword)
      .then(newuser => {
        this.registrarDatosUsuario(newuser);
      })
      .catch(err => {
        // ERROR
        console.log(err);
      });
  }

  registrarDatosUsuario(newuser: any) {
    let id: string = this.frmUsuario.controls['id'].value;
    let snombre: string = this.frmUsuario.controls['sname'].value.trim();
    let scargo: string = this.frmUsuario.controls['scargo'].value;
    let spassword: string = this.frmUsuario.controls['spassword'].value;

    var letters = '0123456789ABCDEF';
    var scolor = '#';
    for (var i = 0; i < 6; i++) {
      scolor += letters[Math.floor(Math.random() * 16)];
    }

    newuser.user?.updateProfile({
      displayName: snombre,
    });

    this.db.collection('colaboradores')
      .doc(id)
      .set({
        id: id,
        snombre: snombre,
        scargo: scargo,
        scolor: scolor,
        spassword: spassword,
        lactive: true,
      })
      .then(() => {
        // SUCCESS
        window.alert('Se registró correctamente.\nVuelva a iniciar sesion.');
        this.router.navigate(['/', 'logout']);
      })
      .catch(err => {
        // ERROR
        console.log(err);
      })
      .finally(() => {
        this.lCreating = false;
      });
  }
}
