import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AppService } from '../app.service';
import { AsyncPipe } from '@angular/common';
import { Tareo } from '../_interfaces/tareo';

@Component({
  selector: 'app-tareo-mensual',
  templateUrl: './tareo-mensual.component.html',
  styleUrl: './tareo-mensual.component.scss',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
  ]
})
export class TareoMensualComponent {
  appService = inject(AppService);

  usuarios$ = this.appService.usuariosActivosStream();
  meses = [
    {
      nombre: 'Enero',
      inicio: '2026-01-01',
      final: '2026-01-31'
    },
    {
      nombre: 'Febrero',
      inicio: '2026-02-01',
      final: '2026-02-28'
    },
    {
      nombre: 'Marzo',
      inicio: '2026-03-01',
      final: '2026-03-31'
    },
    {
      nombre: 'Abril',
      inicio: '2026-04-01',
      final: '2026-04-30'
    },
    {
      nombre: 'Mayo',
      inicio: '2026-05-01',
      final: '2026-05-31'
    },
    {
      nombre: 'Junio',
      inicio: '2026-06-01',
      final: '2026-06-30'
    },
    {
      nombre: 'Julio',
      inicio: '2026-07-01',
      final: '2026-07-31'
    },
    {
      nombre: 'Agosto',
      inicio: '2026-08-01',
      final: '2026-08-31'
    },
    {
      nombre: 'Septiembre',
      inicio: '2026-09-01',
      final: '2026-09-30'
    },
    {
      nombre: 'Octubre',
      inicio: '2026-10-01',
      final: '2026-10-31'
    },
    {
      nombre: 'Noviembre',
      inicio: '2026-11-01',
      final: '2026-11-30'
    },
    {
      nombre: 'Diciembre',
      inicio: '2026-12-01',
      final: '2026-12-31'
    },
  ];

  fcUsuario: FormControl = new FormControl(null, Validators.required);
  fcMes: FormControl = new FormControl(null, Validators.required);

  cargando: boolean = false;
  rdts: any[] = [];
  tareasRdt: any[] = [];

  constructor() { }

  // Recuperar rdts
  async recuperarRdts() {
    this.cargando = true;

    let usuario: string = this.fcUsuario.value;
    let mes: string = this.fcMes.value;
    const inicioMes = mes.split(':')[0];
    const finalMes = mes.split(':')[1];

    console.log(`query: ${inicioMes} hasta ${finalMes} del usuario ${usuario}`);

    let rdts: Tareo[] = await this.appService.tareos(inicioMes, finalMes, usuario);

    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    rdts = rdts.map(doc => {

      const [anio, mes, dia] = doc.fecha.split('-').map(Number);
      const fechaUTC = new Date(Date.UTC(anio, mes - 1, dia));
      const numeroDia = fechaUTC.getUTCDay();
      const nombreDia = diasSemana[numeroDia];

      return {
        ...doc,
        diaSemana: nombreDia
      };
    })

    this.rdts = rdts;

    this.cargando = false;
  }


}
