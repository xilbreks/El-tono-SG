export interface Tarea {
    idTarea: string,                // Identificador unico de la tarea
    idTareo: string,                // Referencia del Tareo al que pertenece
    idUsuario: string,              // ID del usuario al que corresponde la tarea
    nombreUsuario: string,          // Nombre del usuario al que corresponde la tarea
    idNaturaleza: string,           // Naturaleza de la tarea, puede ser: 'con' | 'sin' | 'nc'
    idExpediente: string,           // ID del expediente
    numero: string,                 // Numero del expediente
    demandante: string,             // Nombre del demandante
    demandado: string,              // Nombre del demandado
    especialidad: string,           // Area de especialidad del expediente
    tieneContrato: string,          // Indicador si tiene o no contrato
    codigoTarea: string,            // Codigo de la tarea
    detalleTarea: string,           // Detalle minucioso de tarea realizada
    pendienteTarea: string,         // Pendientes encontrados a realizar respecto al expediente
    fechaTarea: string,             // Fecha a la que corresponde la realizacion de la tarea
    idCheckpoint: string,           // ID del checkpoint
    nombreCheckpoint: string,       // Nombre del checkpoint
    tipoAtencion: string,           // Tipo de atencion de la tarea
    delegadoPor: string,            // Supervisor quien asigno la tarea
    horasAtencion: string,          // Numero de horas demandadas por la tarea
    minutosAtencion: string,        // Numero de minutos demandados por la tarea
    montoPactado: string,           // Monto pactado del expediente
    abonoTotal: string,             // Abono total sobre el expediente
    montoUltimoAbono: string,       // Monto del ultimo abono
    fechaUltimoAbono: string,       // Fecha del ultimo abono
    fechaCreacion: string,          // Fecha de creacion de la tarea en timestamp
}
