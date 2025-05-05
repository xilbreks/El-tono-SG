export interface Ticket {
    // Identificacion
    idTicket: string;           // Identificador unico del ticket
    idSprint: string;           // ID del sprint al que pertenece
    fechaCreacion: number;      // Fecha de creacion en GetTime
    fechaInicio: string;        // Inicio del sprint yyyy-mm-dd
    fechaFinal: string;         // Final del sprint yyyy-mm-dd

    // Informacion básica
    titulo: string;             // Titulo del ticket
    descripcion: string;        // Tarea a arealizar
    tiempoEstimado: number;     // Tiempo estimado en horas
    asignadoA: string;          // ID del responsable
    avance: number;             // Porcentaje de avance 0 al 100
    anotaciones: string;        // Para colocar algun comentario al respecto

    // Expediente relacionado
    expediente: string;         // Numero del expediente relacionado
    demandante: string;         // Parte demandante
    demandado: string;          // Parte demandada
    materia: string;            // Materia del proceso
    especialidad: string;       // LABORAL | FAMILIA | CIVIL | PENAL | CONSTITUCIONAL | NOTARIAL
}
