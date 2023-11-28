import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Cliente } from './../__clases/cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent {
  lstClientes: Array<Cliente> = [];

  constructor(
    private db: AngularFirestore,
  ) {
    this.getClientes();
  }

  getClientes() {
    let obs = this.db.collection('clientes')
      .valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstClientes = res;

        // obs.unsubscribe();
      })
  }
}
