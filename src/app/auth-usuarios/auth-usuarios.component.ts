import { Component, inject, OnInit } from '@angular/core';
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
      const querySnapshot = await this.authService.getUsuariosActivos();

      this.usuarios = querySnapshot.docs.map((doc: any) => ({ ...doc.data() }))

      console.log(this.usuarios)
    } catch (error) {
      console.log('ocurrio un error al leer usuarios')
      throw error
    } finally {
      this.cargando = false;
    }
  }
}
