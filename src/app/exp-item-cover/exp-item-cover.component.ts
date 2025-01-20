import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Expediente } from './../_interfaces/expediente';

@Component({
  selector: 'app-exp-item-cover',
  templateUrl: './exp-item-cover.component.html',
  styleUrls: ['./exp-item-cover.component.scss']
})
export class ExpItemCoverComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;
  
  urlcontrato: string | null = null;
  cautelares: string[] | undefined = [];

  constructor(
    private storage: AngularFireStorage
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.colocarLinkContrato();
      this.identificarCautelares();
    }
  }

  colocarLinkContrato() {
    if (!this.expediente?.tieneContrato) return;

    let obs = this.storage.ref(`contratos/${this.expediente?.numero}.pdf`).getDownloadURL()
      .subscribe(url => {
        this.urlcontrato = url;
        console.log(url)

        obs.unsubscribe();
      });
  }

  identificarCautelares() {
    this.cautelares = this.expediente?.numeroCautelar?.split(',');
  }

}
