import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  usuario = '';
  constructor() {
    let usuario = localStorage.getItem('idusuario');
    if (usuario) {
      this.usuario = usuario;
    } else {
      this.usuario = 'USER';
    }
  }
}
