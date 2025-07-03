import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { concatAll, firstValueFrom } from 'rxjs';
import { AppService } from '../app.service';
import { Expediente } from '../_interfaces/expediente';

class ObjMateria {
  idmateria: string;
  smateria: string;
  sespecialidad: string;
  constructor(data: any) {
    this.idmateria = data.idmateria;
    this.smateria = data.smateria;
    this.sespecialidad = data.sespecialidad;
  }
}

@Component({
  selector: 'app-expediente-register',
  templateUrl: './expediente-register.component.html',
  styleUrls: ['./expediente-register.component.scss']
})
export class ExpedienteRegisterComponent {
  expedientes: Expediente[] = [];
  expedientesFiltrados: Expediente[] = [];
  frmExpediente: FormGroup;
  estaGuardando: boolean = false;
  esCuaderno: boolean = false;

  materias: Array<ObjMateria> = [];
  materiasFiltradas: Array<ObjMateria> = [];

  constructor(
    private db: AngularFirestore,
    private titleService: Title,
    private router: Router,
    private service: AppService,
    private modalService: NgbModal,
  ) {
    this.titleService.setTitle('Registrar Expediente');

    this.frmExpediente = new FormGroup({
      clase: new FormControl(null, Validators.required),
      titulo: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.required),
      numeroPrincipal: new FormControl(null),
      especialidad: new FormControl(null, Validators.required),
      materia: new FormControl(null, Validators.required),
      demandante: new FormControl(null, Validators.required),
      demandado: new FormControl(null, Validators.required),
      juzgado: new FormControl(null, Validators.required),
      fechaInicio: new FormControl(null, Validators.required),
    });

