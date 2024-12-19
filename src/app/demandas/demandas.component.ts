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

  // Solo para vistas
  sfechalimiteUser: string;
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
  user: string | null;
  lViewMode = true;

  frmNewDemanda: FormGroup;
  frmEditDemanda: FormGroup;

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
    })
  }

  ngOnInit(): void {
    this.getDemandas();
  }

  getDemandas() {
    this.isLoading = true;
    this.lstDemandas = [];

    let obs = this.db.collection('demandas').get();
    firstValueFrom(obs).then(snapshot => {
      snapshot.forEach((doc: any) => {
        let demanda: Demanda = doc.data();
        let day = demanda.sfechalimite.slice(8, 10);
        let month = demanda.sfechalimite.slice(5, 7);
        let year = demanda.sfechalimite.slice(0, 4);

        this.lstDemandas.push({
          ...demanda,
          sfechalimiteUser: `${day}/${month}/${year}`
        })
      });
    }).catch(err => {
      window.alert('error');
    }).finally(() => {
      this.isLoading = false;
    })
  }

  openModalAddDemanda (modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md'
    })
  }

  openModalEditDemanda (demanda: Demanda, modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md'
    })
  }

  openModalDeleteDemanda (demanda: Demanda, modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md'
    })
  }

  addDemanda() {
    console.log('agregar demanda')
    this.frmNewDemanda.reset();
    this.modalService.dismissAll();
  }

  // Cambia de modo

  cambiarModo() {
    this.lViewMode = !this.lViewMode;
  }
}
