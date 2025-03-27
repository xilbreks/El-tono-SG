import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';

interface Demanda {
  iddemanda: string;
  sespecialidad: string;
  starea: string;
  sresponsables: string;
  sestado: string;
  sfechalimite: string;
  sobservaciones: string;
  nfechacreacion: number;
  sfechaasignacion: string;

  // Solo para vistas
  sfechalimiteUser: string;
  scolor: string;
}

@Component({
  selector: 'app-demandas',
  templateUrl: './demandas.component.html',
  styleUrl: './demandas.component.scss'
})
export class DemandasComponent implements OnInit {
  lstDemandas: Demanda[] = [];
  isLoading = false;
  lAdding = false;
  lUpdating = false;
  lDeleting = false;
  lMarking = false;
  user: string | null;
  lViewMode = true;

  frmNewDemanda: FormGroup;
  frmEditDemanda: FormGroup;
  frmDeleteDemanda: FormGroup;
  frmMarkDemanda: FormGroup;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.user = localStorage.getItem('idusuario');
    this.frmNewDemanda = new FormGroup({
      'sespecialidad': new FormControl(null, Validators.required),
      'starea': new FormControl(null, Validators.required),
      'sresponsables': new FormControl(null, Validators.required),
      'sfechalimite': new FormControl(null, Validators.required),
    });
    this.frmEditDemanda = new FormGroup({
      'iddemanda': new FormControl(null, Validators.required),
      'sespecialidad': new FormControl(null, Validators.required),
      'starea': new FormControl(null, Validators.required),
      'sresponsables': new FormControl(null, Validators.required),
      'sfechalimite': new FormControl(null, Validators.required),
    });
    this.frmDeleteDemanda = new FormGroup({
      'iddemanda': new FormControl(null, Validators.required),
    });
    this.frmMarkDemanda = new FormGroup({
      'iddemanda': new FormControl(null, Validators.required),
      'sestado': new FormControl(null, Validators.required),
      'sobservaciones': new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getDemandas(true);
  }

  getDemandas(indicator: boolean) {
    this.isLoading = indicator;

    let obs = this.db.collection('demandas', ref => ref.limit(100)).get();
    firstValueFrom(obs).then(snapshot => {
      this.lstDemandas = [];

      snapshot.forEach((doc: any) => {
        let demanda: Demanda = doc.data();
        let day = demanda.sfechalimite.slice(8, 10);
        let month = demanda.sfechalimite.slice(5, 7);
        let year = demanda.sfechalimite.slice(0, 4);

        let dtoday = new Date();
        dtoday.setHours(0, 0, 0, 0);
        let dlimite = new Date(demanda.sfechalimite+'T00:00:00');
        let scolor = 'VERDE';
        if (demanda.sestado == 'PENDIENTE') {
          if (dlimite < dtoday) {
            scolor = 'ROJO';
          } else {
            scolor = 'NARANJA';
          }
        }

        this.lstDemandas.push({
          ...demanda,
          sfechalimiteUser: `${day}/${month}/${year}`,
          scolor: scolor,
        })
      });

      this.lstDemandas.sort((a, b) => a.sfechalimite > b.sfechalimite ? 1 : -1)
    }).catch(err => {
      window.alert('error');
    }).finally(() => {
      this.isLoading = false;
    })
  }

  openModalAddDemanda(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md'
    })
  }

  openModalEditDemanda(demanda: Demanda, modal: any) {
    this.frmEditDemanda.setValue({
      iddemanda: demanda.iddemanda,
      sespecialidad: demanda.sespecialidad,
      starea: demanda.starea,
      sresponsables: demanda.sresponsables,
      sfechalimite: demanda.sfechalimite,
    });

    this.modalService.open(modal, {
      windowClass: 'modal-md'
    })
  }

  openModalDeleteDemanda(demanda: Demanda, modal: any) {
    this.frmDeleteDemanda.setValue({
      iddemanda: demanda.iddemanda,
    })

    this.modalService.open(modal, {
      windowClass: 'modal-md'
    })
  }

  openModalMarkDemanda(demanda: Demanda, modal: any) {
    this.frmMarkDemanda.setValue({
      iddemanda: demanda.iddemanda,
      sestado: demanda.sestado,
      sobservaciones: demanda.sobservaciones,
    })

    this.modalService.open(modal, {
      windowClass: 'modal-md'
    })
  }

  addDemanda() {
    this.lAdding = true;

    this.agregarDemanda().then(() => {
      this.modalService.dismissAll();
      this.frmNewDemanda.reset();
      this.getDemandas(true);
    }).catch(() => {
      window.alert('error al agregar demanda');
    }).finally(() => {
      this.lAdding = false;
    });
  }

  editDemanda() {
    this.lUpdating = true;

    this.modificarDemanda().then(() => {
      this.modalService.dismissAll();
      this.frmEditDemanda.reset();
      this.getDemandas(false);
    }).catch(() => {
      window.alert('error al modificar demanda');
    }).finally(() => {
      this.lUpdating = false;
    });
  }

  deleteDemanda() {
    this.lDeleting = true;

    this.eliminarDemanda().then(() => {
      this.modalService.dismissAll();
      this.frmDeleteDemanda.reset();
      this.getDemandas(false);
    }).catch(() => {
      window.alert('error al eliminar demanda');
    }).finally(() => {
      this.lDeleting = false;
    });
  }

  markDemanda() {
    this.lMarking = true;

    this.marcarDemanda().then(() => {
      this.modalService.dismissAll();
      this.frmMarkDemanda.reset();
      this.getDemandas(false);
    }).catch(() => {
      window.alert('error al grabar');
    }).finally(() => {
      this.lMarking = false;
    });
  }

  // Cambia de modo

  cambiarModo() {
    this.lViewMode = !this.lViewMode;
  }

  // OPERACIONES A LA BASE DE DATOS

  agregarDemanda(): Promise<void> {
    let fechahoy = new Date();
    let iddemanda = fechahoy.toISOString();

    const day = String(fechahoy.getDate()).padStart(2, '0');
    const month = String(fechahoy.getMonth() + 1).padStart(2, '0');
    const year = fechahoy.getFullYear();

    return this.db.collection('demandas').doc(iddemanda).set({
      iddemanda: iddemanda,
      sespecialidad: this.frmNewDemanda.value['sespecialidad'],
      starea: this.frmNewDemanda.value['starea'],
      sresponsables: this.frmNewDemanda.value['sresponsables'],
      sfechalimite: this.frmNewDemanda.value['sfechalimite'],
      sestado: 'PENDIENTE',
      sobservaciones: '-',
      nfechacreacion: fechahoy.getTime(),
      sfechaasignacion: `${day}/${month}/${year}`,
    })
  }

  modificarDemanda(): Promise<void> {
    let iddemanda = this.frmEditDemanda.value['iddemanda'];

    return this.db.collection('demandas').doc(iddemanda).update({
      sespecialidad: this.frmEditDemanda.value['sespecialidad'],
      starea: this.frmEditDemanda.value['starea'],
      sresponsables: this.frmEditDemanda.value['sresponsables'],
      sfechalimite: this.frmEditDemanda.value['sfechalimite'],
    })
  }

  eliminarDemanda(): Promise<void> {
    let iddemanda = this.frmDeleteDemanda.value['iddemanda'];

    return this.db.collection('demandas').doc(iddemanda).delete();
  }

  marcarDemanda(): Promise<void> {
    let iddemanda = this.frmMarkDemanda.value['iddemanda'];

    return this.db.collection('demandas').doc(iddemanda).update({
      sestado: this.frmMarkDemanda.value['sestado'],
      sobservaciones: this.frmMarkDemanda.value['sobservaciones'],
    })
  }

}
