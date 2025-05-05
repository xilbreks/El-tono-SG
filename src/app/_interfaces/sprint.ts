export interface Sprint {
    // Identificacion
    idSprint: string;           // Identificador unico del sprint
    fechaCreacion: number;      // Fecha de creacion formato getTime()

    // Informacion
    nombre: string;             // Nombre del sprint
    apodo: string;              // Apodo del sprint
    fechaInicio: string;        // Inicio del sprint formato yyyy-mm-dd
    fechaFinal: string;         // Fin del sprint formato yyyy-mm-dd
    enCurso: boolean;           // Indicador de si el sprint esta en curso
}