    this.getMaterias();
    this.getExpedientes();
  }

  getMaterias() {
    let obs = this.db.collection('materias').get();

    firstValueFrom(obs).then(snapshot => {
      snapshot.forEach(doc => {
        this.materias.push(new ObjMateria(doc.data()));
      })
    })
  }

  setLstMaterias() {
    let sespecialidad = this.frmExpediente.controls['especialidad'].value;
    this.materiasFiltradas = this.materias.filter(a => a.sespecialidad == sespecialidad);
  }

  getExpedientes() {
    this.service.expedientes.subscribe((res: any) => {
      this.expedientes = res.filter((e: any) => e.estado == 'EN PROCESO')
        .filter((e: any) => e.clase == 'PRINCIPAL');
    });
  }

  onCambioClase() {
    let clase = this.frmExpediente.controls['clase'].value;
    this.esCuaderno = clase == 'CUADERNO' ? true : false;
    this.setValidator();
  }

  abrirModal(modal: any): void {
    this.modalService.open(modal, {
      windowClass: 'modal-md',
    });
    document.getElementById('querybox')?.focus();
  }

  onCambioQuery(input: any) {
    let query = input.value.toUpperCase().trim();
    if (query.length < 2) {
      this.expedientesFiltrados = [];
      return;
    }
    this.expedientesFiltrados = this.expedientes.filter(e => e.numero.includes(query)).slice(0, 5);
  }

  onSelectExp(exp: Expediente) {
    this.modalService.dismissAll();
    this.frmExpediente.patchValue({
      numeroPrincipal: exp.numero,
      especialidad: exp.especialidad,
      materia: exp.materia,
    });
    this.expedientesFiltrados = [];
    this.setLstMaterias();
  }

  /**
   * Establece el validator del input para el numero de expediente
   */
  setValidator() {
    let idtipodoc = this.frmExpediente.controls['clase'].value;
    let regexp: RegExp = /REGEX/;

    switch (idtipodoc) {
      case 'PRINCIPAL':
        this.frmExpediente.patchValue({ titulo: 'EXPEDIENTE PRINCIPAL', numeroPrincipal: null });
        regexp = /^\d{5}-\d{4}-[0]-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/;
        this.frmExpediente.controls['numeroPrincipal'].clearValidators();
        break;
      case 'PROVISIONAL':
        this.frmExpediente.patchValue({ titulo: 'EXPEDIENTE PROVISIONAL', numeroPrincipal: null });
        regexp = /^[a-zA-Z0-9-]{5,30}$/;
        this.frmExpediente.controls['numeroPrincipal'].clearValidators();
        break;
      case 'CUADERNO':
        this.frmExpediente.patchValue({ titulo: '', numeroPrincipal: '' });
        regexp = /^\d{5}-\d{4}-([1-9]|[1-9]\d)-\d{4}-[A-Z]{2}-[A-Z]{2}-\d{2}$/;
        this.frmExpediente.controls['numeroPrincipal'].setValidators([Validators.required]);
        break;
      case 'CF':
        this.frmExpediente.patchValue({ titulo: 'CARPETA FISCAL', numeroPrincipal: null });
        regexp = /^\d+(-\d+)*$/;
        this.frmExpediente.controls['numeroPrincipal'].clearValidators();
        break;
      default:
        window.alert('ERROR DE ELECCION')
    }

    this.frmExpediente.controls['numero'].setValidators([
      Validators.required,
      Validators.pattern(regexp)
    ]);
    this.frmExpediente.controls['numero'].updateValueAndValidity();
    this.frmExpediente.controls['numeroPrincipal'].updateValueAndValidity();
  }

  /**
   * Registra el nuevo expediente
   * @returns 
   */
  async guardarExpediente() {
    this.estaGuardando = true;
    let numeroExp = this.frmExpediente.controls['numero'].value.toUpperCase().trim();
    let existeExp = await this.existeExpediente(numeroExp);

    if (existeExp) {
      window.alert('Numero de expediente ya existe');
      this.estaGuardando = false;
      return;
    }

    let idExpediente = await this.generarNuevoIdExpediente();

    this.guardarExpedienteDB(idExpediente).then(() => {
      this.router.navigate(['/expedientes-updater/'], {
        queryParams: {
          expediente: numeroExp,
        }
      })
      console.log('ok')
    }).catch((err) => {
      console.log('error', err)
      window.alert('ocurio un error al registrar expediente');
    }).finally(() => {
      this.estaGuardando = false;
    })
  }

  //
  // OPERACIONES A LA BASE DE DATOS
  //

  /**
   * Verifica si un expediente existe en la Base de Datos
   * @numero Numero del expediente
   * @returns True si existe, false si no existe
   */
  existeExpediente(numero: string): Promise<boolean> {
    let obs = this.db.collection('expedientes', ref => {
      return ref.where('numero', '==', numero);
    }).get();
    return firstValueFrom(obs).then(snapshot => {
      let contador = 0;
      snapshot.forEach(doc => {
        contador = contador + 1;
      })
      if (contador > 0) {
        return true;
      } else {
        return false;
      }
    })
  }

  /**
   * Generar el nuevo ID del expediente
   * @returns Un codigo con el formato E000001
   */
  generarNuevoIdExpediente(): Promise<string> {
    const obs = this.db.collection('expedientes', ref => {
      return ref.orderBy('idExpediente', 'desc').limit(1)
    }).get();

    return firstValueFrom(obs).then(snapshot => {
      let lista: any[] = [];
      snapshot.forEach(doc => {
        lista.push(doc.data())
      })

      let contador = Number(lista[0].idExpediente.slice(1, 7));
      contador = contador + 1;
      let idExpediente = '';

      if (contador <= 9) {
        idExpediente = `E00000${contador}`;
      } else if (contador <= 99) {
        idExpediente = `E0000${contador}`;
      } else if (contador <= 999) {
        idExpediente = `E000${contador}`;
      } else if (contador <= 9999) {
        idExpediente = `E00${contador}`;
      } else if (contador <= 99999) {
        idExpediente = `E0${contador}`;
      } else if (contador <= 999999) {
        idExpediente = `E${contador}`;
      }

      return idExpediente;
    });
  }

  /**
   * Registra un nuevo Expediente
   * @idExpediente Identificador unico del expediente
   */
  guardarExpedienteDB(idExpediente: string): Promise<void> {
    const timestamp: number = (new Date()).getTime();

    const expediente = {
      idExpediente: idExpediente,
      clase: this.frmExpediente.controls['clase'].value,
      titulo: this.frmExpediente.controls['titulo'].value.toUpperCase().trim(),
      numero: this.frmExpediente.controls['numero'].value.toUpperCase().trim(),
      numeroProvisional: null,
      numeroPrincipal: this.frmExpediente.controls['numeroPrincipal'].value,
      especialidad: this.frmExpediente.controls['especialidad'].value,
      nivelIter: null,
      demandante: this.frmExpediente.controls['demandante'].value.toUpperCase().trim(),
      demandado: this.frmExpediente.controls['demandado'].value.toUpperCase().trim(),
      materia: this.frmExpediente.controls['materia'].value.toUpperCase().trim(),
      juzgado: this.frmExpediente.controls['juzgado'].value.toUpperCase().trim(),
      prioridad: "MEDIA",
      tieneContrato: false,
      fechaInicio: this.frmExpediente.controls['fechaInicio'].value.trim(),
      codigo: null,
      observaciones: "",
      estado: "EN PROCESO",
      motivoFinalizacion: null,
      fechaCreacion: timestamp,
      numeroCasacion: null,
      salaCasacion: null,

      nombreCliente: '-',
      dni: '-',
      celular: '-',
      detalleContrato: '-',
    }

    return this.db.collection('expedientes').doc(idExpediente).set(expediente);
  }

}
