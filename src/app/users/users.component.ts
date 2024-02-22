import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

class Usuario {
  public id: string = '';
  public lactive: boolean = true;
  public scolor: string = '';
  public snombre: string = '';
  constructor() { }
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  lstUsuarios: Array<Usuario> = [];
  lLoading: boolean = false;

  constructor(
    private db: AngularFirestore,
  ) {
    this.getUsuarios();
  }

  getUsuarios() {
    this.lLoading = true;
    let obs = this.db.collection('colaboradores', ref => {
      return ref.where('lactive', '==', true)
    })
      .valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstUsuarios = res;

        this.lLoading = false;
        obs.unsubscribe();
      });
  }

}
