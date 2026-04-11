export interface Resolucion {
    idResolucion: string;               // Identificador unico de la resolucion
    numeroExpediente: string;           // Numero del expediente
    fechaNotificacion: string;          // Fecha de la notificacion de la resolucion
    cliente: string;                    // Nombre del Cliente o patrocinado
    titulo: string;                     // Titulo de la resolucion
    contenido: string;                  // Contenido de la resolucion
    tarea: string;                      // Tarea derivada de la resolucion
    plazo: string;                      // Plazo a cumplir su ubiera en la resolucion
    cumplimiento: boolean;              // Indicador de cumplimiento
    observaciones: string;              // Observaciones si hubiera
    nombreCreador: string;              // Nombre del usuario creador de la resolucion
    idEncargado: string;                // ID del encargado o asignado
    fechaCreacion: number;              // Fecha en formato timestamp de la creacion
    
    color: string;                      // Indicador de color, solo para visualizacion
}
