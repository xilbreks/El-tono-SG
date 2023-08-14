import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-expediente-search',
  templateUrl: './expediente-search.component.html',
  styleUrls: ['./expediente-search.component.scss']
})
export class ExpedienteSearchComponent {
  lSearching: boolean = false;
  lstHits: Array<any> = [];

  constructor(
    private db: AngularFirestore, 
    private router: Router,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Buscar expediente');
  }

  buscarExpediente(sSearchTerm: any): void {
    if(!sSearchTerm) return;

    let sexpediente = sSearchTerm.trim().toUpperCase();

    if(sexpediente.length < 10) return;
    this.lSearching = true;
    let sAtributo = sexpediente.length == 10 ? 'salias' : 'sexpediente';

    let obs = this.db.collection('expedientes', ref => {
      return ref.where(sAtributo, '==', sexpediente)
    })
      .valueChanges()
      .subscribe((data: Array<any>) => {
        if (data.length == 0) {
          window.alert('No se encontro expediente');
        } else if (data.length == 1) {
          this.router.navigate(['/expediente/',data[0].sexpediente]);
        } else {
          this.lstHits = data;
        }
        this.lSearching = false;
        obs.unsubscribe();
      });
  }
}
