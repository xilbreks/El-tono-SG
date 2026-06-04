import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormArrayName } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { AppService } from '../app.service';
import { Usuario } from '../_interfaces/usuario';

@Component({
  selector: 'app-auth-usuario',
  templateUrl: './auth-usuario.component.html',
  styleUrl: './auth-usuario.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe]
})
export class AuthUsuarioComponent implements OnInit {
  route = inject(ActivatedRoute);
  appService = inject(AppService);
  modalService = inject(NgbModal)

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
    if (this.uid) {
      this.getUsuario();
    } else {
      alert('id de usuario invalido')
    }
  }

  async getUsuario() {
    this.cargando = true;
    const uid: any = this.uid;
    this.usuario = await this.appService.usuario(uid);
    this.cargando = false;
  }

  abrirModalCambiarRol(modal: any) {
    this.modalService.open(modal, {
      size: 'md',
      backdrop: 'static'
    });
  }

  async modificarRol() {
    this.actualizando = true;
    const uid: any = this.uid;
    const rol = this.frmUsuario.controls['rol'].value;
    const departamento = this.frmUsuario.controls['departamento'].value;

    await this.appService.modificarRol(uid, { rol, departamento });
    this.getUsuario();

    this.modalService.dismissAll();
    this.actualizando = false;
  }

  abrirModalConfirmacion(modal: any) {
    this.modalService.open(modal, {
      size: 'md',
      backdrop: 'static'
    });
  }

  async darDeAlta() {
    this.actualizando = true;
    const uid: any = this.uid;
    await this.appService.darDeAlta(uid);
    this.getUsuario();
    this.modalService.dismissAll();
    this.actualizando = false;
  }

  async darDeBaja() {
    this.actualizando = true;
    const uid: any = this.uid;
    await this.appService.darDeBaja(uid);
    this.getUsuario();
    this.modalService.dismissAll();
    this.actualizando = false;
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

    this.actualizando = true;
    const uid: any = this.uid;
    await this.appService.cambiarNombre(uid, nombre)
    this.getUsuario();
    this.modalService.dismissAll();
    this.actualizando = false;
  }

}
