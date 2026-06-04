import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

import { AppService } from '../app.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrl: './auth-signup.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe]
})
export class AuthSignupComponent {
  // Injecciones
  appService = inject(AppService);
  router = inject(Router)

  registrando = false;
  frmUsuario: FormGroup;

  constructor() {
    this.frmUsuario = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      nick: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/)
      ])),
      email: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.email
      ])),
      pass: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]+$/)
      ])),
      departamento: new FormControl(null, Validators.required),
      rol: new FormControl(null, Validators.required),
    });
  }

  async registrarUsuario() {
    try {
      this.registrando = true;

      let nombre: string = this.frmUsuario.controls['nombre'].value.trim();
      let nick: string = this.frmUsuario.controls['nick'].value.trim();
      let email: string = this.frmUsuario.controls['email'].value.trim();
      let password: string = this.frmUsuario.controls['pass'].value.trim();

      let departamento: string = this.frmUsuario.controls['departamento'].value;
      let rol: string = this.frmUsuario.controls['rol'].value;

      await this.appService.registrarUsuario({
        nombre,
        nick,
        email,
        password,

        departamento,
        rol
      });

      alert('Se registró correctamente.\nVuelva a iniciar sesion.');

      this.router.navigate(['/logout']);
    } catch (error) {
      alert('Error al registra nuevo usuario: ' + error);
    } finally {
      this.registrando = false;
    }

  }

}
