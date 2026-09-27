import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { Expediente } from './../_interfaces/expediente';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-exp-item-edit-status',
  templateUrl: './exp-item-edit-status.component.html',
  styleUrls: ['./exp-item-edit-status.component.scss'],
  imports: [
    ReactiveFormsModule,
    NgIcon,
  ]
})
export class ExpItemEditStatusComponent implements OnChanges {
  appService = inject(AppService);

  @Input('expediente') expediente: Expediente | null = null;

  fcMotivo: FormControl;
  lStatus: boolean = true;
  lUpdating = false;

  constructor(
    private modalService: NgbModal,
    private router: Router,
  ) {
    this.fcMotivo = new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/^.{10,}$/)]));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.lStatus = this.expediente.estado == 'EN PROCESO' ? true : false;
    }
  }

  openModalSetStatus(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
  }

  /**
   * Depura un expediente
   */
  async disableExp() {
    if (!this.expediente) return;

    this.lUpdating = true;
    let motivo = this.fcMotivo.value;

    const ok = await this.appService.actualizarExpediente(this.expediente.idExpediente, {
      estado: 'FINALIZADO',
      motivoFinalizacion: motivo,
    });

    await this.toogleCuotas(this.expediente.idExpediente, true);
    await this.toogleAbonos(this.expediente.idExpediente, true);

    this.modalService.dismissAll();

    this.router.navigate(['/expedientes-updater/'], {
      queryParams: {
        expediente: this.expediente.numero,
      }
    })
    this.lUpdating = false;
  }

  /**
   * Vuelve activo un expediente depurado
   */
  async enableExp() {
    if (!this.expediente) return;

    this.lUpdating = true;

    const ok = await this.appService.actualizarExpediente(this.expediente.idExpediente, {
      estado: 'EN PROCESO'
    });

    await this.toogleCuotas(this.expediente.idExpediente, false);
    await this.toogleAbonos(this.expediente.idExpediente, false);

    this.modalService.dismissAll();

    this.router.navigate(['/expedientes-updater/'], {
      queryParams: {
        expediente: this.expediente.numero,
      }
    })
    this.lUpdating = false;
  }

  // Desactivar/Activar sus CUOTAS para el planner

  async toogleCuotas(idExpediente: string, nuevoEstado: boolean) {
    const cuotas = await this.appService.cuotasPorExpediente(idExpediente);

    const promesasActualizacion = cuotas.map((cuota) => {
      return this.appService.actualizarCuota(cuota.idCuota, {
        estaDepurado: nuevoEstado,
      });
    });
    
    await Promise.all(promesasActualizacion);
  }

  // Desactivar/Activar sus ABONOS para el reporte

  async toogleAbonos(idExpediente: string, nuevoEstado: boolean) {
    const abonos = await this.appService.abonosPorExpediente(idExpediente);

    const promesasActualizacion = abonos.map((abono) => {
      return this.appService.actualizarAbono(abono.idAbono, {
        estaDepurado: nuevoEstado,
      });
    });
    
    await Promise.all(promesasActualizacion);
  }

}
