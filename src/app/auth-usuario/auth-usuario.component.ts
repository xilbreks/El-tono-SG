import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from '../_interfaces/usuario';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormArrayName } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-auth-usuario',
  templateUrl: './auth-usuario.component.html',
  styleUrl: './auth-usuario.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe]
})
export class AuthUsuarioComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private modalService = inject(NgbModal)

  uid!: string | null;
  usuario: Usuario | null = null;

  cargando = true;
  actualizando = false;

  frmUsuario: FormGroup;

  constructor() {
    this.frmUsuario = new FormGroup({
      rol: new FormControl(null, Validators.required),
      departamento: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.uid = this.route.snapshot.paramMap.get('id');
    this.getUsuario();
  }

  async getUsuario() {
    try {
      this.cargando = true;
      const uid = this.uid;
      if (!uid) {
        console.log('No existe usuario')
        return;
      }
      const docSnap = await this.authService.getUsuario(uid);
      if (docSnap.exists()) {
        const datosUsuario: any = docSnap.data();
        this.usuario = datosUsuario;
      } else {
        console.log('No existe usuario')
      }
    } catch (error) {
      console.log('ocurrio un error al ller usuario')
    } finally {
      this.cargando = false;
    }
  }

  abrirModalCambiarRol(modal: any) {
    this.modalService.open(modal, {
      size: 'md',
      backdrop: 'static'
    });
  }

  async modificarRol() {
    try {
      this.actualizando = true;

      if (!this.uid) return;

      const rol = this.frmUsuario.controls['rol'].value;
      const departamento = this.frmUsuario.controls['departamento'].value;
      await this.authService.modificarDatos(this.uid, {rol, departamento});

      // console.log('se modificó los datos exitosamente')
      this.getUsuario();
    } catch (error) {
      console.log('ocurrio un error al modificar datos', error)
    } finally {
      this.modalService.dismissAll();
      this.actualizando = false;
    }
  }

  abrirModalConfirmacion(modal: any) {
    this.modalService.open(modal, {
      size: 'md',
      backdrop: 'static'
    });
  }

  async darDeAlta() {
    try {
      this.actualizando = true;
      const uid = this.uid;
      if (!uid) return;
      await this.authService.darDeAlta(uid);
      // console.log('se dio de alta con exito')
      this.getUsuario();
    } catch (error) {
      console.log('ocurrio un error al car de alta', error)
    } finally {
      this.modalService.dismissAll();
      this.actualizando = false;
    }
  }

  async darDeBaja() {
    try {
      this.actualizando = true;
      const uid = this.uid;
      if (!uid) return;
      await this.authService.darDeBaja(uid);
      // console.log('se dio de baja con exito')
      this.getUsuario();
    } catch (error) {
      console.log('ocurrio un error al car de baja', error)
    } finally {
      this.modalService.dismissAll();
      this.actualizando = false;
    }
  }

  async cambiarNombre(input: HTMLInputElement) {
    if (!input.value) return;
    let nombre = input.value.trim();
    if (nombre.length < 5) {
      alert('Nombre muy corto')
      return;
    }
    if (nombre.length > 25) {
      alert('Nombre muy largo')
      return;
    }

    try {
      this.actualizando = true;
      const uid = this.uid;
      if (!uid) return;
      await this.authService.cambiarNombre(uid, nombre)
      this.getUsuario();
      // console.log('Se cambio correctamente el nombre')
    } catch (error) {
      console.log('Ocurrio un error al cambiar el nombre')
    } finally {
      this.modalService.dismissAll();
      this.actualizando = true;
    }

  }

}
