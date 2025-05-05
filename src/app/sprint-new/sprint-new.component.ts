import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Sprint } from '../_interfaces/sprint';
import { Ticket } from '../_interfaces/ticket';

@Component({
  selector: 'app-sprint-new',
  templateUrl: './sprint-new.component.html',
  styleUrl: './sprint-new.component.scss'
})
export class SprintNewComponent {
  cargando = true;

  sprints: Sprint[] = [];
  tickets: Ticket[] = [];
  usuarios: any[] = [];

  fcSprintId: FormControl = new FormControl(null);

  frmNuevoTicket: FormGroup;
  frmEditarTicket: FormGroup;
  estaRegistrandoTicket = false;
  estaActualizandoTicket = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {
    // inicializar formularios

    this.frmNuevoTicket = new FormGroup({
      // Del ticket
      idSprint: new FormControl(null, Validators.required),
      titulo: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      asignadoA: new FormControl(null, Validators.required),
      tiempoEstimado: new FormControl(null, Validators.required),
      // Del expediente
      expediente: new FormControl(null, Validators.required),
      demandante: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      materia: new FormControl(null, Validators.required),
      area: new FormControl(null, Validators.required),
    });

    this.frmEditarTicket = new FormGroup({
      // Del ticket
      idTicket: new FormControl(null, Validators.required),
      idSprint: new FormControl(null, Validators.required),
      titulo: new FormControl(null, Validators.required),
      descripcion: new FormControl(null, Validators.required),
      asignadoA: new FormControl(null, Validators.required),
      tiempoEstimado: new FormControl(null, Validators.required),
      // Del expediente
      expediente: new FormControl(null, Validators.required),
      demandante: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      materia: new FormControl(null, Validators.required),
      area: new FormControl(null, Validators.required),
    });

    this.recuperarSprints();
  }

  // Solo se ejecuta una vez
  recuperarSprints() {
    let obs = this.db.collection('sprints', ref => {
      return ref.orderBy('fechaCreacion', 'desc').limit(24)
    }).get();
    firstValueFrom(obs).then((snapshot) => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      });
      this.sprints = items;

      this.selecionarSprintActual();
      this.recuperarTickets();
    })
  }

  // Auto selecionar el sprint actual
  selecionarSprintActual() {
    let sprintEnCurso = this.sprints.filter(s => s.enCurso)[0];
    this.fcSprintId.setValue(sprintEnCurso.idSprint);
    this.frmNuevoTicket.patchValue({ idSprint: sprintEnCurso.idSprint })
  }

  // Seleccion manual del sprint
  seleccionarSprint() {
    let idSprint = this.fcSprintId.value;
    this.frmNuevoTicket.patchValue({
      idSprint: idSprint
    })
    this.recuperarTickets();
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
    }).catch(err => {
      console.log('Error al recuperar los tickets', err)
    }).finally(() => {
      this.cargando = false;
    });
  }

  // TICKETS

  abrirModalNuevoTicket(modal: any) {
    this.modalService.open(modal, {
      size: 'lg'
    });
  }

  abrirModalEditarTicket(modal: any, ticket: Ticket) {
    this.frmEditarTicket.patchValue(ticket);

    this.modalService.open(modal, {
      size: 'lg'
    });
  }

  /**
   * Registra el nuevo Ticket
   * @returns 
   */
  async guardarNuevoTicket() {
    this.estaRegistrandoTicket = true;

    let idTicket = await this.generarNuevoIdTicket();

    this.guardarTicketDB(idTicket).then(() => {
      // OK
      this.modalService.dismissAll();
      this.recuperarTickets();
    }).catch((err) => {
      // ERROR
      window.alert('ocurio un error al registrar ticket');
      this.modalService.dismissAll();
    }).finally(() => {
      this.estaRegistrandoTicket = false;
    })
  }

  /**
   * Actualiza un Ticket
   * @returns 
   */
  actualizarTicket() {
    this.estaActualizandoTicket = true;

    let idTicket = this.frmEditarTicket.controls['idTicket'].value;

    this.actualizarTicketDB(idTicket).then(() => {
      // OK
      this.modalService.dismissAll();
      this.recuperarTickets();
    }).catch((err) => {
      // ERROR
      window.alert('ocurio un error al actualizar ticket');
      this.modalService.dismissAll();
    }).finally(() => {
      this.estaActualizandoTicket = false;
    })
  }

  //
  // OPERACIONES A LA BASE DE DATOS
  //

  /**
   * Generar el nuevo ID del ticket
   * @returns Un codigo con el formato T000001
   */
  generarNuevoIdTicket(): Promise<string> {
    const obs = this.db.collection('tickets', ref => {
      return ref.orderBy('idTicket', 'desc').limit(1)
    }).get();

    return firstValueFrom(obs).then(snapshot => {
      let items: any[] = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      })

      let contador = Number(items[0].idTicket.slice(1, 7));
      contador = contador + 1;
      let idTicket = '';

      if (contador <= 9) {
        idTicket = `T00000${contador}`;
      } else if (contador <= 99) {
        idTicket = `T0000${contador}`;
      } else if (contador <= 999) {
        idTicket = `T000${contador}`;
      } else if (contador <= 9999) {
        idTicket = `T00${contador}`;
      } else if (contador <= 99999) {
        idTicket = `T0${contador}`;
      } else if (contador <= 999999) {
        idTicket = `T${contador}`;
      }

      return 'T000000';
      return idTicket;
    });
  }

  /**
   * Registra un nuevo Ticket
   * @idTicket Identificador unico del ticket
   */
  guardarTicketDB(idTicket: string): Promise<void> {
    const timestamp: number = (new Date()).getTime();

    const ticket = {
      // Identificacion
      idTicket: idTicket,
      idSprint: this.frmNuevoTicket.controls['idSprint'].value,
      fechaCreacion: timestamp,

      // Informacion básica
      titulo: this.frmNuevoTicket.controls['titulo'].value,
      descripcion: this.frmNuevoTicket.controls['descripcion'].value,
      tiempoEstimado: this.frmNuevoTicket.controls['tiempoEstimado'].value,
      asignadoA: this.frmNuevoTicket.controls['asignadoA'].value,
      avance: 0,
      anotaciones: '',

      // Expediente relacionado
      expediente: this.frmNuevoTicket.controls['expediente'].value,
      demandante: this.frmNuevoTicket.controls['demandante'].value,
      demandado: this.frmNuevoTicket.controls['demandado'].value,
      materia: this.frmNuevoTicket.controls['materia'].value,
      area: this.frmNuevoTicket.controls['area'].value,
    }

    return this.db.collection('tickets').doc(idTicket).set(ticket);
  }

  /**
   * Actualizar un Ticket
   * @idTicket Identificador unico del ticket
   */
  actualizarTicketDB(idTicket: string): Promise<void> {
    const timestamp: number = (new Date()).getTime();

    const ticket = {
      // Informacion básica
      titulo: this.frmEditarTicket.controls['titulo'].value,
      descripcion: this.frmEditarTicket.controls['descripcion'].value,
      tiempoEstimado: this.frmEditarTicket.controls['tiempoEstimado'].value,
      asignadoA: this.frmEditarTicket.controls['asignadoA'].value,

      // Expediente relacionado
      expediente: this.frmEditarTicket.controls['expediente'].value,
      demandante: this.frmEditarTicket.controls['demandante'].value,
      demandado: this.frmEditarTicket.controls['demandado'].value,
      materia: this.frmEditarTicket.controls['materia'].value,
      area: this.frmEditarTicket.controls['area'].value,
    }

    return this.db.collection('tickets').doc(idTicket).update(ticket);
  }

}
