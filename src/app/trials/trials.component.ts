import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Audience {
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
}

@Component({
  selector: 'app-trials',
  templateUrl: './trials.component.html',
  styleUrl: './trials.component.scss'
})
export class TrialsComponent implements OnInit {
  lstAudiencias: Audience[] = [];
  lstAudLaboral: Audience[] = [];
  lstAudFamilia: Audience[] = [];
  lstAudCivil: Audience[] = [];
  lstAudPenal: Audience[] = [];
  lLoading = false;

  frmDate: FormGroup;

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

  getAudiencias() {
    this.lLoading = true;
    this.lstAudiencias = [];
    let sinicio = this.frmDate.controls['sinicio'].value;
    let sfinal = this.frmDate.controls['sfinal'].value;

    let obs = this.db.collection('audiencias', ref => {
      return ref.where('sfecha', '>=', sinicio)
        .where('sfecha', '<=', sfinal)
    }).valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstAudiencias = res.map(aud => {
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

          return {
            ...aud,
            sfechauser: sDay + '/' + sMonth + '/' + sYear,
            sprefijolink: prefijo,
            scuerpolink: cuerpo,
            ssufijolink: sufijo,
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
        obs.unsubscribe();
      })
  }


}