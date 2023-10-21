import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Pago {
  idpago: string;
  sexpediente: string;
  nmonto: number;
  sfecha: string;
  sdescripcion: string;
  smodificador: string;
  lactive: boolean;
}

@Component({
  selector: 'app-expediente-item-payment',
  templateUrl: './expediente-item-payment.component.html',
  styleUrls: ['./expediente-item-payment.component.scss']
})
export class ExpedienteItemPaymentComponent implements OnInit {
  @Input('sexpediente') sexpediente: string = '';
  lstPagos: Array<Pago> = [];
  nMontoTotal: number = 0;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    let observando = this.db
      .collection('pagos', ref => {
        return ref.where('sexpediente', '==', this.sexpediente)
          .where('lactive', '==', true)
      })
      .valueChanges()
      .subscribe((data: Array<any>) => {
        this.lstPagos = [];
        this.nMontoTotal = 0;
        data.forEach((p) => {
          this.lstPagos.push(p)
          this.nMontoTotal = this.nMontoTotal + p.nmonto;
        });

        observando.unsubscribe();
      });
  }
}
