import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Expediente } from './../_interfaces/expediente';
import { Chat } from './../__clases/chat';

@Component({
  selector: 'app-exp-item-chat',
  templateUrl: './exp-item-chat.component.html',
  styleUrls: ['./exp-item-chat.component.scss']
})
export class ExpItemChatComponent implements OnInit {
  @Input('expediente') expediente: Expediente | null = null;

  // Chats
  lstChats: Array<Chat> = [];
  frmNewChat: FormGroup;
  frmEditChat: FormGroup;

  lLoading: boolean = false;
  lCreating: boolean = false;
  lUpdating: boolean = false;

  // Others
  lViewMode: boolean = true;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    /*******************************
     ******** FORM NEW CHAT ********
     *******************************/
    this.frmNewChat = new FormGroup({
      stipo: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      smensaje: new FormControl(null, Validators.required),
      sencargado: new FormControl(null, Validators.required),
    });

    /********************************
     ******** FORM EDIT CHAT ********
     ********************************/
    this.frmEditChat = new FormGroup({
      idchat: new FormControl(null, Validators.required),
      stipo: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
      smensaje: new FormControl(null, Validators.required),
      sencargado: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.getChats();
  }

  /*********************************************
   ****************** CHATS ********************
   *********************************************/

  getChats() {
    this.lLoading = true;
    this.lstChats = [];

    let obs = this.db
      .collection('chats', ref => {
        if (this.expediente?.smatchexp == 'nomatch') {
          return ref.where('sexpediente', '==', this.expediente?.sexpediente)
            .where('lactive', '==', true)
        } else {
          return ref.where('sexpediente', 'in', [this.expediente?.sexpediente, this.expediente?.smatchexp])
            .where('lactive', '==', true)
        }

      })
      .valueChanges()
      .subscribe((res: Array<any>) => {
        this.lstChats = res.sort((a, b) => {
          if (a.sfecha > b.sfecha) {
            return 1;
          } else {
            return -1;
          }
        }).map(c => {
          let sday = c.sfecha.slice(8, 10);
          let smonth = c.sfecha.slice(5, 7);
          let syear = c.sfecha.slice(0, 4);
          return {
            ...c,
            sfechal: sday + '/' + smonth + '/' + syear
          }
        })

        this.lLoading = false;
        obs.unsubscribe();
      });
  }

  openNewChatModal(modal: any) {
    this.modalService.open(modal, {
      size: 'md'
    });
  }

  addNewChat() {
    this.lCreating = true;
    const id = new Date().getTime().toString();

    this.db
      .collection('chats')
      .doc(id)
      .set({
        idchat: id,
        lactive: true,
        sexpediente: this.expediente?.sexpediente,
        sdemandante: this.expediente?.sdemandante,
        sdemandado: this.expediente?.sdemandado,
        stipo: this.frmNewChat.value['stipo'],
        sfecha: this.frmNewChat.value['sfecha'],
        smensaje: this.frmNewChat.value['smensaje'],
        sencargado: this.frmNewChat.value['sencargado'],
      })
      .then((x) => {
        this.getChats();
        this.modalService.dismissAll();
        this.frmNewChat.reset();
      })
      .catch(() => {
        window.alert('ERROR al registrar chat')
      })
      .finally(() => {
        this.lCreating = false;
      });
  }

  openEditChatModal(c: Chat, modal: any) {
    this.frmEditChat.setValue({
      idchat: c.idchat,
      stipo: c.stipo,
      sfecha: c.sfecha,
      smensaje: c.smensaje,
      sencargado: c.sencargado,
    })

    this.modalService.open(modal, {
      size: 'md'
    });
  }

  editChat() {
    this.lUpdating = true;
    const id = this.frmEditChat.value['idchat'];

    this.db
      .collection('chats')
      .doc(id)
      .update({
        sfecha: this.frmEditChat.value['sfecha'],
        stipo: this.frmEditChat.value['stipo'],
        smensaje: this.frmEditChat.value['smensaje'],
        sencargado: this.frmEditChat.value['sencargado'],
      })
      .then((x) => {
        this.getChats();
        this.modalService.dismissAll();
        this.frmEditChat.reset();
      })
      .catch(() => {
        window.alert('ERROR al actualizar chat')
      })
      .finally(() => {
        this.lUpdating = false;
      })
  }

  openDeleteChatModal(c: Chat) {
    let lBorrar = window.confirm('¿Está seguro de borrar chat?')

    if (lBorrar) {
      this.deleteChat(c.idchat)
    }
  }

  deleteChat(idchat: string) {
    this.db.collection('chats')
      .doc(idchat)
      .update({
        lactive: false,
      }).then(() => {
        this.getChats();
      })
      .catch(err => {
        window.alert('ERROR al quitar chat')
      });
  }


  ///////////////////////////////////////////////

  cambiarModo() {
    this.lViewMode = !this.lViewMode;
  }

}
