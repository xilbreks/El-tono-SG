import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Expediente } from './../_interfaces/expediente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-exp-item-evolution',
  templateUrl: './exp-item-evolution.component.html',
  styleUrl: './exp-item-evolution.component.scss',
  imports: [
    ReactiveFormsModule,
    NgIcon,
  ]
})
export class ExpItemEvolutionComponent implements OnChanges {
  appService = inject(AppService);
  @Input('expediente') expediente: Expediente | null = null;

  fcClase: FormControl = new FormControl(null);   // 'PRINCIPAL' | 'CUADERNO' | 'CF'
  frmExp: FormGroup;
  evolucionando = false;

  constructor(
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

  async concretarEvolucion() {
    if (!this.expediente) return;
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
    const payload = {
      clase: clase,
      titulo: titulo,
      numero: numero,
      demandante: demandante,
      demandado: demandado,
      juzgado: juzgado,
      numeroProvisional: this.expediente.numero,
    }

    const ok = await this.appService.actualizarExpediente(this.expediente.idExpediente, payload);

    this.router.navigate(['/expedientes-updater/'], {
      queryParams: {
        expediente: numero,
      }
    })
    this.modalService.dismissAll();
  }
}
