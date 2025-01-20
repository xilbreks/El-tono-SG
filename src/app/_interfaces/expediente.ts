export interface Expediente {
    idExpediente: string;           // Identificador único del expediente
    clase: string;                  // Clase de documento: "PROVISIONAL", "PRINCIPAL", "CAUTELAR", "CF", "CURADURIA"
    numero: string;                 // Número alfanumérico del expediente
    especialidad: string;           // Área de especialidad: "LABORAL", "FAMILIA", "CIVIL", "PENAL", "CONSTITUCIONAL", "ADMINISTRATIVO"
    nivelIter: number;              // Indicador del nivel de ITER procesal
    demandante: string;             // Nombres completos de la parte demandante
    demandado: string;              // Nombres completos de la parte demandada
    materia: string;                // Descripción breve del caso
    juzgado: string;                // Juzgado u órgano jurisdiccional
    prioridad: string;              // Prioridad asignada al expediente: "ALTA", "MEDIA", "BAJA"
    tieneContrato: boolean;         // Indicador de si tiene contrato asociado
    fechaInicio: string;            // Fecha de inicio del proceso
    codigo: string | null;          // Codificación del expediente
    observaciones: string;          // Comentarios adicionales sobre el caso
    estado: string;                 // Estado actual del expediente: "EN PROCESO", "FINALIZADO"
    motivoFinalizacion: string | null; // Motivo por el cual el expediente fue finalizado
    fechaCreacion: number;          // Fecha de registro del expediente en formato timestamp (ej. (new Date()).getTime())
    numeroCasacion: string | null;  // Número de casación si aplica
    numeroCautelar: string | null;  // Número de cuaderno cautelar si aplica
    carpetaFiscal: string | null;   // Número de carpeta fiscal si aplica
    salaCasacion: string | null;    // Sala de la casación si aplica
}
