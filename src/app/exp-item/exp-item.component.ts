import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';

import { Expediente } from './../_interfaces/expediente';

@Component({
  selector: 'app-exp-item',
  templateUrl: './exp-item.component.html',
  styleUrls: ['./exp-item.component.scss']
})
export class ExpItemComponent implements OnInit {
  expediente: Expediente | null = null;
  lLoading: boolean = true;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let sexpediente = params['id'];
      this.titleService.setTitle(sexpediente);

      this.recuperarExpediente(sexpediente);
    });
  }

  recuperarExpediente(sexpediente: string) {
    this.lLoading = true;
    let obs = this.db.collection('expedientes').doc(sexpediente)
      .valueChanges()
      .subscribe((exp: any) => {
        if (exp) {
          this.expediente = exp;
        } else {
          this.expediente = null;
        }

        this.lLoading = false;
        obs.unsubscribe();
      });
  }

}
