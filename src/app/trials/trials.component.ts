import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';

interface Trial {
  idaudiencia: string;
  sexpediente: string;
  sespecialidad: string;
  sdemandante: string;
  sdemandado: string;
  sfecha: string;
  shora: string;
  stipo: string;
  sencargados: string;
  surl: string;

  // Solo para vistas
  sfechauser: string;
  sprefijolink: string;
  ssufijolink: string;
  scuerpolink: string;
  nombreDia: string;      // Dia de la semana, ej: "Lunes", "Martes", ...
  nombreMes: string;      // Mes del año, ej: "Enero", "Febrero", ...
  numeroDia: string;      // Numero del dia del mes
  numeroAnio: number;     // Numero de año
}

@Component({
  selector: 'app-trials',
  templateUrl: './trials.component.html',
  styleUrl: './trials.component.scss'
})
export class TrialsComponent implements OnInit {
  lstAudiencias: Trial[] = [];
  lstAudLaboral: Trial[] = [];
  lstAudFamilia: Trial[] = [];
  lstAudCivil: Trial[] = [];
  lstAudPenal: Trial[] = [];
  lLoading = false;

  frmDate: FormGroup;

  today: string = '';

  constructor(
    private db: AngularFirestore,
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

    let audiencias = await this.getTrialsDB(inicio, final);

    this.lstAudiencias = audiencias.map(aud => {
      // Fecha mas legible
      let sDay = aud.sfecha.slice(8, 10);
      let sMonth = aud.sfecha.slice(5, 7);
      let sYear = aud.sfecha.slice(0, 4);

      // Detecion de enlace meet en el url
      const regexMeet = /meet\.google\.com\/[a-z]{3}-{0,1}[a-z]{4}-{0,1}[a-z]{3}/i;
      let prefijo = aud.surl;
      let cuerpo = '';
      let sufijo = '';
      const texto: string = aud.surl;
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
      let fecha = new Date(`${aud.sfecha}T00:00`);
      let numeroDiaSemana = fecha.getUTCDay();
      let numeroMes = fecha.getMonth();
      let nombreDia = dias[numeroDiaSemana];
      let nombreMes = meses[numeroMes];
      let numeroDia = fecha.getDate();
      let numeroAnio = fecha.getFullYear();

      return {
        ...aud,
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

  // Operaciones a la base de datos

  /**
   * Obtiene el listado de audiencias de una fecha determinada, mes
   * @param inicio primer dia del mes
   * @param final ultimo dia del mes
   */
  getTrialsDB(inicio: string, final: string): Promise<any[]> {
    let obs = this.db.collection('audiencias', ref => {
      return ref.where('sfecha', '>=', inicio)
        .where('sfecha', '<=', final)
    }).get();

    return firstValueFrom(obs).then(snapshot => {
      let audiencias: any[] = [];
      snapshot.forEach(doc => audiencias.push(doc.data()));

      return audiencias;
    });
  }

}