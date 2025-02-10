import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Expediente } from './../_interfaces/expediente';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exp-item-evolution',
  templateUrl: './exp-item-evolution.component.html',
  styleUrl: './exp-item-evolution.component.scss'
})
export class ExpItemEvolutionComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;
  isConfirming = false;
  countdown = 5;
  countdownInterval: any;
  showVideo = false;

  frmExpediente: FormGroup;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private modalService: NgbModal,
    private router: Router,
  ) {
    let regexp = /^\d{5}-\d{4}-[0]-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/;

    this.frmExpediente = new FormGroup({
      'numero': new FormControl(null, Validators.compose([Validators.required, Validators.pattern(regexp)])),
      'demandante': new FormControl(null, Validators.required),
      'demandado': new FormControl(null, Validators.required),
      'juzgado': new FormControl(null, Validators.required),
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {

    }
  }

  openModal(modal: any) {

    this.modalService.open(modal, {
      windowClass: 'modal-md',
      keyboard: false,
      backdrop: 'static',
    });
  }

  startConfirmation() {
    if (this.isConfirming) {
      this.confirmAction();
    } else {
      this.isConfirming = true;
      this.countdown = 5;
      this.countdownInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          this.resetButton();
        }
      }, 1000);
    }
  }

  confirmAction() {
    clearInterval(this.countdownInterval);
    this.showVideo = true;

    // Promise para que al menos sea 30 segundos
    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 31000, 'foo');
    })

    // Update expediente to PRINCIPAL
    const updater = this.evolucionarExp();

    Promise.all([promise, updater]).then(() => {
      this.showVideo = false;
      this.modalService.dismissAll();
      let numeroNuevo = this.frmExpediente.value['numero'].trim().toUpperCase();
      this.router.navigate(['/expedientes-updater/'], {
        queryParams: {
          expediente: numeroNuevo,
        }
      })
      console.log('Digievolucion exitosa');
    })
  }

  resetButton() {
    clearInterval(this.countdownInterval);
    this.isConfirming = false;
    this.countdown = 5;
  }

  /**
   * Actualiza el numero de expediente a uno principal
   */
  evolucionarExp(): Promise<void> {
    let numero = this.frmExpediente.value['numero'].trim().toUpperCase();
    let demandante = this.frmExpediente.value['demandante'].trim().toUpperCase();
    let demandado = this.frmExpediente.value['demandado'].trim().toUpperCase();
    let juzgado = this.frmExpediente.value['juzgado'].trim().toUpperCase();

    return this.db.collection('expedientes').doc(this.expediente?.idExpediente).update({
      clase: 'PRINCIPAL',
      titulo: 'EXPEDIENTE PRINCIPAL',
      numero: numero,
      demandante: demandante,
      demandado: demandado,
      juzgado: juzgado,
      numeroProvisional: this.expediente?.numero,
    })
  }
}
