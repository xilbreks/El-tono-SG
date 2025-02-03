import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Expediente } from './../_interfaces/expediente';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-exp-item-cover',
  templateUrl: './exp-item-cover.component.html',
  styleUrls: ['./exp-item-cover.component.scss']
})
export class ExpItemCoverComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  urlcontrato: string | null = null;
  cuadernos: Expediente[] = [];

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.colocarLinkContrato();
      this.buscarCuadernos();
    }
  }

  colocarLinkContrato() {
    if (!this.expediente?.tieneContrato) return;

    this.storage.ref(`contratos/${this.expediente?.numero}.pdf`)
      .getDownloadURL().subscribe(url => this.urlcontrato = url);
  }

  buscarCuadernos() {
    let obs = this.db.collection('expedientes', ref => {
      return ref.where('numeroPrincipal', '==', this.expediente?.numero);
    }).get();

    firstValueFrom(obs).then(snapshot => {
      this.cuadernos = [];
      snapshot.forEach((doc: any) => {
        this.cuadernos.push(doc.data())
      });
      this.cuadernos.sort((a, b) => a.numero > b.numero ? -1 : 1);
    });
  }

}
