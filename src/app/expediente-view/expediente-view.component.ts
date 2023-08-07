import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class ObjExpediente {
  sfechainicio: string = '';
  sexpediente: string = '';
  sdemandado: string = '';
  sdemandante: string = '';
  sespecialidad: string = '';
  sdistritojuris: string = '';
  sorganojuris: string = '';
  sespecialista: string = '';
  sjuez: string = '';
  smateria: string = '';
  ssumilla: string = '';
  sfechamodificacion: string = '';
  urlcontrato: string = '';
}

@Component({
  selector: 'app-expediente-view',
  templateUrl: './expediente-view.component.html',
  styleUrls: ['./expediente-view.component.scss']
})
export class ExpedienteViewComponent {
  sexpediente: string = '';
  objExpediente: ObjExpediente;
  lstHistorial: Array<any> = [];
  lUploadingContrato: boolean = false;
  urlDownloadContrato = null;
  lGeneratingUrlContrato = false;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private modalService: NgbModal,
    private storage: AngularFireStorage,
    route: ActivatedRoute
  ) {
    this.sexpediente = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle(this.sexpediente);
    this.objExpediente = new ObjExpediente();
    this.getExpediente();
    this.getHistorial();
  }

  getExpediente(): void {
    let observando =  this.db
      .collection('expedientes', ref => {
        return ref.where('sexpediente','==', this.sexpediente)
      })
      .valueChanges()
      .subscribe((val: any) => {
        this.objExpediente = new ObjExpediente();
        if (val.length > 0) {
          this.objExpediente = val[0];
        } else {
          window.alert('expediente no existe')
        }
        this.urlDownloadContrato = null;
        observando.unsubscribe();
      });
  }

  getHistorial(): void {
    let observando =  this.db
      .collection('tareas', ref => {
        return ref.where('sexpediente','==', this.sexpediente)
      })
      .valueChanges()
      .subscribe((tareas: Array<any>) => {
        tareas.reverse().forEach((tarea)=>{
          let fecha = new Date(Number(tarea.idtarea));
          this.lstHistorial.push({
            fech: new Intl.DateTimeFormat('es-ES', {day:'numeric',month: 'short'}).format(fecha),
            desc: tarea.sdeseje,
            user: tarea.idrdt.slice(11).toUpperCase().replace('-',' '),
            iter: tarea.niter,
            pend: tarea.sacceje,
            task: tarea.sdestarea
          });
        });

  
        console.log(tareas);
        
        observando.unsubscribe();
      });
  }

  public openNewTaskModal(modal: any): void {
    this.modalService.open(modal, {
      windowClass: 'modal'
    });
  }

  /**********************************************
   ************* BEGIN CONTRATO *****************
   *********************************************/

  openModalContrato(modal: any) {
    this.modalService.open(modal);
  }

  uploadContrato(file: any) {
    const contrato = file.files[0];
    console.log(contrato);
    if (!contrato) {
      window.alert('Seleccione un PDF');
      return;
    }
    if (contrato.type != 'application/pdf') {
      window.alert('Solo se puede subir PDF');
      return;
    }
    this.lUploadingContrato = true;
    this.storage.upload('contratos/'+this.sexpediente+'.pdf',contrato)
      .then((res)=>{
        this.db
          .collection('expedientes')
          .doc(this.sexpediente)
          .update({
            urlcontrato: res.metadata.fullPath
          });
        this.modalService.dismissAll();
        this.getExpediente();
      })
      .catch((err)=>{
        window.alert('Error al subir')
      })
      .finally(()=>{
        this.lUploadingContrato = false;
      });
  }

  crearDownloadUrlContrato() {
    this.lGeneratingUrlContrato = true;
    let observer = this.storage.ref(this.objExpediente.urlcontrato)
      .getDownloadURL()
      .subscribe((url)=>{
        this.urlDownloadContrato = url;
        this.lGeneratingUrlContrato = false;
        observer.unsubscribe();
      });
  }

  /**********************************************
   ************** ############ ******************
   *********************************************/


}
