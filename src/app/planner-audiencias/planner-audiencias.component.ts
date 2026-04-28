import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
  limit,
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Audiencia } from '../_interfaces/audiencia';

@Component({
  selector: 'app-planner-audiencias',
  templateUrl: './planner-audiencias.component.html',
  styleUrl: './planner-audiencias.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class PlannerAudienciasComponent implements OnInit {
  private db = inject(Firestore);

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

    const colRef = collection(this.db, 'audiencias');
    const q = query(colRef, where('sfecha', '>=', inicio), where('sfecha', '<=', final));
    const querySnapshot = await getDocs(q);
    
    this.lstAudiencias = querySnapshot.docs.map(doc => {
      const audiencia: any = doc.data();
      
      // Fecha mas legible
      let sDay = audiencia.sfecha.slice(8, 10);
      let sMonth = audiencia.sfecha.slice(5, 7);
      let sYear = audiencia.sfecha.slice(0, 4);

      // Detecion de enlace meet en el url
      const regexMeet = /meet\.google\.com\/[a-z]{3}-{0,1}[a-z]{4}-{0,1}[a-z]{3}/i;
      let prefijo = audiencia.surl;
      let cuerpo = '';
      let sufijo = '';
      const texto: string = audiencia.surl;
      const enlace: RegExpMatchArray | null = texto.match(regexMeet);

      // Existe link
      if (enlace) {
        let indiceInicio: number = texto.indexOf(enlace[0])

        prefijo = texto.slice(0, indiceInicio);
        cuerpo = texto.slice(indiceInicio, indiceInicio + 28).toLowerCase();
        sufijo = texto.slice(indiceInicio + 29);
      }

      // Dia de la semana y mes del año
      let dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      let meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
      let fecha = new Date(`${audiencia.sfecha}T00:00`);
      let numeroDiaSemana = fecha.getUTCDay();
      let numeroMes = fecha.getMonth();
      let nombreDia = dias[numeroDiaSemana];
      let nombreMes = meses[numeroMes];
      let numeroDia = fecha.getDate();
      let numeroAnio = fecha.getFullYear();

      return {
        ...audiencia,
        sfechauser: sDay + '/' + sMonth + '/' + sYear,
        sprefijolink: prefijo,
        scuerpolink: cuerpo,
        ssufijolink: sufijo,
        nombreDia,
        nombreMes,
        numeroDia: sDay,
        numeroAnio,
      }
    }).sort((a, b) => {
      let sfecha1 = a.sfecha + '-' + a.shora;
      let sfecha2 = b.sfecha + '-' + b.shora;
      return sfecha1 < sfecha2 ? -1 : 1;
    });

    // Crear las lista filtrando segun area de la audiencia
    this.lstAudLaboral = this.lstAudiencias.filter(a => a.sespecialidad == 'LABORAL' || a.sespecialidad == 'CONSTITUCIONAL');
    this.lstAudFamilia = this.lstAudiencias.filter(a => a.sespecialidad == 'FAMILIA');
    this.lstAudCivil = this.lstAudiencias.filter(a => a.sespecialidad == 'CIVIL');
    this.lstAudPenal = this.lstAudiencias.filter(a => a.sespecialidad == 'PENAL');

    this.lLoading = false;
  }

}
