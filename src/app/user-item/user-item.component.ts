import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Colaborador } from './../__clases/colaborador';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  id: string = '';
  objUsuario: Colaborador = new Colaborador();
  frmUsuario: FormGroup;
  lLoading: boolean = false;
  lUpdating: boolean = false;

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private modalService: NgbModal,
    route: ActivatedRoute
  ) {
    this.id = '' + route.snapshot.paramMap.get('id');
    this.titleService.setTitle('Usuario ' + this.id);

    /*************************
     * INIT FORM COLABORADOR *
     *************************/
    this.frmUsuario = new FormGroup({
      id: new FormControl(null, Validators.required),
      scolor: new FormControl(null, Validators.required),
      snombre: new FormControl(null, Validators.required),
      spassword: new FormControl(null, Validators.required),
    });

    this.getUsuario();
  }

  getUsuario() {
    this.lLoading = true;
    let obs = this.db.collection('colaboradores')
      .doc(this.id)
      .valueChanges()
      .subscribe((res: any) => {
        this.objUsuario.id = this.id;
        this.objUsuario.scolor = res.scolor;
        this.objUsuario.snombre = res.snombre;
        this.objUsuario.spassword = res.spassword;
        this.objUsuario.lactive = res.lactive;

        this.lLoading = false;
        obs.unsubscribe();
      });
  }

  openModalEdit(modal: any) {
    this.frmUsuario.setValue({
      id: this.objUsuario.id,
      scolor: this.objUsuario.scolor,
      snombre: this.objUsuario.snombre,
      spassword: this.objUsuario.spassword,
    });
    this.modalService.open(modal, {
      windowClass: 'modal-sm'
    });
  }

  openModalDisable(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm'
    });
  }

  openModalEnable(modal: any) {
    this.modalService.open(modal, {
      windowClass: 'modal-sm'
    });
  }

  updateUsuario() {
    this.lUpdating = true;

    let snombre: string = this.frmUsuario.controls['snombre'].value.trim();
    let scolor: string = this.frmUsuario.controls['scolor'].value;
    let spassword: string = this.frmUsuario.controls['spassword'].value.trim();

    this.db.collection('colaboradores')
      .doc(this.id)
      .update({
        snombre: snombre,
        scolor: scolor,
        spassword: spassword
      })
      .then(() => {
        this.getUsuario();
      })
      .catch(err => {
        window.alert('ERROR al actualizar');
      })
      .finally(() => {
        this.lUpdating = false;
        this.modalService.dismissAll();
      });
  }

  deleteUsuario() {

  }
}
