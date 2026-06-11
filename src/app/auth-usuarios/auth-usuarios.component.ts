import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Usuario } from '../_interfaces/usuario';
import { AppService } from '../app.service';

@Component({
    selector: 'app-auth-usuarios',
    templateUrl: './auth-usuarios.component.html',
    styleUrl: './auth-usuarios.component.scss',
    imports: [RouterLink]
})
export class AuthUsuariosComponent implements OnInit {
  appService = inject(AppService);

  usuarios: Usuario[] = [];

  cargando = true;

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  async getUsuarios() {
    this.cargando = true;
    this.usuarios = await this.appService.usuariosActivos();
    this.cargando = false;
  }
}
