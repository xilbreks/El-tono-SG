export interface Changelog {
    idChangelog: string;
    idExpediente: string;
    idCheckpoint: string;

    nombreCheckpoint: string;
    
    fechaInicio: string;
    fechaFin: string | null;
    duracion: string | null;
    actualizadoPor: string;
    fechaCreacion: string;
}
