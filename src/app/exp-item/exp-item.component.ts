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

      this.buscarExpediente(numeroExpediente);
    });
  }

  buscarExpediente(sexpediente: string) {
    // Indicador de carga
    this.lLoading = true;

    // Consultar a la Base de datos por el expediente
    let p1 = this.consultarNumeroPrincipal(sexpediente);
    let p2 = this.consultarNumeroProvisional(sexpediente);
    Promise.all([p1, p2]).then((res: any) => {
      if (res[0].length > 0) {
        this.expediente = res[0][0];
        // Indicador de carga
        this.lLoading = false;
      } else if (res[1].length > 0) {
        this.expediente = res[1][0];
        // Indicador de carga
        this.lLoading = false;
      } else {
        console.log('No lo encontré')
        this.lLoading = false;
        this.expediente = null;
        // Indicador de carga
        this.lLoading = false;
      }
    });
  }

  /****************************************************
   ********** CONSULTAS A LA BASE DE DATOS ************
   ****************************************************/

  consultarNumeroPrincipal(numero: string): Promise<any[]> {
    const obs = this.db.collection('expedientes', ref => {
      return ref.where('numero', '==', numero)
    }).get();
    return firstValueFrom(obs).then(snapshot => {
      let listado: any[] = [];
      snapshot.forEach((doc: any) => listado.push(doc.data()))
      return listado;
    });
  }

  consultarNumeroProvisional(numero: string): Promise<any[]> {
    const obs = this.db.collection('expedientes', ref => {
      return ref.where('numeroProvisional', '==', numero)
    }).get();
    return firstValueFrom(obs).then(snapshot => {
      let listado: any[] = [];
      snapshot.forEach((doc: any) => listado.push(doc.data()))
      return listado;
    });
  }

}
