import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class Cliente {
  idcliente: string;
  sexpediente: string;
  spaterno: string;
  smaterno: string;
  snombres: string;
  dfechnac: Date;
  scelular: string;
  scorreo: string;
  sdireccion: string;
  sdni: string;
  sestadocivil: string;
  sgenero: string;
  socupacion: string;
  sobservacion: string;
  constructor(data: any) {
    this.idcliente = data.idcliente;
    this.sexpediente = data.sexpediente;
    this.spaterno = data.spaterno;
    this.smaterno = data.smaterno;
    this.snombres = data.snombres;
    this.dfechnac = data.dfechnac;
    this.scelular = data.scelular;
    this.scorreo = data.scorreo;
    this.sdireccion = data.sdireccion;
    this.sdni = data.sdni;
    this.sestadocivil = data.sestadocivil;
    this.sgenero = data.sgenero;
    this.socupacion = data.socupacion;
    this.sobservacion = data.sobservacion;  
  }
}

@Component({
  selector: 'app-expediente-item-client',
  templateUrl: './expediente-item-client.component.html',
  styleUrls: ['./expediente-item-client.component.scss']
})
export class ExpedienteItemClientComponent implements OnInit {
  @Input('sexpediente') sexpediente: string = '';
  objCliente: Cliente = new Cliente({});
  lCliente: boolean = false;

  constructor(
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.getCliente();
  }

  getCliente() {
    let observando = this.db.collection('clientes', ref => {
        return ref.where('sexpediente', '==', this.sexpediente)
      })
      .valueChanges()
      .subscribe((data: Array<any>)=> {
        if (data.length > 0) {
          this.objCliente = new Cliente(data[0]);
          this.lCliente = true;
        } else {
          this.lCliente = false;
        }

        observando.unsubscribe();
      })
  }

}
