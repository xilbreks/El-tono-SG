import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class ObjRdt {
  public idrdt: string = '';
  public idcolaborador: string = '';
  public scolaborador: string = '';
  public nfecha: number = 0;
  public sfecha: string = '';
  public nsemana: number = 0;
  public ndia: number = 0;
  public leditable: boolean = true;
  public shoraingreso: string = '';
  public shorasalida: string = '';
  public sminutoingreso: string = '';
  public sminutosalida: string = '';
}

@Component({
  selector: 'app-colaborador-rdt',
  templateUrl: './colaborador-rdt.component.html',
  styleUrls: ['./colaborador-rdt.component.scss']
})
export class ColaboradorRdtComponent {
  idColaborador: any = '';
  lstRDTs: Array<ObjRdt> = [];
  frmEntrada: FormGroup;
  frmSalida: FormGroup;
  lUpdating: boolean = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.idColaborador = localStorage.getItem('idusuario');
    this.getRdts();

    /**********************
     * INIT FORM HOUR-MIN *
     **********************/
    this.frmEntrada = new FormGroup({
      idrdt: new FormControl(null, Validators.required),
      shoraingreso: new FormControl(null, Validators.required),
      sminutoingreso: new FormControl(null, Validators.required),
    });
    this.frmSalida = new FormGroup({
      idrdt: new FormControl(null, Validators.required),
      shorasalida: new FormControl(null, Validators.required),
      sminutosalida: new FormControl(null, Validators.required),
    });
  }

  public getRdts(): void {
    this.db
      .collection('rdts', (ref) => {
        return ref.where('idcolaborador', '==', this.idColaborador)
          .orderBy('sfecha', 'desc')
          .limit(5);
      })
      .valueChanges()
      .subscribe((val: Array<any>) => {
        this.lstRDTs = val;
      });
  }

  updateEntrada(): void {
    this.lUpdating = true;
    let idrdt = this.frmEntrada.value['idrdt'];

    this.db
      .collection('rdts')
      .doc(idrdt)
      .update({
        shoraingreso: this.frmEntrada.value['shoraingreso'],
        sminutoingreso: this.frmEntrada.value['sminutoingreso'],
      })
      .then(() => {
        this.frmEntrada.reset();
      })
      .catch(() => {
        window.alert('ERROR al marcar entrada')
      })
      .finally(() => {
        this.modalService.dismissAll();
        this.lUpdating = false;
      });
  }

  updateSalida(): void {
    this.lUpdating = true;
    let idrdt = this.frmSalida.value['idrdt'];

    this.db
      .collection('rdts')
      .doc(idrdt)
      .update({
        shorasalida: this.frmSalida.value['shorasalida'],
        sminutosalida: this.frmSalida.value['sminutosalida'],
      })
      .then(() => {
        this.frmSalida.reset();
      })
      .catch(() => {
        window.alert('ERROR al marcar salida')
      })
      .finally(() => {
        this.modalService.dismissAll();
        this.lUpdating = false;
      });
  }

  public openEntradaModal(idrdt: string, modal: any): void {
    this.frmEntrada.setValue({
      idrdt: idrdt,
      shoraingreso: null,
      sminutoingreso: null
    })
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

  public openSalidaModal(idrdt: string, modal: any): void {
    this.frmSalida.setValue({
      idrdt: idrdt,
      shorasalida: null,
      sminutosalida: null
    })
    this.modalService.open(modal, {
      windowClass: 'modal-sm',
    });
  }

}
