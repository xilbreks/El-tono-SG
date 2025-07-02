export interface Abono {
    idAbono: string;            // Identificador unico del abono
    idExpediente: string;       // Identificador del expediente asociado
    fecha: string;              // Fecha del abono formato: yyyy-mm-dd
    monto: number;              // Monto del abono
    metodo: string;             // Metodo del pago: BCP | YAPE | PLIN | BBVA | EFECTIVO
    observaciones: string;      // Observaciones del abono

    numeroExpediente: string;   // Numero del expediente
    demandante: string;         // Nombre del demandante
    demandado: string;          // Nombre del demandado
    especialidad: string;       // Area de especialidad
    materia: string;            // Materia del expediente
}
