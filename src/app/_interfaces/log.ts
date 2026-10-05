export interface Log {
    idLog: string;              // Identificador unico del log
    idExpediente: string;       // ID del expediente

    modulo: string;             // Modulo correspondiente del log: ECONOMIA | ...
    coleccion: string;          // Ej: 'cuotas', 'abonos', 'aranceles'
    idDocumento: string;        // El ID del registro específico que sufrió el cambio

    nombreUsuario: string | null;      // Nombre del usuario que lo provoco

    tipoAccion: string;         // Tipo de accion: CREACION | ACTUALIZACION | ELIMINACION
    descripcion: string;        // Descripcio legible del cambio

    fechaCreacion: string;      // Fecha de creacion del log
}
