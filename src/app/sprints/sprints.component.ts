import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Sprint } from '../_interfaces/sprint';
import { Ticket } from '../_interfaces/ticket';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrl: './sprints.component.scss'
})
export class SprintsComponent {
  cargando = false;

  sprints: Sprint[] = [];
  usuarios: any = [];
  tickets: Ticket[] = [];
  ticketsF: Ticket[] = [];

  fcSprintId: FormControl = new FormControl();
  fcDepartamento: FormControl = new FormControl('todos');
  fcUsuario: FormControl = new FormControl('todos');

  ticketSeleccionado: Ticket | undefined = undefined;
  cargandoRDT = false;
  tareasRdt: any[] = [];

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    // Recuperar sprints y usuarios
    this.recuperarSprints();
    this.recuperarUsuarios();
  }

  // Solo se ejecuta una vez
  recuperarSprints() {
    let obs = this.db.collection('sprints', ref => {
      return ref.where('esVisible', '==', true).orderBy('fechaCreacion', 'desc').limit(12)
    }).get();
    firstValueFrom(obs).then((snapshot) => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      });
      this.sprints = items;
    })
  }

  // Recuperar usuarios 
  recuperarUsuarios() {
    let obs = this.db.collection('colaboradores', ref => {
      return ref.where('lactive', '==', true)
    }).get();
    firstValueFrom(obs).then((snapshot) => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      });
      this.usuarios = items;
    })
  }

  // Recupera los tickets del sprint seleccionado
  recuperarTickets() {
    this.cargando = true;
    let idSprint = this.fcSprintId.value;
    let obs = this.db.collection('tickets', ref => {
      return ref.where('idSprint', '==', idSprint)
    }).get();

    firstValueFrom(obs).then(snapshot => {
      this.tickets = [];
      snapshot.forEach(doc => {
        let t: any = doc.data();
        this.tickets.push(t);
      });
      this.ticketsF = this.tickets.map(t => t);

      // resetear filtros
      this.fcDepartamento.setValue('todos');
      this.fcUsuario.setValue('todos');
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

  // Filtrar por areas
  filtrarPorArea() {
    let areaSelecionada = this.fcDepartamento.value;
    if (areaSelecionada == 'todos') {
      this.ticketsF = this.tickets.filter(_ => true);
    } else {
      this.ticketsF = this.tickets.filter(t => t.especialidad == areaSelecionada);
    }
  }

  // Filtrar por usuario
  filtrarPorUsuario() {
    let usuarioSeleccionado = this.fcUsuario.value;
    if (usuarioSeleccionado == 'todos') {
      this.ticketsF = this.tickets.filter(_ => true);
    } else {
      this.ticketsF = this.tickets.filter(t => t.asignadoA == usuarioSeleccionado);
    }
  }

}
