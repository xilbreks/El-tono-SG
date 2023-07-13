import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class ObjUsuario {
  id: string = '';
  spassword: string = '';
  snombre: string = '';
  constructor(a: string, b: string, c: string) {
    this.id = a;
    this.spassword = b;
    this.snombre = c;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  lstUsuarios: Array<ObjUsuario> = [];

  constructor(
    private router: Router,
    private db: AngularFirestore
  ) {
    this.db
      .collection('colaboradores', ref => {
        return ref.where('lactive','==', true)
      })
      .valueChanges()
      .subscribe((usuarios: Array<any>)=>{
        usuarios.forEach(usuario => {
          this.lstUsuarios.push(
            new ObjUsuario(usuario.id, usuario.spassword, usuario.snombre)
          );
          this.lstUsuarios.push(
            new ObjUsuario('admin', 'admin123', 'ADMIN')
          );
        });
      });
  }

  public login(suser: any, spassword: any): void {
    let identificado = false;
    this.lstUsuarios.forEach((usuario) => {
      if (usuario.id == suser && usuario.spassword == spassword) {
        identificado = true;
      }
    });
    if (identificado) {
      localStorage.setItem('idusuario', suser);
      if (suser == 'admin') {
        this.router.navigate(['/', 'admin-rdt']);
      } else {
        this.router.navigate(['/', 'colaborador-rdt']);
      }
    } else {
      window.alert('Usuario o contraseña incorrecto');
    }
  }
}
