import { Component } from '@angular/core';
import { Router } from '@angular/router';

class ObjUsuario {
  id: string = '';
  spassword: string = '';
  constructor(a: string, b: string) {
    this.id = a;
    this.spassword = b;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  lstUsuarios: Array<ObjUsuario> = [
    new ObjUsuario('alvaro-morvelli', 'alvaro-morvelli123'),
    new ObjUsuario('diana-zevallos', 'diana-zevallos123'),
    new ObjUsuario('erica-nina', 'erica-nina123'),
    new ObjUsuario('estrella-mendoza', 'estrella-mendoza123'),
    new ObjUsuario('fabiola-mayta', 'fabiola-mayta123'),
    new ObjUsuario('fabriszio-silva', 'fabriszio-silva123'),
    new ObjUsuario('isabel-cosi', 'isabel-cosi123'),
    new ObjUsuario('jackeline-flores', 'jackeline-flores123'),
    new ObjUsuario('johana-paredes', 'johana-paredes123'),
    new ObjUsuario('jorge-cuba', 'jorge-cuba123'),
    new ObjUsuario('lizbet-silva', 'lizbet-silva123'),
    new ObjUsuario('maryori-garate', 'maryori-garate123'),
    new ObjUsuario('nicolas-barrionuevo', 'nicolas-barrionuevo123'),
    new ObjUsuario('admin', 'admin123'),
  ];

  constructor(private router: Router) {}

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
