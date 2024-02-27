import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Chat } from './../__clases/chat';

@Component({
  selector: 'app-expediente-item-chat',
  templateUrl: './expediente-item-chat.component.html',
  styleUrls: ['./expediente-item-chat.component.scss']
})
export class ExpedienteItemChatComponent implements OnChanges{
  @Input('sexpediente') sexpediente: string = '';
  smatchexp: string = 'nomatch';

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
      smensaje: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
    });

    /********************************
     ******** FORM EDIT CHAT ********
     ********************************/
    this.frmEditChat = new FormGroup({
      idchat: new FormControl(null, Validators.required),
      stipo: new FormControl(null, Validators.required),
      smensaje: new FormControl(null, Validators.required),
      sfecha: new FormControl(null, Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getMatchexp();
  }

  getMatchexp() {
    let obs = this.db.collection('expedientes')
      .doc(this.sexpediente)
      .valueChanges()
      .subscribe((e: any) => {
        if (e.smatchexp) {
          this.smatchexp = e.smatchexp;
        } else {
          this.smatchexp = 'nomatch';
        }
        this.getChats();

        obs.unsubscribe();
      });
  }

  /*********************************************
   ****************** CHATS ********************
   *********************************************/

  getChats() {
    this.lLoading = true;
    this.lstChats = [];

    let obs = this.db
      .collection('chats', ref => {
        if (this.smatchexp == 'nomatch') {
          return ref.where('sexpediente', '==', this.sexpediente)
            .where('lactive', '==', true)
        } else {
          return ref.where('sexpediente', 'in', [this.sexpediente, this.smatchexp])
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
      size: 'sm'
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
        sexpediente: this.sexpediente,
        sfecha: this.frmNewChat.value['sfecha'],
        smensaje: this.frmNewChat.value['smensaje'],
        stipo: this.frmNewChat.value['stipo'],
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
      smensaje: c.smensaje,
      sfecha: c.sfecha,
      stipo: c.stipo,
    })

    this.modalService.open(modal, {
      size: 'sm'
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
        smensaje: this.frmEditChat.value['smensaje'],
        stipo: this.frmEditChat.value['stipo'],
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
