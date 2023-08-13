import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class Contrato {
  idcontrato: string = '';
  nmonto: number = 0;
  sdetalle: string = '';
  sexpediente: string = '';
  constructor(data: any){
    this.idcontrato = data.idcontrato;
    this.nmonto = data.nmonto;
    this.sdetalle = data.sdetalle;
    this.sexpediente = data.sexpediente;
  }
}

@Component({
  selector: 'app-expediente-item-contract',
  templateUrl: './expediente-item-contract.component.html',
  styleUrls: ['./expediente-item-contract.component.scss']
})
export class ExpedienteItemContractComponent implements OnInit {
  @Input('sexpediente') sexpediente: string = '';
  lContrato: boolean = false;
  objContrato: Contrato = new Contrato({});
  lUploadingContrato: boolean = false;
  urlDownloadContrato = null;
  lGeneratingUrlContrato = false;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.getContrato();
  }

  getContrato() {
    let observando = this.db.collection('contratos', ref => {
      return ref.where('sexpediente', '==', this.sexpediente)
    })
    .valueChanges()
    .subscribe((data)=>{
      if (data.length > 0) {
        this.lContrato = true;
        this.objContrato = new Contrato(data[0]);
      } else {
        this.lContrato = false;
      }

      observando.unsubscribe();
    })
  }

  openModalContrato(modal: any) {
    this.modalService.open(modal);
  }

  uploadContrato(file: any) {
    // const contrato = file.files[0];
    // console.log(contrato);
    // if (!contrato) {
    //   window.alert('Seleccione un PDF');
    //   return;
    // }
    // if (contrato.type != 'application/pdf') {
    //   window.alert('Solo se puede subir PDF');
    //   return;
    // }
    // this.lUploadingContrato = true;
    // this.storage.upload('contratos/'+this.sexpediente+'.pdf',contrato)
    //   .then((res)=>{
    //     this.db
    //       .collection('expedientes')
    //       .doc(this.sexpediente)
    //       .update({
    //         urlcontrato: res.metadata.fullPath
    //       });
    //     this.modalService.dismissAll();
    //     this.getExpediente();
    //   })
    //   .catch((err)=>{
    //     window.alert('Error al subir')
    //   })
    //   .finally(()=>{
    //     this.lUploadingContrato = false;
    //   });
  }

  crearDownloadUrlContrato() {
    // this.lGeneratingUrlContrato = true;
    // let observer = this.storage.ref(this.objExpediente.urlcontrato)
    //   .getDownloadURL()
    //   .subscribe((url)=>{
    //     this.urlDownloadContrato = url;
    //     this.lGeneratingUrlContrato = false;
    //     observer.unsubscribe();
    //   });
  }

}
