import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';

import { Expediente } from './../_interfaces/expediente';

@Component({
  selector: 'app-exp-item',
  templateUrl: './exp-item.component.html',
  styleUrls: ['./exp-item.component.scss']
})
export class ExpItemComponent implements OnInit {
  expediente: Expediente | null = null;
  lLoading: boolean = true;

  suser: string | null = '';

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private route: ActivatedRoute,
  ) {
    this.suser = localStorage.getItem('idusuario');
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let numeroExpediente = params['numero'];
      this.titleService.setTitle(numeroExpediente);

      this.recuperarDatos(numeroExpediente);
    });
  }

  async recuperarDatos(sexpediente: string) {
    // Indicador de carga
    this.lLoading = true;

    // Consultar a la Base de datos por el expediente
    let exp = await this.getExp(sexpediente);

    // Caso no exista expediente
    if (exp.length == 0) {
      this.lLoading = false;
      this.expediente = null;
      return;
    }

    // Caso si exista
    this.expediente = exp[0];

    // Indicador de carga
    this.lLoading = false;
  }

  /****************************************************
   ********** CONSULTAS A LA BASE DE DATOS ************
   ****************************************************/

  getExp(numeroExpediente: string): Promise<any[]> {
    const obs = this.db.collection('expedientes', ref => {
      return ref.where('numero', '==', numeroExpediente)
    }).get();
    return firstValueFrom(obs).then(snapshot => {
      let matchs: any[] = [];
      snapshot.forEach(doc => {
        matchs.push(doc.data())
      })
      return matchs;
    });
  }

}
