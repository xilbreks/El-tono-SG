import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Cuota } from '../_interfaces/cuota';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-planner-cuotas',
  templateUrl: './planner-cuotas.component.html',
  styleUrl: './planner-cuotas.component.scss',
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ]
})
export class PlannerCuotasComponent implements OnInit {
  appService = inject(AppService);

  cuotas: Cuota[] = [];
  frmDate: FormGroup;
  cargando: boolean = true;

  today: string = '';

  constructor(
    private modalService: NgbModal,
  ) {
    this.frmDate = new FormGroup({
      inicio: new FormControl(null, Validators.required),
      final: new FormControl(null, Validators.required),
      mes: new FormControl(null, Validators.required),
      anio: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.setHoy();
    this.cambiarFecha();
  }

  setHoy() {
    const dHoy = new Date();
    const time = dHoy.getTime() - 18000000;
    this.today = (new Date(time)).toISOString().slice(0, 10);
    const nYear = dHoy.getFullYear();
    let nMonth: any = dHoy.getMonth() + 1;

    if (nMonth < 10) {
      nMonth = '0' + nMonth;
    }

    this.frmDate.patchValue({
      mes: nMonth,
      anio: nYear
    });
  }

  cambiarFecha() {
    let anio = this.frmDate.value['anio'];
    let mes = this.frmDate.value['mes'];

    let nLastDay = (new Date(anio, mes, 0)).getDate();

    let primerDia = `${anio}-${mes}-01`;
    let ultimoDia = `${anio}-${mes}-${nLastDay}`;

    this.frmDate.patchValue({
      inicio: primerDia,
      final: ultimoDia,
    });

    this.obtenerCuotas();
  }

  async obtenerCuotas() {
    this.cargando = true;
    let inicio = this.frmDate.controls['inicio'].value;
    let final = this.frmDate.controls['final'].value;

    // console.log(`Desde ${inicio} hasta ${final}`);

    const cuotas = await this.appService.plannerVencimientos(inicio, final);
    this.cuotas = cuotas;

    this.cargando = false;
  }

}

