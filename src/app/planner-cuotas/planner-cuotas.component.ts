import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';

import { Cuota } from '../_interfaces/cuota';

@Component({
  selector: 'app-planner-cuotas',
  templateUrl: './planner-cuotas.component.html',
  styleUrl: './planner-cuotas.component.scss'
})
export class PlannerCuotasComponent implements OnInit {
  cuotas: Cuota[] = [];
  frmDate: FormGroup;
  cargando: boolean = true;

  today: string = '';

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.frmDate = new FormGroup({
      inicio: new FormControl(null, Validators.required),
      final: new FormControl(null, Validators.required),
      mes: new FormControl(null, Validators.required),
      anio: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.setHoy();
    this.cambiarFecha();
  }

  setHoy() {
    const dHoy = new Date();
    const time = dHoy.getTime() - 18000000;
    this.today = (new Date(time)).toISOString().slice(0, 10);
    const nYear = dHoy.getFullYear();
    let nMonth: any = dHoy.getMonth() + 1;

    if (nMonth < 10) {
      nMonth = '0' + nMonth;
    }

    this.frmDate.patchValue({
      mes: nMonth,
      anio: nYear
    });
  }

  cambiarFecha() {
    let anio = this.frmDate.value['anio'];
    let mes = this.frmDate.value['mes'];

    let nLastDay = (new Date(anio, mes, 0)).getDate();

    let primerDia = `${anio}-${mes}-01`;
    let ultimoDia = `${anio}-${mes}-${nLastDay}`;

    this.frmDate.patchValue({
      inicio: primerDia,
      final: ultimoDia,
    });

    this.obtenerCuotas();
  }

  async obtenerCuotas() {
    this.cargando = true;
    let inicio = this.frmDate.controls['inicio'].value;
    let final = this.frmDate.controls['final'].value;

    console.log(`Desde ${inicio} hasta ${final}`);
    this.cuotas = await this.recuperarCuotas(inicio, final);

    this.cargando = false;
  }

  // Operaciones a la base de datos

  /**
   * Obtiene el listado de cobranzas de una fecha determinada, mes
   * @param inicio primer dia del mes
   * @param final ultimo dia del mes
   */
  recuperarCuotas(inicio: string, final: string): Promise<Cuota[]> {
    let query = this.db.collection('cuotas', ref => {
      return ref.where('vencimiento', '>=', inicio)
        .where('vencimiento', '<=', final)
    }).get();

    return firstValueFrom(query).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data());
      });

      return items;
    });
  }

}

