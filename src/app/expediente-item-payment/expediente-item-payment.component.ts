import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  nmontocontrato: number = 0;
  lstPagos: Array<Pago> = [];
  nMontoTotal: number = 0;

  frmNewPayment: FormGroup;
  frmEditPayment: FormGroup;

  lLoading: boolean = false;
  lCreating: boolean = false;
  lUpdating: boolean = false;

  lViewMode: boolean = true;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    /*************************
     * INIT FORM NEW PAYMENT *
     *************************/
    this.frmNewPayment = new FormGroup({
      nmonto: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      sdescripcion: new FormControl(null, Validators.required),
    });

    /**************************
     * INIT FORM EDIT PAYMENT *
     **************************/
    this.frmEditPayment = new FormGroup({
      idpago: new FormControl(null, Validators.required),
      nmonto: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      sdescripcion: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getMontoContrato();
    this.getPayments();
  }

  getMontoContrato() {
    let obs = this.db.collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((res: any) => {
        this.nmontocontrato = res.nmontocontrato ? res.nmontocontrato : 0;

        obs.unsubscribe();
      })
  }

  setMontoContrato(nmonto: any) {
    this.db.collection('expedientes')
      .doc(this.sexpediente)
      .update({
        nmontocontrato: nmonto.value
      })
      .then(()=>{
        this.nmontocontrato = nmonto.value;
      })
  }

  getPayments(): void {
    this.lLoading = true;
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

        this.lLoading = false;
        observando.unsubscribe();
      });
  }

  openNewPaymentModal(modal: any) {
    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  openEditPaymentModal(pago: Pago, modal: any) {
    this.frmEditPayment.setValue({
      idpago: pago.idpago,
      nmonto: pago.nmonto,
      sfecha: pago.sfecha,
      sdescripcion: pago.sdescripcion
    })

    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  openDeletePaymentModal(pago: Pago) {
    let lBorrar = window.confirm('¿Está seguro de borrar pago?')

    if (lBorrar) {
      this.deletePayment(pago.idpago)
    }
  }

  addNewPayment() {
    this.lCreating = true;
    const id = new Date().getTime().toString();

    this.db
      .collection('pagos')
      .doc(id)
      .set({
        idpago: id,
        lactive: true,
        sexpediente: this.sexpediente,
        nmonto: this.frmNewPayment.value['nmonto'],
        sfecha: this.frmNewPayment.value['sfecha'],
        sdescripcion: this.frmNewPayment.value['sdescripcion'],
        smodificador: localStorage.getItem('idusuario')
      })
      .then((x) => {
        this.getPayments();
        this.modalService.dismissAll();
        this.frmNewPayment.reset();
      })
      .catch(() => {
        window.alert('ERROR al registrar pago')
      })
      .finally(() => {
        this.lCreating = false;
      });
  }

  editPayment() {
    this.lUpdating = true;
    const id = this.frmEditPayment.value['idpago'];

    this.db
      .collection('pagos')
      .doc(id)
      .update({
        nmonto: this.frmEditPayment.value['nmonto'],
        sfecha: this.frmEditPayment.value['sfecha'],
        sdescripcion: this.frmEditPayment.value['sdescripcion'],
        smodificador: localStorage.getItem('idusuario')
      })
      .then((x) => {
        this.getPayments();
        this.modalService.dismissAll();
        this.frmEditPayment.reset();
      })
      .catch(() => {
        window.alert('ERROR al actualizar pago')
      })
      .finally(() => {
        this.lUpdating = false;
      })
  }

  deletePayment(idpago: string) {
    this.db.collection('pagos').doc(idpago).update({
      lactive: false,
      smodificador: localStorage.getItem('idusuario')
    }).then(() => {
      this.getPayments();
    })
      .catch(err => {
        window.alert('ERROR al quitar pago')
      });
  }

  ///////////////////////////////////////////////

  cambiarModo() {
    this.lViewMode = !this.lViewMode;
  }

}
