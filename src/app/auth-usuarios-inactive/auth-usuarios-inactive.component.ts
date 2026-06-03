import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AuthService } from '../auth.service';
import { Usuario } from '../_interfaces/usuario';

@Component({
  selector: 'app-auth-usuarios-inactive',
  templateUrl: './auth-usuarios-inactive.component.html',
  styleUrl: './auth-usuarios-inactive.component.scss',
  standalone: true,
  imports: [RouterLink, DatePipe]
})
export class AuthUsuariosInactiveComponent implements OnInit {
  authService = inject(AuthService);

  usuarios: Usuario[] = [];

  cargando = true;

  constructor() { }

  ngOnInit(): void {
    this.getUsuariosInactivos();
  }

  async getUsuariosInactivos() {
    try {
      const querySnapshot = await this.authService.getUsuariosInactivos();

      this.usuarios = querySnapshot.docs.map((doc: any) => ({ ...doc.data() }));
      // console.log(this.usuarios)
    } catch (error) {
      console.log('ocurrio un error al recuperar usuarios inactivos')
      throw error;
    } finally {
      this.cargando = false;
    }
  }
}
