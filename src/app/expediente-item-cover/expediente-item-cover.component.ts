import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  selector: 'app-expediente-item-cover',
  templateUrl: './expediente-item-cover.component.html',
  styleUrls: ['./expediente-item-cover.component.scss']
})
export class ExpedienteItemCoverComponent implements OnInit {
  @Input('sexpediente') sexpediente: string = '';
  objExpediente: ObjExpediente = new ObjExpediente();

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.getExpediente();
  }

  getExpediente(): void {
    let observando =  this.db
      .collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((val: any) => {
        this.objExpediente = new ObjExpediente();
        if (!!val) {
          this.objExpediente = val;
        } else {
          window.alert('expediente no existe')
        }
        observando.unsubscribe();
      });
  }

}
