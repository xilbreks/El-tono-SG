import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { AuthService } from '../auth.service';
import { Usuario } from '../_interfaces/usuario';

@Component({
  selector: 'app-auth-usuarios',
  templateUrl: './auth-usuarios.component.html',
  styleUrl: './auth-usuarios.component.scss',
  standalone: true,
  imports: [AsyncPipe, RouterLink]
})
export class AuthUsuariosComponent implements OnInit {
  authService = inject(AuthService);

  usuarios: Usuario[] = [];

  cargando = true;

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  async getUsuarios() {
    try {
      const usuarios = await this.authService.getUsuariosActivos();

      this.usuarios = usuarios.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }))
    } catch (error) {

    } finally {
      this.cargando = false;
    }
  }
}
