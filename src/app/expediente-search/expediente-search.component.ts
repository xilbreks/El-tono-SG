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
    if(!sSearchTerm) return;

    let sexpediente = sSearchTerm.trim().toUpperCase();

    if (sexpediente.length <= 10) {
      if (!sexpediente.match(/^\d{1,5}[-]\d{4}$/)) {
        return;
      }
      let nCeros = 10 - sexpediente.length;
      for (let i = 0; i < nCeros; i++) {
        sexpediente = '0' + sexpediente;
      }
    }

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
