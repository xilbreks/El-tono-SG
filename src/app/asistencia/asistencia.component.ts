import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as XLSX from 'xlsx';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss']
})
export class AsistenciaComponent {
  lstUsuarios: Array<any> = [];
  frmStats: FormGroup;
  lGenerating: boolean = false;
  lalala: Array<any> = [];
  lelele: any;

  constructor(
    private db: AngularFirestore,
  ) {
    /************************
     * INIT FORM DATE RANGE *
     ************************/
    this.frmStats = new FormGroup({
      sinicio: new FormControl(null, Validators.required),
      sfinal: new FormControl(null, Validators.required),
      lstusers: new FormControl(null, Validators.required),
    });

    this.getUsers();
  }

  getUsers() {
    let obs = this.db
      .collection('colaboradores', (ref) => {
        return ref.where('lactive', '==', true);
      })
      .valueChanges()
      .subscribe((users: Array<any>) => {
        this.lstUsuarios = users;
        this.frmStats.controls['lstusers'].setValue('ok')
        obs.unsubscribe();
      });
  }

  generar() {
    this.lGenerating = true;
    let obs2 = this.db.collection('rdts', ref => {
      return ref.where('sfecha', '>=', this.frmStats.value['sinicio'])
        .where('sfecha', '<=', this.frmStats.value['sfinal']);
    }).valueChanges()
      .subscribe(lstRDT => {
        let lstLabelRDT = lstRDT.map((rdt: any) => rdt.idrdt);
        let lstDatesRDT: string[] = [];
        lstRDT.map((rdt: any) => rdt.idrdt.slice(0, 10)).forEach(sdate => {
          if (!lstDatesRDT.includes(sdate)) {
            lstDatesRDT.push(sdate)
          }
        })
        let cabecera = lstDatesRDT.map(a => {
          return {
            sclass: 'grey',
            stext: a
          }
        });
        cabecera.unshift({
          sclass: 'grey',
          stext: 'C/F'
        });
        cabecera.push({
          sclass: 'grey',
          stext: 'SUM'
        });
        let lstAsistencia: any[][] = [cabecera];
        this.lstUsuarios.forEach(u => {
          let lstAsistenciaUser: Array<any> = [{
            sclass: 'grey',
            stext: u.snombre
          }];
          let nSumMinutos = 0;
          lstDatesRDT.forEach(date => {
            let index = lstLabelRDT.indexOf(date + '-' + u.id);
            let obj = null;
            if (index >= 0) {
              let objRDT: any = lstRDT[index];
              if (
                objRDT['shorasalida'] != '--' &&
                objRDT['shoraingreso'] != '--'
              ) {
                let nhoras = Number(objRDT['shorasalida']) - Number(objRDT['shoraingreso']);
                let nminutos = Number(objRDT['sminutosalida']) - Number(objRDT['sminutoingreso']);
                let nSumMin = nhoras * 60 + nminutos;
                nSumMinutos += nSumMin;
                let nHoras = Math.floor(nSumMin / 60);
                let nMinutos = nSumMin - nHoras * 60;
                obj = {
                  sclass: 'green',
                  stext: '' + nHoras + 'h ' + nMinutos + 'm' + `
                    (${objRDT['shoraingreso']}:${objRDT['sminutoingreso']} a ${objRDT['shorasalida']}:${objRDT['sminutosalida']})
                  `
                }
              } else {
                obj = {
                  sclass: 'red',
                  stext: '00:00'
                }
              }
            } else {
              obj = {
                sclass: 'red',
                stext: '00:00'
              }
            }
            lstAsistenciaUser.push(obj);
          });
          let nTotalHoras = Math.floor(nSumMinutos / 60);
          let nTotalMinutos = nSumMinutos - nTotalHoras * 60;
          lstAsistenciaUser.push({
            sclass: 'grey',
            stext: nTotalHoras + 'h ' + nTotalMinutos + 'm'
          });

          lstAsistencia.push(lstAsistenciaUser);
        });
        this.lalala = lstAsistencia;

        this.lGenerating = false;
        obs2.unsubscribe();
      })
  }

  descargarExcel(): void {
    let todo_Excel: Array<any> = [];

    this.lalala.forEach((lst: Array<any>) => {
      let lstTmp: Array<any> = [];
      lst.forEach(i => {
        lstTmp.push(i.stext)
      });
      todo_Excel.push(lstTmp);
    });

    this.lelele = todo_Excel;

    const worksheet = XLSX.utils.json_to_sheet(todo_Excel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tareas");
    XLSX.writeFile(workbook, 'Asistencia ' + this.frmStats.value['sinicio'] + ' a ' + this.frmStats.value['sfinal'] + '.xlsx', { compression: true });

  }

}
