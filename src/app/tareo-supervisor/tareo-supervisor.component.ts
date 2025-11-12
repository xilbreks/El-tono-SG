import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tareo } from '../_interfaces/tareo';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tareo-supervisor',
  templateUrl: './tareo-supervisor.component.html',
  styleUrl: './tareo-supervisor.component.scss'
})
export class TareoSupervisorComponent {
  tareos: Tareo[] = [];
  usuarios: any[] = [];

  fcFecha: FormControl = new FormControl(null);
  fcUsuario: FormControl = new FormControl(null);

  cargando = false;

  constructor(
    private db: AngularFirestore,
  ) {
    this.colocarFechaHoy();
    this.saberQuienSoy();
  }

  // Funciones internas

  colocarFechaHoy() {
    let d = new Date();
    var year = '' + d.getFullYear();
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();

    if (month.length < 2) {
      month = '0' + month;
    }

    if (day.length < 2) {
      day = '0' + day;
    }

    let s = [year, month, day].join('-');

    this.fcFecha.setValue(s);
  }

  saberQuienSoy() {
    let usuario = localStorage.getItem('idusuario');
    console.log('soy: ', usuario);
    // usuario = 'Maria-Tunquipa';  // Quitar luego
    switch (usuario) {
      case 'Crishtian-Paucar':
        this.usuarios = [
          {
            id: 'spuma',
            nombre: 'Stephany',
          },
          {
            id: 'fespinoza',
            nombre: 'Flavia',
          },
          {
            id: 'michael-vilca',
            nombre: 'Michael',
          },
          {
            id: 'gchino',
            nombre: 'Grecia',
          },
        ];
        break;
      case 'Huander-Montoya':
        this.usuarios = [
          {
            id: 'Paola-Guzman',
            nombre: 'Paola',
          },
          {
            id: 'wilson-apaza',
            nombre: 'Wilson',
          },
          {
            id: 'Alejandra-Chacaltana',
            nombre: 'Gabylu',
          },
          {
            id: 'Shaunny-Fernandez',
            nombre: 'Shaunny',
          },
          {
            id: 'Angelly-Castillo',
            nombre: 'Angelly',
          },
          {
            id: 'Esmeralda-Aslla',
            nombre: 'Esmeralda',
          },
          {
            id: 'Viameli-Ccama',
            nombre: 'Viameli',
          },
          {
            id: 'mcastelo',
            nombre: 'Mafi',
          },
        ];
        break;
      case 'jmachaca':
        this.usuarios = [
          {
            id: 'Alisson-Guillen',
            nombre: 'Alisson',
          },
          {
            id: 'gmoa',
            nombre: 'Gabriella',
          },
          {
            id: 'azaravia',
            nombre: 'Alejandro',
          },
          {
            id: 'Leonardo-Flores',
            nombre: 'Leonardo',
          },
          {
            id: 'avargas',
            nombre: 'Ana',
          },
          {
            id: 'marco-mamani',
            nombre: 'Marco',
          },
        ];
        break;
    }
  }

  // Acciones de usuario

  async obtenerTareos() {
    this.cargando = true;
    let fecha = this.fcFecha.value;
    let idUsuario = this.fcUsuario.value;
    let tareos = await this.recuperarTareo(fecha, idUsuario);
    this.tareos = tareos;

    this.cargando = false;
  }

  // Operaciones a la base de datos

  recuperarTareo(fecha: string, idUsuario: string): Promise<any[]> {
    const idTareo = `${fecha}-${idUsuario}`;
    const query = this.db.collection('tareo', ref => {
      return ref.where('idTareo', '==', idTareo)
    }).get();

    return firstValueFrom(query).then(snapshot => {
      let items: any = [];
      snapshot.forEach(doc => {
        items.push(doc.data())
      })
      return items;
    }).catch(err => {
      throw err;
    })
  }
}
