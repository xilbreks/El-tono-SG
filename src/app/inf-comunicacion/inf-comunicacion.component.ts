import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-inf-comunicacion',
  templateUrl: './inf-comunicacion.component.html',
  styleUrl: './inf-comunicacion.component.scss'
})
export class InfComunicacionComponent {
  selectedYear: number = 0;
  selectedWeek: number = 0;

  lstChats: any = [];
  lLoading = false;

  frmDate: FormGroup;

  constructor(
    private db: AngularFirestore,
  ) {
    /*******************************
     ******* FORM DATE RANGE *******
    *******************************/
    this.frmDate = new FormGroup({
      sstart: new FormControl(null, Validators.required),
      send: new FormControl(null, Validators.required),
      sweek: new FormControl(null, Validators.required),
      syear: new FormControl(null, Validators.required),
    });

    this.getDateWeek();
    this.setCurrentYearWeek();
    this.getWeekDateRange();
  }

  getDateWeek() {
    const fecha: Date = new Date();
    const inicioAño: Date = new Date(fecha.getFullYear(), 0, 1); // 1 de enero del año en curso

    // Calcular la diferencia en milisegundos y luego convertirla a días
    const diferenciaTiempo: number = fecha.getTime() - inicioAño.getTime();
    const diferenciaDias: number = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

    // Calcular el número de la semana, ajustando para que la semana comience en lunes
    const numeroSemana: number = Math.ceil((diferenciaDias + inicioAño.getDay() + 1) / 7);

    this.selectedWeek = numeroSemana;
  }

  setCurrentYearWeek() {
    this.frmDate.patchValue({
      syear: (new Date()).getFullYear(),
      sweek: this.selectedWeek,
    })
  }

  getWeekDateRange() {
    const weekNumber: number = this.frmDate.value['sweek'];
    const year: number = this.frmDate.value['syear'];

    const firstDayOfYear = new Date(year, 0, 1); // 1 de enero del año especificado
    const daysOffset = (weekNumber - 1) * 7; // Días desde el inicio del año

    // Calcula el inicio de la semana (lunes)
    const weekStart = new Date(firstDayOfYear);
    weekStart.setDate(weekStart.getDate() + daysOffset - (firstDayOfYear.getDay() === 0 ? 6 : firstDayOfYear.getDay() - 1));

    // Calcula el final de la semana (domingo)
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    this.frmDate.patchValue({
      sstart: weekStart.toISOString().split('T')[0],
      send: weekEnd.toISOString().split('T')[0]
    })

    this.getChats()
  }

  // Recuperar los chats

  getChats() {
    this.lLoading = true;
    this.lstChats = [];
    let sinicio = this.frmDate.controls['sstart'].value;
    let sfinal = this.frmDate.controls['send'].value;

    let obs = this.db.collection('chats', ref => {
      return ref.where('sfecha', '>=', sinicio)
        .where('sfecha', '<=', sfinal)
    }).valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstChats = res.map(chat => {
          let sDay = chat.sfecha.slice(8, 10);
          let sMonth = chat.sfecha.slice(5, 7);
          let sYear = chat.sfecha.slice(0, 4);
          return {
            ...chat,
            sfechauser: sDay + '/' + sMonth + '/' + sYear
          }
        }).sort((a, b) => {
          let sfecha1 = a.sfecha + '-' + a.shora;
          let sfecha2 = b.sfecha + '-' + b.shora;
          return sfecha1 < sfecha2 ? -1 : 1;
        });

        this.lLoading = false;
        obs.unsubscribe();
      })
  }

}