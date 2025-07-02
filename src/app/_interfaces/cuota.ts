export interface Cuota {
    idCuota: string;            // Identificador unico de la cuota
    idExpediente: string;       // Identificador del expediente asociado
    numero: number;             // Número de la cuota
    monto: number;              // Monto de la cuota
    vencimiento: null | string; // Fecha de vencimiento de la cuota
    estado: string;             // Estado de la cuota: EN-PLAZO | PAGADA | VENCIDA
    observaciones: string;      // Observaciones de la cuota

    numeroExpediente: string;   // Numero del expediente
    demandante: string;         // Nombre del demandante
    demandado: string;          // Nombre del demandado
    especialidad: string;       // Area de especialidad
    materia: string;            // Materia del expediente
}
