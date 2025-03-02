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

  llave1 = false;
  llave2 = false;
  llave3 = false;
  llave4 = false;

  constructor(
    private db: AngularFirestore,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.expediente) {
      // this.getCuotas();
      // this.getPagos();
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
      this.llave2 = true;
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
      this.pagos = lista.map(p => {
        return {
          ...p,
          sdescripcion: p.sdescripcion.replace(/\n/g, ' '),
        }
      })
      this.llave3 = true;
    })
  }

  activarLlave1() {
    this.llave1 = true;
    this.getCuotas();
    this.getPagos();
  }

  activarLlave4() {
    this.llave4 = true;
  }

  generatePDF() {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const headerHeight = 35;

    // add image
    // const logoImg = 'assets/logo.png';
    // doc.addImage(logoImg, 'PNG', 10, 55, 190, 20);

    // Imagen del membrete (Base64 o URL convertida a Base64)
    fetch('assets/superior.png')
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        const expediente = this.expediente;
        const iter = '5.2	Audiencia vista de la causa';
        const contrato = this.cuotas.filter(c => c.nmonto > 0);
        const pagos = this.pagos;

        reader.onloadend = function () {
          const base64data = reader.result as string;

          // TITULO -----------------------------------------------------------
          let yPosition = headerHeight + 15;
          doc.setFontSize(14);
          doc.setFont('helvetica', 'bold');
          doc.text("INFORME ECONOMICO", 105, yPosition, { align: 'center' });

          doc.setFontSize(11);

          // DESTINATARIO -----------------------------------------------------
          yPosition += 10;
          doc.setFont('helvetica', 'bold');
          doc.text("A", 25, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.text(`: ${expediente?.demandante}`, 42, yPosition);

          // REMITENTE --------------------------------------------------------
          yPosition += 7;
          doc.setFont('helvetica', 'bold');
          doc.text("DE", 25, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.text(": Silva Guillen Abogados S.A.C.", 42, yPosition);

          // FECHA ------------------------------------------------------------
          yPosition += 7;
          doc.setFont('helvetica', 'bold');
          doc.text("FECHA", 25, yPosition);
          doc.setFont('helvetica', 'normal');
          doc.text(`: ${'01/03/2025'}`, 42, yPosition);

          // I. OBJETO --------------------------------------------------------
          yPosition += 10;
          doc.setFont('helvetica', 'bold');
          doc.text("I. OBJETO", 25, yPosition);

          // OBJETO - texto
          yPosition += 7;
          doc.setFont('helvetica', 'normal');
          let texto = `Por medio de la presente, nos dirigimos a usted para saludarle cordialmente y esperando que tenga un buen día. El objeto del presente informe es desarrollar y establecer los actos realizados en el presente proceso, asimismo informar al cliente los pagos realizados, ello acorde al contrato realizado con el Estudio Jurídico Silva Guillén Abogados S.A.C.`;
          let textoFormateado = doc.splitTextToSize(texto, 160);
          doc.text(textoFormateado, 25, yPosition, { align: 'justify', maxWidth: 160, lineHeightFactor: 1.5 });
          let textHeight = textoFormateado.length * 5;
          yPosition += textHeight + 7;

          // II. EXPEDIENTE ---------------------------------------------------
          yPosition += 0;
          doc.setFont('helvetica', 'bold');
          doc.text("II. EXPEDIENTE", 25, yPosition);
          yPosition += 0;

          // EXPEDIENTE - texto
          yPosition += 7;
          doc.setFont('helvetica', 'normal');
          texto = `Los datos del expediente son:`;
          textoFormateado = doc.splitTextToSize(texto, 160);
          doc.text(textoFormateado, 25, yPosition, { align: 'justify', maxWidth: 160, lineHeightFactor: 1.5 });
          textHeight = textoFormateado.length * 5;
          yPosition += textHeight + 3;

          // EXPEDIENTE - numero - key
          yPosition += 0;
          doc.text("Número", 35, yPosition);
          yPosition += 0;

          // EXPEDIENTE - numero - value
          yPosition += 0;
          doc.text(`: ${expediente?.numero}`, 60, yPosition);
          yPosition += 7;

          // EXPEDIENTE - materia - key
          yPosition += 0;
          doc.text("Materia", 35, yPosition);
          yPosition += 0;

          // EXPEDIENTE - materia - value
          yPosition += 0;
          doc.text(`: ${expediente?.materia}`, 60, yPosition);
          yPosition += 7;

          // EXPEDIENTE - demandante - key
          yPosition += 0;
          doc.text("Demandante", 35, yPosition);
          yPosition += 0;

          // EXPEDIENTE - demandante - value
          yPosition += 0;
          doc.text(`: ${expediente?.demandante}`, 60, yPosition);
          yPosition += 7;

          // EXPEDIENTE - demandado - key
          yPosition += 0;
          doc.text("Demandado", 35, yPosition);
          yPosition += 0;

          // EXPEDIENTE - demandado - value
          yPosition += 0;
          doc.text(`: ${expediente?.demandado}`, 60, yPosition);
          yPosition += 7;

          // III. CONTRATO ----------------------------------------------------
          yPosition += 3;
          doc.setFont('helvetica', 'bold');
          doc.text(`III. CONTRATO`, 25, yPosition);
          yPosition += 7;

          // CONTRATO - texto
          yPosition += 0;
          doc.setFont('helvetica', 'normal');
          doc.text("El contrato acordado entre ambas partes se detalla de la siguiente manera:", 25, yPosition);
          yPosition += 5;
          
          // CONTRATO - tabla
          autoTable(doc, {
            startY: yPosition,

            head: [["Concepto", "Monto"]],
            body: contrato.map(item => [item.sdetalle, item.nmonto.toFixed(2)]),
            theme: "grid",
            margin: { top: 45, right: 25, bottom: 25, left: 25 },
            didDrawPage: (data) => {
              doc.addImage(base64data, "PNG", 0, 0, pageWidth, headerHeight);
            }
          });
          const finalTableY = (doc as any).lastAutoTable.finalY;
          yPosition = finalTableY + 3;

          // IV. PAGOS --------------------------------------------------------
          yPosition += 7;
          doc.setFont('helvetica', 'bold');
          doc.text(`IV. PAGOS`, 25, yPosition);
          yPosition += 0;

          // PAGOS - texto
          yPosition = yPosition + 7;
          doc.setFont('helvetica', 'normal');
          doc.text(`El Estudio Jurídico declara haber recibido los siguientes pagos:`, 25, yPosition);

          // PAGOS - tabla
          yPosition = yPosition + 5;
          autoTable(doc, {
            startY: yPosition,

            head: [["Fecha", "Monto", "Detalle"]],
            body: pagos.map(item => [item.sfecha, item.nmonto.toFixed(2), item.sdescripcion]),
            theme: "grid",
            margin: { top: 45, right: 25, bottom: 25, left: 25 },
            didDrawPage: (data) => {
              doc.addImage(base64data, "PNG", 0, 0, pageWidth, headerHeight);
            }
          });
          const finalTableY2 = (doc as any).lastAutoTable.finalY;

          // Verificar si la imagen cabe en la última página, si no, crear una nueva página
          const espacioDisponible = pageHeight - finalTableY2 - 30; // Considerar márgenes

          if (espacioDisponible < 30) {
            doc.addPage();
            yPosition = 30; // Reiniciar la posición en la nueva página
          } else {
            yPosition = finalTableY2;
          }


          // ATENTAMENTE ------------------------------------------------------
          yPosition += 15;
          doc.setFont('helvetica', 'bold');
          doc.text(`Atentamente:`, 25, yPosition);
          yPosition += 0;


          // ESPACIO FIRMA DIGITAL
          yPosition += 35;
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
