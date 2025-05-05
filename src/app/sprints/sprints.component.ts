import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Sprint } from '../_interfaces/sprint';
import { Ticket } from '../_interfaces/ticket';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrl: './sprints.component.scss'
})
export class SprintsComponent {
  idusuario: string;
  cargando = true;

  sprints: Sprint[] = [];
  tickets: Ticket[] = [];
  ticketsF: Ticket[] = [];

  fcSprintId: FormControl = new FormControl(null);
  fcDepartamento: FormControl = new FormControl(null);
  fcUsuario: FormControl = new FormControl(null);

  ticketSeleccionado: Ticket | undefined = undefined;
  fcTicketAnotacion: FormControl = new FormControl(null);
  fcTicketAvance: FormControl = new FormControl(null);
  actualizando = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    let usu = localStorage.getItem('idusuario');
    this.idusuario = usu ? usu : '';

    // this.recuperarSprints();
    this.recuperarTickets();
  }

  // Solo se ejecuta una vez
  // recuperarSprints() {
  //   let obs = this.db.collection('sprints', ref => {
  //     return ref.orderBy('fechaCreacion', 'desc').limit(24)
  //   }).get();
  //   firstValueFrom(obs).then((snapshot) => {
  //     let items: any[] = [];
  //     snapshot.forEach(doc => {
  //       items.push(doc.data())
  //     });
  //     this.sprints = items;

  //     this.selecionarSprintActual();
  //     this.recuperarTickets();
  //   })
  // 

  // Auto selecionar el sprint actual
  // selecionarSprintActual() {
  //   let sprintEnCurso = this.sprints.filter(s => s.enCurso)[0];
  //   this.fcSprintId.setValue(sprintEnCurso.idSprint);
  //   this.fcDepartamento.setValue('todos');
  //   this.fcUsuario.setValue('todos');
  // }

  // Seleccion manual del sprint
  // seleccionarSprint() {
  //   this.fcDepartamento.setValue('todos');
  //   this.fcUsuario.setValue('todos');

  //   this.recuperarTickets();
  // }

  // Recupera los tickets del sprint seleccionado
  recuperarTickets() {
    // let idSprint = this.fcSprintId.value;
    let obs = this.db.collection('tickets', ref => {
      return ref.where('asignadoA', '==', this.idusuario)
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

  abrirModalAnotacion(modal: any, ticket: Ticket) {
    this.ticketSeleccionado = ticket;
    this.fcTicketAnotacion.setValue(ticket.anotaciones);

    this.modalService.open(modal, {
      size: 'md'
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

  // Modificar anotacion del ticket
  actualizarAnotacion() {
    let nuevaAnotacion = this.fcTicketAnotacion.value;
    let idTicket = this.ticketSeleccionado?.idTicket;

    this.actualizando = true;
    this.db.collection('tickets').doc(idTicket).update({
      anotaciones: nuevaAnotacion.trim()
    }).then(() => {
      // ok
      if (this.ticketSeleccionado)
        this.ticketSeleccionado.anotaciones = nuevaAnotacion;
      this.modalService.dismissAll();
    }).catch(err => {
      // error
      window.alert('Ocurrio un error');
    }).finally(() => {
      // a
      this.actualizando = false;
    });
  }

  // Filtrar por areas
  filtrarPorArea() {
    let areaSelecionada = this.fcDepartamento.value;
    if (areaSelecionada == 'todos') {
      this.ticketsF = this.tickets.filter(_ => true);
    } else {
      this.ticketsF = this.tickets.filter(t => t.especialidad == areaSelecionada);
    }
  }


}
