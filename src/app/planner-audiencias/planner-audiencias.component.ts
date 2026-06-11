import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlannerAudienciaItemComponent } from '../planner-audiencia-item/planner-audiencia-item.component';

import { Audiencia } from '../_interfaces/audiencia';
import { AppService } from '../app.service';

@Component({
    selector: 'app-planner-audiencias',
    templateUrl: './planner-audiencias.component.html',
    styleUrl: './planner-audiencias.component.scss',
    imports: [CommonModule, ReactiveFormsModule,
        PlannerAudienciaItemComponent]
})
export class PlannerAudienciasComponent implements OnInit {
  appService = inject(AppService);

  lstAudiencias: Audiencia[] = [];
  lstAudLaboral: Audiencia[] = [];
  lstAudFamilia: Audiencia[] = [];
  lstAudCivil: Audiencia[] = [];
  lstAudPenal: Audiencia[] = [];
  lLoading = false;

  frmDate: FormGroup;

  today: string = '';

  constructor() {
    /*******************************
     ******* FORM DATE RANGE *******
     *******************************/
    this.frmDate = new FormGroup({
      sinicio: new FormControl(null, Validators.required),
      sfinal: new FormControl(null, Validators.required),
      smes: new FormControl(null, Validators.required),
      sanio: new FormControl(null, Validators.required),
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

    this.getAudiencias();
  }

  async getAudiencias() {
    this.lLoading = true;
    this.lstAudiencias = [];
    let inicio = this.frmDate.controls['sinicio'].value;
    let final = this.frmDate.controls['sfinal'].value;

    const audiencias = await this.appService.audienciasPorRangoFecha(inicio, final);
    
    this.lstAudiencias = audiencias;

    // Crear las lista filtrando segun area de la audiencia
    this.lstAudLaboral = this.lstAudiencias.filter(a => a.sespecialidad == 'LABORAL' || a.sespecialidad == 'CONSTITUCIONAL');
    this.lstAudFamilia = this.lstAudiencias.filter(a => a.sespecialidad == 'FAMILIA');
    this.lstAudCivil = this.lstAudiencias.filter(a => a.sespecialidad == 'CIVIL');
    this.lstAudPenal = this.lstAudiencias.filter(a => a.sespecialidad == 'PENAL');

    this.lLoading = false;
  }

}
