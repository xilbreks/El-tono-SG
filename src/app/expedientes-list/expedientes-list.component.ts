import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-expedientes-list',
  templateUrl: './expedientes-list.component.html',
  styleUrls: ['./expedientes-list.component.scss']
})
export class ExpedientesListComponent {
  lstExpedientes: Array<any> = [];
  lstExpedientesFiltered: Array<any> = [];
  lModeFiltering = false;
  sFecha: string = '';
  lLoading = false;

  lstLaRepo: Array<any> = [];
  lstLaIndem: Array<any> = [];
  lstLaPBSE: Array<any> = [];
  lstLaOtros: Array<any> = [];
  lstFamil: Array<any> = [];
  lstCivil: Array<any> = [];
  lstPenal: Array<any> = [];
  lstConst: Array<any> = [];

  constructor(
    private storage: AngularFireStorage
  ) {
    this.obtenerExpedientes();
  }

  obtenerExpedientes() {
    this.lLoading = true;
    let obs = this.storage.ref('/expedientes/expedientes.json')
      .getDownloadURL()
      .subscribe(url => {
        fetch(url)
          .then(res => {
            return res.json();
          })
          .then(expedientes => {
            this.sFecha = expedientes.shift().sdate;
            this.lstExpedientes = expedientes;

            this.separarAreas();
          }).catch(err => {
            console.log('ERROR', err);
          }).finally(() => {
            this.lLoading = false;
          });

        obs.unsubscribe();
      })
  }

  separarAreas() {
    this.lstLaRepo = this.lstExpedientes
      .filter(x => x.sespecialidad == 'LABORAL')
      .filter(x => x.idmateria == 'LAB-REPO');
    this.lstLaIndem = this.lstExpedientes
      .filter(x => x.sespecialidad == 'LABORAL')
      .filter(x => x.idmateria == 'LAB-INDE-PDYP-PIC');
    this.lstLaPBSE = this.lstExpedientes
      .filter(x => x.sespecialidad == 'LABORAL')
      .filter(x => x.idmateria == 'LAB-PAGO-BSI-OBS');
    this.lstLaOtros = this.lstExpedientes
      .filter(x => x.sespecialidad == 'LABORAL')
      .filter(x => {
        if (x.idmateria == 'LAB-REPO') {
          return false;
        } else if (x.idmateria == 'LAB-PAGO-BSI-OBS') {
          return false;
        } else if (x.idmateria == 'LAB-INDE-PDYP-PIC') {
          return false;
        } else {
          return true;
        }
      });
    this.lstFamil = this.lstExpedientes
      .filter(x => x.sespecialidad == 'FAMILIA');
    this.lstCivil = this.lstExpedientes
      .filter(x => x.sespecialidad == 'CIVIL');
    this.lstPenal = this.lstExpedientes
      .filter(x => x.sespecialidad == 'PENAL');
    this.lstConst = this.lstExpedientes
      .filter(x => x.sespecialidad == 'CONSTITUCIONAL');
  }

  filtrar(val: string) {
    let sterms = val.trim().toLowerCase().split(' ');

    sterms = sterms.filter(sterm => sterm.length >= 3);

    if (sterms.length == 0) {
      this.lstExpedientesFiltered = this.lstExpedientes;
      this.lModeFiltering = false;
      return;
    }

    this.lstExpedientesFiltered = this.lstExpedientes.filter(exp => {
      let lMatch = false;
      let nMatchs = 0;

      sterms.forEach(sterm => {
        if (exp.sdemandado.toLowerCase().includes(sterm)) nMatchs++;
      })
      if (nMatchs == sterms.length) lMatch = true;
      nMatchs = 0;

      sterms.forEach(sterm => {
        if (exp.sdemandante.toLowerCase().includes(sterm)) nMatchs++;
      })
      if (nMatchs == sterms.length) lMatch = true;
      nMatchs = 0;

      sterms.forEach(sterm => {
        if (exp.sexpediente.toLowerCase().includes(sterm)) nMatchs++;
      })
      if (nMatchs == sterms.length) lMatch = true;

      return lMatch;
    });
    this.lModeFiltering = true;
  }

}