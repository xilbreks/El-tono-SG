export interface Expediente {
    idExpediente: string;           // Identificador único del expediente
    clase: string;                  // Clase de documento: "PROVISIONAL", "PRINCIPAL", "CUADERNO", "CF", "CURADURIA"
    titulo: string;                 // Título del expediente
    numero: string;                 // Número alfanumérico del expediente
    especialidad: string;           // Área de especialidad: "LABORAL", "FAMILIA", "CIVIL", "PENAL", "CONSTITUCIONAL", "ADMINISTRATIVO", "NOTARIAL"    
    idCheckpoint: string;           // ID del checkpoint actual
    nombreCheckpoint: string;       // Nombre del checkpoint actual
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
    salaCasacion: string | null;    // Sala de la casación si aplica
    numeroPrincipal: string | null; // Número del expediente principal, se usa en caso de cuadernos
    numeroProvisional: string | null; // Número del expediente si es provisional

    nombreCliente: string;          // Nombre completo del cliente
    dni: string;                    // Documento DNI del cliente
    celular: string;                // Numero de celular del cliente
    detalleContrato: string;        // Detalle de los acuerdos del contrato de honorarios
}
