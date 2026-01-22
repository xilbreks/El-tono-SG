import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Expediente } from './../_interfaces/expediente';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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

  fcClase: FormControl = new FormControl(null);   // 'PRINCIPAL' | 'CUADERNO' | 'CF'
  frmExp: FormGroup;
  evolucionando = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
    private router: Router,
  ) {
    this.frmExp = new FormGroup({
      'titulo': new FormControl(null, Validators.required),
      'numero': new FormControl(null, Validators.required),
      'demandante': new FormControl(null, Validators.required),
      'demandado': new FormControl(null, Validators.required),
      'juzgado': new FormControl(null, Validators.required),
    });
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

  cambioClase() {
    let regexp: RegExp = /REGEX/;
    let clase = this.fcClase.value;
    switch (clase) {
      case 'PRINCIPAL':
        regexp = /^\d{5}-\d{4}-[0]-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/;
        this.frmExp.patchValue({ titulo: 'EXPEDIENTE PRINCIPAL' });
        break;
      case 'CUADERNO':
        regexp = /^\d{5}-\d{4}-([1-9]|[1-9]\d)-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/;
        this.frmExp.patchValue({ titulo: 'CUADERNO' });
        break;
      case 'CF':
        regexp = /^\d+(-\d+)*$/;
        this.frmExp.patchValue({ titulo: 'CARPETA FISCAL' });
        break;
      default:
        console.log('error inesperado');
    }

    this.frmExp.controls['numero'].setValidators([
      Validators.required,
      Validators.pattern(regexp)
    ]);
    this.frmExp.controls['numero'].updateValueAndValidity();
  }

  concretarEvolucion() {
    this.evolucionando = true;

    // Promise para que al menos sea 5 segundos
    const promise = new Promise((resolve, reject) => {
      setTimeout(resolve, 5000, 'foo');
    });

    // Validar que el formulario este completo
    if (!this.fcClase.valid) {
      window.alert('Formulario incompleto')
      this.evolucionando = false;
      return;
    }
    if (!this.frmExp.valid) {
      window.alert('Formulario incompleto')
      this.evolucionando = false;
      return;
    }

    // Update expediente to PRINCIPAL
    let clase = this.fcClase.value;
    let titulo = this.frmExp.value['titulo'].trim().toUpperCase();
    let numero = this.frmExp.value['numero'].trim().toUpperCase();
    let demandante = this.frmExp.value['demandante'].trim().toUpperCase();
    let demandado = this.frmExp.value['demandado'].trim().toUpperCase();
    let juzgado = this.frmExp.value['juzgado'].trim().toUpperCase();

    this.db.collection('expedientes').doc(this.expediente?.idExpediente).update({
      clase: clase,
      titulo: titulo,
      numero: numero,
      demandante: demandante,
      demandado: demandado,
      juzgado: juzgado,
      numeroProvisional: this.expediente?.numero,
    }).then(() => {
      this.router.navigate(['/expedientes-updater/'], {
        queryParams: {
          expediente: numero,
        }
      }).then(()=>{
        this.modalService.dismissAll();
      })
      console.log('Evolucion exitosa');
    })
  }

}
