import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class Pago {
  idpago: string;
  nmonto: number;
  sexpediente: string;
  sfecha: string;
  smedio: string;
  constructor(data: any){
    this.idpago = data.idpago;
    this.nmonto = data.nmonto;
    this.sexpediente = data.sexpediente;
    this.sfecha = data.sfecha;
    this.smedio = data.smedio;
  }
}

@Component({
  selector: 'app-expediente-item-payment',
  templateUrl: './expediente-item-payment.component.html',
  styleUrls: ['./expediente-item-payment.component.scss']
})
export class ExpedienteItemPaymentComponent implements OnInit {
  @Input('sexpediente') sexpediente: string = '';
  lstPagos: Array<Pago> = [];

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    let observando =  this.db
      .collection('pagos', ref => {
        return ref.where('sexpediente','==', this.sexpediente)
      })
      .valueChanges()
      .subscribe((data: Array<any>) => {
        this.lstPagos = [];
        data.forEach((d) => {
          this.lstPagos.push(new Pago(d))
        });

        observando.unsubscribe();
      });
  }
}
