import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Audience {
  idaudiencia: string;
  sexpediente: string;
  sdemandante: string;
  sdemandado: string;
  sfecha: string;
  shora: string;
  stipo: string;
  sencargados: string;
  surl: string;
  sfechauser: string;
}

@Component({
  selector: 'app-audiences',
  templateUrl: './audiences.component.html',
  styleUrl: './audiences.component.scss'
})
export class AudiencesComponent implements OnInit {
  lstAudiencias: Audience[] = [];
  lLoading = false;


  frmDate: FormGroup;
  frmNewAudience: FormGroup;
  frmEditAudience: FormGroup;

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
    });

    /*******************************
     ****** FORM NEW AUDIENCE ******
     *******************************/
    this.frmNewAudience = new FormGroup({
      sexpediente: new FormControl(null, Validators.required),
      sdemandante: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      shora: new FormControl(null, Validators.required),
      stipo: new FormControl(null, Validators.required),
      sencargados: new FormControl(null, Validators.required),
      surl: new FormControl(null, Validators.required),
    });

    /*******************************
     ****** FORM NEW AUDIENCE ******
     *******************************/
    this.frmEditAudience = new FormGroup({
      idaudiencia: new FormControl(null, Validators.required),
      sexpediente: new FormControl(null, Validators.required),
      sdemandante: new FormControl(null, Validators.required),
      sdemandado: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      shora: new FormControl(null, Validators.required),
      stipo: new FormControl(null, Validators.required),
      sencargados: new FormControl(null, Validators.required),
      surl: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getPrimeroUltimoMes(new Date());
    this.getAudiencias();
  }

  getPrimeroUltimoMes(dHoy: Date) {
    let dFinMes = new Date(dHoy.getFullYear(), dHoy.getMonth() + 1, 0);

    let sMonth = ((dHoy.getMonth() + 1) >= 10) ? (dHoy.getMonth() + 1) : ('0' + (dHoy.getMonth() + 1));
    let sinicio = dHoy.getFullYear() + '-' + sMonth + '-' + '01';
    let sfinal = dHoy.getFullYear() + '-' + sMonth + '-' + dFinMes.getDate();

    this.frmDate.setValue({
      sinicio: sinicio,
      sfinal: sfinal
    });
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
        // FALTA ORDENAR LAS AUDIENCIAS
        this.lstAudiencias = res.map(aud => {
          let sDay = aud.sfecha.slice(8, 10);
          let sMonth = aud.sfecha.slice(5, 7);
          let sYear = aud.sfecha.slice(0, 4);
          return {
            ...aud,
            sfechauser: sDay + '/' + sMonth + '/' + sYear
          }
        })

        this.lLoading = false;
        obs.unsubscribe();
      })
  }

  cambiarFecha(event: any) {
    const input = event.target.value;

    let nDay = Number(input.slice(8, 10));
    let nMonth = Number(input.slice(5, 7));
    let nYear = Number(input.slice(0, 4));

    // Recuperar primer y ultimo día
    let dHoy = new Date(nYear, nMonth - 1, nDay);

    // Establecer primer y ultimo dia
    this.getPrimeroUltimoMes(dHoy);
    this.getAudiencias();
  }

  test(test: any) {
    console.log(test.target.value)
  }

}
