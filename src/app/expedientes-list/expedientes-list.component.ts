import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-expedientes-list',
  templateUrl: './expedientes-list.component.html',
  styleUrls: ['./expedientes-list.component.scss']
})
export class ExpedientesListComponent implements AfterViewInit {
  @ViewChild('searchTerm') searchTerm: any;
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
  lstCas2Sala: Array<any> = [];
  lstCas4Sala: Array<any> = [];
  lstCarpFisc: Array<any> = [];

  constructor(
    private storage: AngularFireStorage
  ) {
    this.obtenerExpedientes();
  }

  ngAfterViewInit(): void {
    this.searchTerm.nativeElement.focus();
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
    this.lstCas2Sala = this.lstExpedientes
      .filter(x => x.sespecialidad == 'LABORAL')
      .filter(x => x.idtipodoc == 'CASACION-2DA-SALA');
    this.lstCas4Sala = this.lstExpedientes
      .filter(x => x.sespecialidad == 'LABORAL')
      .filter(x => x.idtipodoc == 'CASACION-4TA-SALA');
    this.lstCarpFisc = this.lstExpedientes
      .filter(x => x.idtipodoc == 'CARPETA-FISCAL');
    this.lstLaOtros = this.lstExpedientes
      .filter(x => x.sespecialidad == 'LABORAL')
      .filter(x => {
        if (x.idmateria == 'LAB-REPO') {
          return false;
        } else if (x.idmateria == 'LAB-PAGO-BSI-OBS') {
          return false;
        } else if (x.idmateria == 'LAB-INDE-PDYP-PIC') {
          return false;
        } else if (x.idtipodoc == 'CASACION-2DA-SALA') {
          return false;
        } else if (x.idtipodoc == 'CASACION-4TA-SALA') {
          return false;
        } else if (x.idtipodoc == 'CARPETA-FISCAL') {
          return false;
        } else {
          return true;
        }
      });
    this.lstFamil = this.lstExpedientes.filter(x => x.sespecialidad == 'FAMILIA');
    this.lstCivil = this.lstExpedientes.filter(x => x.sespecialidad == 'CIVIL');
    this.lstPenal = this.lstExpedientes.filter(x => x.sespecialidad == 'PENAL')
      .filter(x => x.idtipodoc == 'EXPEDIENTE-ORIGEN');
    this.lstConst = this.lstExpedientes.filter(x => x.sespecialidad == 'CONSTITUCIONAL');
  }

  filtrar(val: string) {
    let sterms = val.trim().toLowerCase().split(' ');

    sterms = sterms.filter(sterm => sterm.length >= 3);

    if (sterms.length == 0) {
      this.lstExpedientesFiltered = this.lstExpedientes;
      this.lModeFiltering = false;
      return;
    }

    this.lstExpedientesFiltered = this.lstExpedientes
      .filter(exp => {
        if (exp.idtipodoc == 'CASACION-2DA-SALA') {
          return false;
        } else if (exp.idtipodoc == 'CASACION-4TA-SALA') {
          return false;
        } else {
          return true;
        }
      })
      .filter(exp => {
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
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.scodigo.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;
        nMatchs = 0;

        sterms.forEach(sterm => {
          if (exp.smatchexp?.toLowerCase().includes(sterm)) nMatchs++;
        })
        if (nMatchs == sterms.length) lMatch = true;

        return lMatch;
      });
    this.lModeFiltering = true;
  }

}
