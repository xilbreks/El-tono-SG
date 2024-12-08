import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';

import { Expediente } from './../_interfaces/expediente';

import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-exp-item',
  templateUrl: './exp-item.component.html',
  styleUrls: ['./exp-item.component.scss']
})
export class ExpItemComponent implements OnInit {
  lstExpedientes: any[] = [];

  expediente: Expediente | null = null;
  lLoading: boolean = true;

  suser: string | null = '';

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.suser = localStorage.getItem('idusuario');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let sexpediente = params['id'];
      this.titleService.setTitle(sexpediente);

      // this.recuperarExpediente(sexpediente);
      this.recuperarDatos(sexpediente);
    });
  }

  async recuperarDatos(sexpediente: string) {
    // Indicador de carga
    this.lLoading = true;

    // Reiniciar las variables
    this.lstExpedientes = [];

    // Consultar a la Base de datos por el expediente
    let exp = await this.getExp(sexpediente);

    // Caso no exista expediente
    if (!exp) {
      this.lLoading = false;
      this.expediente = null;
      return;
    }

    // Caso si exista
    this.expediente = exp;

    // Consultar sobre expedientes del mismo proceso
    this.lstExpedientes = await this.getExps(exp.idproceso);

    // Indicador de carga
    this.lLoading = false;
  }

  /****************************************************
   ********** CONSULTAS A LA BASE DE DATOS ************
   ****************************************************/

  getExp(sexpediente: string): Promise<any> {
    const obs = this.db.collection('expedientes').doc(sexpediente).get();
    return firstValueFrom(obs).then(snapshot => snapshot.data());
  }

  getExps(idproceso: string): Promise<any> {
    const obs = this.db.collection('expedientes', ref => ref.where('idproceso', '==', idproceso)).get();
    return firstValueFrom(obs).then(snapshot => {
      let lst: any = [];
      snapshot.forEach(doc => {
        lst.push(doc.data())
      })
      return lst;
    });
  }
}
