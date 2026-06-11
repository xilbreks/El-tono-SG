import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Cita } from '../_interfaces/cita';
import { AppService } from '../app.service';

@Component({
  selector: 'app-planner-citas',
  templateUrl: './planner-citas.component.html',
  styleUrl: './planner-citas.component.scss',
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class PlannerCitasComponent implements OnInit {
  appService = inject(AppService);

  lstCitas: Cita[] = [];
  lLoading = false;
  lUpdating = false;

  frmDate: FormGroup;
  frmAcuerdos: FormGroup;

  today: string = '';

  constructor(
    private modalService: NgbModal,
  ) {
    /*******************************
     ******* FORM DATE RANGE *******
     *******************************/
    this.frmDate = new FormGroup({
      sinicio: new FormControl(null, Validators.required),
      sfinal: new FormControl(null, Validators.required),
      smes: new FormControl(null, Validators.required),
      sanio: new FormControl(null, Validators.required),
    });
    /**
     * Form Control de Acuerdos
     */
    this.frmAcuerdos = new FormGroup({
      idcita: new FormControl(null, Validators.required),
      sacuerdos: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.setHoy();
    this.cambiarFecha();
  }

  setHoy() {
    const dHoy = new Date();
    const time = (dHoy.getTime() - 18000000);
    this.today = (new Date(time)).toISOString().slice(0, 10);
    // console.log(this.today)

    const nYear = dHoy.getFullYear();
    let nMonth: any = dHoy.getMonth() + 1;

    if (nMonth < 10) {
      nMonth = '0' + nMonth;
    }

    this.frmDate.patchValue({
      smes: nMonth,
      sanio: nYear
    });
  }

  cambiarFecha() {
    let nanio = this.frmDate.value['sanio'];
    let nmes = this.frmDate.value['smes'];

    let nLastDay = (new Date(nanio, nmes, 0)).getDate();

    let sFirstDay = `${nanio}-${nmes}-01`;
    let sLastDay = `${nanio}-${nmes}-${nLastDay}`;

    this.frmDate.patchValue({
      sinicio: sFirstDay,
      sfinal: sLastDay,
    });

    this.getCitas(true);
  }

  async getCitas(indicator: boolean) {
    this.lLoading = indicator;
    let sinicio = this.frmDate.controls['sinicio'].value;
    let sfinal = this.frmDate.controls['sfinal'].value;

    const citas = await this.appService.citasPorRangoFecha(sinicio, sfinal);

    this.lstCitas = citas;
    this.lLoading = false;
  }

  openModalAcuerdos(idcita: string, sacuerdos: string, modal: any) {
    this.frmAcuerdos.setValue({
      idcita: idcita,
      sacuerdos: sacuerdos,
    })

    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  async updateAcuerdos() {
    this.lUpdating = true;
    let idcita = this.frmAcuerdos.value['idcita'];
    let sacuerdos = this.frmAcuerdos.value['sacuerdos'].trim();
    const payload = {
      sacuerdos: sacuerdos,
    }

    const ok = await this.appService.actualizarCita(idcita, payload);

    this.modalService.dismissAll();
    this.lUpdating = false;
    this.getCitas(false);
  }
}
