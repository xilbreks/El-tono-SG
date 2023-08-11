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
  lNotFound: boolean = false;

  constructor(
    private db: AngularFirestore, 
    private router: Router,
    private titleService: Title,
  ) {
    this.titleService.setTitle('Buscar expediente');
  }

  buscarExpediente(sinput: any): void {
    if(!sinput) return;

    let sexpediente = sinput.trim().toUpperCase();
    this.lSearching = true;
    this.lNotFound = false;
    
    let observando = this.db.collection('expedientes')
      .doc(sexpediente)
      .valueChanges()
      .subscribe((obj: any) => {
        this.lSearching = false;
        if (!!obj) {
          this.router.navigate(['/expediente/',sexpediente]);
        } else {
          this.lNotFound = true;
        }
        observando.unsubscribe();
      });
  }
}
