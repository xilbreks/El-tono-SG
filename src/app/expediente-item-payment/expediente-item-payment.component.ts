import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { PagoHonorario } from './../__clases/pago-honorario';
import { Contrato } from './../__clases/contrato';

@Component({
  selector: 'app-expediente-item-payment',
  templateUrl: './expediente-item-payment.component.html',
  styleUrls: ['./expediente-item-payment.component.scss']
})
export class ExpedienteItemPaymentComponent implements OnChanges {
  @Input('sexpediente') sexpediente: string = '';
  smatchexp: string = 'nomatch';

  // Contracts
  lstContracts: Array<Contrato> = [];
  nSumContracts: number = 0;
  frmNewContract: FormGroup;
  frmEditContract: FormGroup;

  lLoadingC: boolean = false;
  lCreatingC: boolean = false;
  lUpdatingC: boolean = false;


  // Payments
  lstPayments: Array<PagoHonorario> = [];
  nSumPayments: number = 0;
  frmNewPayment: FormGroup;
  frmEditPayment: FormGroup;

  lLoadingP: boolean = false;
  lCreatingP: boolean = false;
  lUpdatingP: boolean = false;


  // Others
  lViewMode: boolean = true;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    /*******************************
     ****** FORM NEW CONTRACT ******
     *******************************/
    this.frmNewContract = new FormGroup({
      sdetalle: new FormControl(null, Validators.required),
      nmonto: new FormControl(null, Validators.required),
    });

    /********************************
     ****** FORM EDIT CONTRACT ******
     ********************************/
    this.frmEditContract = new FormGroup({
      idcontrato: new FormControl(null, Validators.required),
      sdetalle: new FormControl(null, Validators.required),
      nmonto: new FormControl(null, Validators.required),
    });

    /******************************
     ****** FORM NEW PAYMENT ******
     ******************************/
    this.frmNewPayment = new FormGroup({
      nmonto: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      sdescripcion: new FormControl(null, Validators.required),
    });

    /*******************************
     ****** FORM EDIT PAYMENT ******
     *******************************/
    this.frmEditPayment = new FormGroup({
      idpago: new FormControl(null, Validators.required),
      nmonto: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      sdescripcion: new FormControl(null, Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getMatchexp();
  }

  getMatchexp() {
    let obs = this.db.collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((e: any) => {
        if (e.smatchexp) this.smatchexp = e.smatchexp;
        this.getContracts();
        this.getPayments();

        obs.unsubscribe();
      });
  }

  /*********************************************
   **************** CONTRACTS ******************
   *********************************************/

  getContracts() {
    this.lLoadingC = true;
    let obs = this.db
      .collection('contratos', ref => {
        if (this.smatchexp == 'nomatch') {
          return ref.where('sexpediente', '==', this.sexpediente)
          .where('lactive', '==', true)
        } else {
          return ref.where('sexpediente', 'in', [this.sexpediente, this.smatchexp])
          .where('lactive', '==', true)
        }
        
      })
      .valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstContracts = res;
        this.nSumContracts = 0;
        this.lstContracts.forEach(c => {
          this.nSumContracts += c.nmonto
        });

        this.lLoadingC = false;
        obs.unsubscribe();
      });
  }

  openNewContractModal(modal: any) {
    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  addNewContract() {
    this.lCreatingC = true;
    const id = new Date().getTime().toString();

    this.db
      .collection('contratos')
      .doc(id)
      .set({
        idcontrato: id,
        lactive: true,
        sexpediente: this.sexpediente,
        sdetalle: this.frmNewContract.value['sdetalle'],
        nmonto: this.frmNewContract.value['nmonto'],
      })
      .then((x) => {
        this.getContracts();
        this.modalService.dismissAll();
        this.frmNewContract.reset();
      })
      .catch(() => {
        window.alert('ERROR al registrar contrato')
      })
      .finally(() => {
        this.lCreatingC = false;
      });
  }

  openEditContractModal(c: Contrato, modal: any) {
    this.frmEditContract.setValue({
      idcontrato: c.idcontrato,
      sdetalle: c.sdetalle,
      nmonto: c.nmonto,
    })

    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  editContract() {
    this.lUpdatingC = true;
    const id = this.frmEditContract.value['idcontrato'];

    this.db
      .collection('contratos')
      .doc(id)
      .update({
        sdetalle: this.frmEditContract.value['sdetalle'],
        nmonto: this.frmEditContract.value['nmonto'],
      })
      .then((x) => {
        this.getContracts();
        this.modalService.dismissAll();
        this.frmEditContract.reset();
      })
      .catch(() => {
        window.alert('ERROR al actualizar contrato')
      })
      .finally(() => {
        this.lUpdatingC = false;
      })
  }

  openDeleteContractModal(c: Contrato) {
    let lBorrar = window.confirm('¿Está seguro de borrar contrato?')

    if (lBorrar) {
      this.deleteContract(c.idcontrato)
    }
  }

  deleteContract(idcontrato: string) {
    this.db.collection('contratos')
      .doc(idcontrato)
      .update({
        lactive: false,
      }).then(() => {
        this.getContracts();
      })
      .catch(err => {
        window.alert('ERROR al quitar contrato')
      });
  }

  /*********************************************
   ***************** PAYMENTS ******************
   *********************************************/

  getPayments(): void {
    this.lLoadingP = true;
    let obs = this.db
      .collection('pagos', ref => {
        if (this.smatchexp == 'nomatch') {
          return ref.where('sexpediente', '==', this.sexpediente)
          .where('lactive', '==', true)
        } else {
          return ref.where('sexpediente', 'in', [this.sexpediente, this.smatchexp])
          .where('lactive', '==', true)
        }
      })
      .valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstPayments = [];
        this.nSumPayments = 0;
        res.sort((a, b) => {
          if (a.sfecha > b.sfecha) return 1;
          else return -1;
        }).forEach(p => {
          let sfecha = p.sfecha;
          let sfechalocal = p.sfecha;
          // Verificar si la fecha tiene formato correcto YYYY-MM-DD
          if (sfecha.match(/^[0-9]{4}[-][0-9]{2}[-][0-9]{2}/)) {
            let sday = sfecha.slice(8, 10);
            let smonth = sfecha.slice(5, 7);
            let syear = sfecha.slice(0, 4);
            sfechalocal = sday + '/' + smonth + '/' + syear;
          }
          this.lstPayments.push({
            ...p,
            sfechalocal
          })
          this.nSumPayments += p.nmonto;
        });

        this.lLoadingP = false;
        obs.unsubscribe();
      });
  }

  openNewPaymentModal(modal: any) {
    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  addNewPayment() {
    this.lCreatingP = true;
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
        this.lCreatingP = false;
      });
  }

  openEditPaymentModal(pago: PagoHonorario, modal: any) {
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

  editPayment() {
    this.lUpdatingP = true;
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
        this.lUpdatingP = false;
      })
  }

  openDeletePaymentModal(pago: PagoHonorario) {
    let lBorrar = window.confirm('¿Está seguro de borrar pago?')

    if (lBorrar) {
      this.deletePayment(pago.idpago)
    }
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
