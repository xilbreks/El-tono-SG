import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cliente-new',
  templateUrl: './cliente-new.component.html',
  styleUrls: ['./cliente-new.component.scss']
})
export class ClienteNewComponent {
  frmExpediente: FormGroup;
  lCreating: boolean = false;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private router: Router,
  ) {
    this.titleService.setTitle('Registrar Cliente');

    this.frmExpediente = new FormGroup({
      spaterno: new FormControl(null, Validators.required),
      smaterno: new FormControl(null, Validators.required),
      snombres: new FormControl(null, Validators.required),
      sdni: new FormControl(null, Validators.required),
      scelular: new FormControl(null, Validators.required),
      sdireccion: new FormControl(null, Validators.required),
      sfnac: new FormControl(null, Validators.required),
      stipo: new FormControl('persona-natural', Validators.required),
      sobs: new FormControl(null, Validators.required),
    });
  }

  registrarCliente() {
    this.lCreating = true;
    let sap: string = this.frmExpediente.value['spaterno'].trim().toUpperCase();
    let sam: string = this.frmExpediente.value['smaterno'].trim().toUpperCase();
    let snb: string = this.frmExpediente.value['snombres'].trim().toUpperCase();

    sap = sap.replace(' ', '-');
    sam = sam.replace(' ', '-');
    snb = snb.replace(' ', '-');
    let idcliente = sap + '-' + sam + '-' + snb;

    this.db
      .collection('clientes')
      .doc(idcliente)
      .set({
        idcliente: idcliente,
        spaterno: this.frmExpediente.value['spaterno'].trim().toUpperCase(),
        smaterno: this.frmExpediente.value['smaterno'].trim().toUpperCase(),
        snombres: this.frmExpediente.value['snombres'].trim().toUpperCase(),
        sdni: this.frmExpediente.controls['sdni'].value.trim(),
        sdireccion: this.frmExpediente.controls['sdireccion'].value.trim(),
        scelular: this.frmExpediente.controls['scelular'].value.trim(),
        sfnac: this.frmExpediente.controls['sfnac'].value.trim(),
        sobs: this.frmExpediente.controls['sobs'].value.trim(),
        stipo: this.frmExpediente.controls['stipo'].value.trim(),
        lactive: true,
      })
      .then((x) => {
        // this.router.navigate(['/cliente/', idcliente]);
        window.alert('registrado exitosamente');
      })
      .catch(() => {
        window.alert('ERROR al registrar cliente');
      })
      .finally(() => {
        this.lCreating = false;
      });
  }
}
