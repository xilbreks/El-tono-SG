import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-expediente-search',
  templateUrl: './expediente-search.component.html',
  styleUrls: ['./expediente-search.component.scss']
})
export class ExpedienteSearchComponent implements AfterViewInit {
  @ViewChild('searchTerm') searchTerm: any;
  lSearching: boolean = false;
  lstHits: Array<any> = [];

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Buscar expediente');
  }

  ngAfterViewInit(): void {
    this.searchTerm.nativeElement.focus();
  }

  buscarExpediente(sSearchTerm: any): void {
    if (!sSearchTerm) return;

    this.lSearching = true;

    let sexpediente = sSearchTerm.trim().toUpperCase();
    let sAtributo = '';

    if (sexpediente.match(/^[0-9]{5}[-][0-9]{4}$/)) {
      // Abreviacion de expediente normal
      sAtributo = 'salias';
    } else if (sexpediente.match(/^[0-9]{5}[-][0-9]{4}[-][0-9]{1,2}$/)) {
      // Abreviacion de expediente cautelar
      sAtributo = 'salias';
    } else if (sexpediente.match(/^[A-Z0-9-]{3,27}$/)) {
      // Codigo completo
      sAtributo = 'sexpediente';
    } else {
      this.lSearching = false;
      return;
    }

    let obs = this.db.collection('expedientes', ref => {
      return ref.where(sAtributo, '==', sexpediente)
    })
      .valueChanges()
      .subscribe((data: Array<any>) => {
        if (data.length == 0) {
          window.alert('No se encontro expediente');
        } else if (data.length == 1) {
          this.router.navigate(['/expediente/', data[0].sexpediente]);
        } else {
          this.lstHits = data;
        }
        this.lSearching = false;
        obs.unsubscribe();
      });
  }
}
