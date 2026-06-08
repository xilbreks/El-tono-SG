import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Usuario } from '../_interfaces/usuario';
import { AppService } from '../app.service';

@Component({
    selector: 'app-auth-usuarios-inactive',
    templateUrl: './auth-usuarios-inactive.component.html',
    styleUrl: './auth-usuarios-inactive.component.scss',
    imports: [RouterLink, DatePipe]
})
export class AuthUsuariosInactiveComponent implements OnInit {
  appService = inject(AppService);

  usuarios: Usuario[] = [];

  cargando = true;

  constructor() { }

  ngOnInit(): void {
    this.getUsuariosInactivos();
  }

  async getUsuariosInactivos() {
    this.cargando = true;
    this.usuarios = await this.appService.usuariosInactivos();
    this.cargando = false;
  }
}
