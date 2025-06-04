import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Sprint } from '../_interfaces/sprint';
import { Ticket } from '../_interfaces/ticket';

@Component({
  selector: 'app-tickets-me',
  templateUrl: './tickets-me.component.html',
  styleUrl: './tickets-me.component.scss'
})
export class TicketsMeComponent {
  idusuario: string;
  cargando = true;

  tickets: Ticket[] = [];
  ticketsF: Ticket[] = [];

  ticketSeleccionado: Ticket | undefined = undefined;
  fcTicketAvance: FormControl = new FormControl(null);
  actualizando = false;

  cargandoRDT = false;
  tareasRdt: any[] = [];

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    let usu = localStorage.getItem('idusuario');
    this.idusuario = usu ? usu : '';

    this.recuperarTickets();
  }

  // Recupera los tickets del sprint seleccionado
  recuperarTickets() {
    // let idSprint = this.fcSprintId.value;
    let obs = this.db.collection('tickets', ref => {
      return ref.where('asignadoA', '==', this.idusuario)
        .where('idSprint', '==', 'S0003')
    }).get();

    firstValueFrom(obs).then(snapshot => {
      this.tickets = [];
      this.ticketsF = [];
      snapshot.forEach(doc => {
        let t: any = doc.data();
        this.tickets.push(t);
        this.ticketsF.push(t);
      });
    }).catch(err => {
      console.log('Error al recuperar los tickets', err)
    }).finally(() => {
      this.cargando = false;
    });
  }

  // Modals
  abrirModalVerDetalles(modal: any, ticket: Ticket) {
    this.ticketSeleccionado = ticket;
    this.recuperarTareasRdt();
    this.modalService.open(modal, {
      size: 'lg'
    });
  }

  abrirModalAvance(modal: any, ticket: Ticket) {
    this.ticketSeleccionado = ticket;
    this.fcTicketAvance.setValue(ticket.avance);

    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  // fin modals

  // Modificar nivel de avance del ticket
  actualizarAvance() {
    let nuevoAvance = this.fcTicketAvance.value;
    let idTicket = this.ticketSeleccionado?.idTicket;

    this.actualizando = true;
    this.db.collection('tickets').doc(idTicket).update({
      avance: Number(nuevoAvance)
    }).then(() => {
      // ok
      if (this.ticketSeleccionado)
        this.ticketSeleccionado.avance = nuevoAvance;
      this.modalService.dismissAll();
    }).catch(err => {
      // error
      window.alert('Ocurrio un error');
    }).finally(() => {
      // a
      this.actualizando = false;
    });
  }

  // Recuperar rdt del ticket
  recuperarTareasRdt() {
    let sexpediente = this.ticketSeleccionado?.expediente;
    let fechaInicio = this.ticketSeleccionado?.fechaInicio;
    let fechaFinal = this.ticketSeleccionado?.fechaFinal;

    this.cargandoRDT = true;
    let obs = this.db.collection('tareas', ref => {
      return ref.where('sexpediente', '==', sexpediente).where('sfecha', '>=', fechaInicio)
        .where('sfecha', '<=', fechaFinal).orderBy('sfecha', 'desc')
    }).get();

    firstValueFrom(obs).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      });
      this.tareasRdt = items;

      this.cargandoRDT = false;
    })
  }

}
