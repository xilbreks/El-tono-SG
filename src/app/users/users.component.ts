import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  frmUsuario: FormGroup;
  lLoading: boolean = false;
  lCreating: boolean = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    this.frmUsuario = new FormGroup({
      id: new FormControl(null, Validators.compose([
        Validators.required,
        Validators.pattern(/^\S*$/)
      ])),
      scolor: new FormControl(null, Validators.required),
      snombre: new FormControl(null, Validators.required),
    });

    this.getUsuarios();
  }

  getUsuarios() {
    this.lLoading = true;
    let obs = this.db.collection('colaboradores')
      .valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstUsuarios = res;
        console.log({ res });

        this.lLoading = false;
        obs.unsubscribe();
      });
  }

  openModalNuevo(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-xs',
    });
  }

  registrarUsuario() {
    this.lCreating = true;
    let id: string = this.frmUsuario.controls['id'].value;
    let snombre: string = this.frmUsuario.controls['snombre'].value.trim();
    let scolor: string = this.frmUsuario.controls['scolor'].value;

    this.db.collection('colaboradores')
      .doc(id)
      .set({
        id: id,
        lactive: true,
        scolor: scolor,
        snombre: snombre
      })
      .then(() => {

      })
      .catch(err => {

      })
      .finally(() => {
        this.lCreating = false;
      });
  }
}
