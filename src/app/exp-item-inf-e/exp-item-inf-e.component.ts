import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Expediente } from './../_interfaces/expediente';
import { Contrato } from '../_interfaces/contrato';
import { Pago } from './../_interfaces/pago';
import { firstValueFrom } from 'rxjs';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

@Component({
  selector: 'app-exp-item-inf-e',
  templateUrl: './exp-item-inf-e.component.html',
  styleUrl: './exp-item-inf-e.component.scss'
})
export class ExpItemInfEComponent implements OnChanges {
  @Input('expediente') expediente: Expediente | null = null;

  cuotas: Array<Contrato> = [];
  pagos: Array<Pago> = [];

  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      this.getCuotas();
      this.getPagos();
    }
  }

  getCuotas() {
    let obs = this.db.collection('contratos', ref => {
      return ref.where('idExpediente', '==', this.expediente?.idExpediente)
        .where('lactive', '==', true)
    }).get();

    firstValueFrom(obs).then(snapshot => {
      let lista: any[] = [];
      snapshot.forEach(doc => {
        lista.push(doc.data())
      });
      this.cuotas = lista;
    })
  }

  getPagos(): void {
    let obs = this.db.collection('pagos', ref => {
      return ref.where('idExpediente', '==', this.expediente?.idExpediente)
        .where('lactive', '==', true)
    }).get();
    firstValueFrom(obs).then(snapshot => {
      let lista: any[] = [];
      snapshot.forEach(doc => {
        lista.push(doc.data())
      })
      this.pagos = lista;
    })
  }

  generatePDF() {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const headerHeight = 35;

    // Imagen del membrete (Base64 o URL convertida a Base64)
    fetch('assets/superior.png')
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        const expediente = this.expediente;
        const iter = 'falta recuperar el iter';
        const contrato = this.cuotas;
        const pagos = this.pagos;

        reader.onloadend = function () {
          const base64data = reader.result as string;

          // Ajustar contenido después del membrete
          let yPosition = headerHeight + 10;
          doc.setFontSize(16);
          doc.setFont('helvetica', 'bold');
          doc.text("INFORME ECONOMICO", 105, yPosition, { align: 'center' });

          doc.setFontSize(12);

          yPosition += 10;
          doc.setFont('helvetica', 'bold');
          doc.text("PARA", 25, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.text(`: ${expediente?.demandante}`, 42, yPosition);

          yPosition += 7;
          doc.setFont('helvetica', 'bold');
          doc.text("DE", 25, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.text(": Silva Guillen Abogados S.A.C.", 42, yPosition);

          yPosition += 7;
          doc.setFont('helvetica', 'bold');
          doc.text("FECHA", 25, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.text(`: ${'01/03/2025'}`, 42, yPosition);

          // Motivo del informe
          yPosition += 10;
          const texto = `El objeto del presente informe es desarrollar y establecer los actos realizados en el presente proceso, asimismo informar al cliente los pagos realizados, ello acorde al contrato realizado con el Estudio Jurídico Silva Guillén Abogados S.A.C. respecto al proceso sobre ${expediente?.materia} que se sigue en contra de ${expediente?.demandado} recaído en el expediente con numero ${expediente?.numero}.`;
          const margenIzquierdo = 25;
          const anchoPagina = 170;
          const textoFormateado = doc.splitTextToSize(texto, anchoPagina);
          doc.text(textoFormateado, margenIzquierdo, yPosition);
          const textHeight = doc.getTextDimensions(textoFormateado).h;

          // Configuración de la tabla
          yPosition = yPosition + textHeight + 7;
          doc.setFont('helvetica', 'bold');
          doc.text(`CONTRATO`, 25, yPosition);
          yPosition = yPosition + 5;
          autoTable(doc, {
            startY: yPosition,

            head: [["Concepto", "Monto"]],
            body: contrato.map(item => [item.sdetalle, item.nmonto.toFixed(2)]),
            theme: "grid",
            margin: { top: 30, right: 50, left: 25 },
            didDrawPage: (data) => {
              // Repetir el membrete en cada página
              doc.addImage(base64data, "PNG", 0, 0, pageWidth, headerHeight);
              doc.setFontSize(10);
              doc.text(`Página ${doc.internal.pages.length - 1}`, pageWidth - 20, pageHeight - 10);
            }
          });
          const finalTableY = (doc as any).lastAutoTable.finalY;

          // Texto Largo 2 del informe
          yPosition = finalTableY + 7;
          doc.text(textoFormateado, margenIzquierdo, yPosition);

          // TITULO PAGOS
          yPosition = yPosition + textHeight + 7;
          doc.setFont('helvetica', 'bold');
          doc.text(`PAGOS`, 25, yPosition);

          yPosition = yPosition + 7;
          doc.setFont('helvetica', 'normal');
          doc.text(`El Estudio Jurídico declara haber recibido los siguientes pagos:`, 25, yPosition);

          // TABLA DE PAGOS
          yPosition = yPosition + 5;
          autoTable(doc, {
            startY: yPosition,

            head: [["Fecha", "Monto", "Detalle"]],
            body: pagos.map(item => [item.sfecha, item.nmonto.toFixed(2), item.sdescripcion]),
            theme: "grid",
            margin: { top: 40, right: 25, left: 25 },
            didDrawPage: (data) => {
              // Repetir el membrete en cada página
              doc.addImage(base64data, "PNG", 0, 0, pageWidth, headerHeight);
              doc.setFontSize(10);
              doc.text(`Página ${doc.internal.pages.length - 1}`, pageWidth - 20, pageHeight - 10);
            }
          });
          const finalTableY2 = (doc as any).lastAutoTable.finalY;


          // Verificar si la imagen cabe en la última página, si no, crear una nueva página
          const espacioDisponible = pageHeight - finalTableY2 - 30; // Considerar márgenes

          if (espacioDisponible < 30) {
            doc.addPage();
            yPosition = 30; // Reiniciar la posición en la nueva página
          }


          // TITULO PAGOS
          yPosition = yPosition + 10;
          doc.setFont('helvetica', 'bold');
          doc.text(`ESTADO`, 25, yPosition);


          // Motivo del informe
          yPosition += 7;
          doc.setFont('helvetica', 'normal');
          const texto3 = `La situacion actual en la que se encuentra el expedientes es en el ITER: ${iter}`;
          const textoFormateado3 = doc.splitTextToSize(texto3, 170);
          doc.text(textoFormateado3, margenIzquierdo, yPosition);
          const textHeight3 = doc.getTextDimensions(textoFormateado3).h;


          // ESPACIO FIRMA DIGITAL
          yPosition += textHeight3 + 40;
          doc.setFont('helvetica', 'normal');
          doc.text("_________________________________", 105, yPosition, { align: 'center' });
          yPosition += 7;
          doc.text("SILVA GUILLEN ABOGADOS S.A.C.", 105, yPosition, { align: 'center' });
          yPosition += 7;
          doc.text("RUC 20606279001", 105, yPosition, { align: 'center' });

          // FIRMA DIGITAL
          // Cargar imagen desde la carpeta "assets"
          const imageUrl = "assets/firma.jpeg"; // Cambia esto por la ruta correcta de tu imagen

          // Cargar la imagen y colocarla en la última página
          // const imgWidth = 60; // Aproximadamente 6cm
          // const imgHeight = 25; // Aproximadamente 2.5cm
          doc.addImage(imageUrl, 'jpeg', 78, yPosition - 50, 251 / 4.4, 156 / 4.4);

          // Mostrar PDF en nueva pestaña
          const pdfBlob = doc.output('blob');
          const url = URL.createObjectURL(pdfBlob);
          window.open(url);

          // Abrir en una nueva pestaña
          // doc.output("dataurlnewwindow");
        }
      })
      .catch(err => {
        console.log('error', err);
      })

  }

}
