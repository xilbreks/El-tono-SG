import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ticket } from '../_interfaces/ticket';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  // Modals
  ticket: Ticket | null = null;

  constructor(
    private modalService: NgbModal,
  ) {
    this.tickets = [];
  }

  // Funciones para abrir los modales de cada ticket

  abrirModalTicket(modal: any) {
    this.modalService.open(modal, {
      size: 'md'
    });
  }

  darConformidad(modal: any, ticket: Ticket) {
    this.ticket = ticket;
    this.modalService.open(modal, {
      size: 'md'
    });
  }

  comentar(modal: any, ticket: Ticket) {
    this.ticket = ticket;
    this.modalService.open(modal, {
      size: 'md'
    });
  }

  avanzar(modal: any, ticket: Ticket) {
    this.ticket = ticket;
    this.modalService.open(modal, {
      size: 'sm'
    });
  }

  abrirModalEditarTicket(modal: any, ticket: Ticket) {
    this.ticket = ticket;
    this.modalService.open(modal, {
      size: 'md'
    });
  }

  verDetalles(modal: any, ticket: Ticket) {
    this.ticket = ticket;
    this.modalService.open(modal, {
      size: 'lg'
    });
  }

  // test
  imprimir(a: any) {
    console.log(a);
  }
}
