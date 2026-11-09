type EspecialidadLegal =
    'LABORAL' |
    'CIVIL' |
    'FAMILIA' |
    'PENAL' |
    'CONSTITUCIONAL' |
    'NOTARIAL' |
    'ADMINISTRATIVO';
type TipoProceso =
    'LABORAL' |
    'CIVIL_ABREVIADO' | 'CIVIL_CONOCIMIENTO' | 'CIVIL_SUMARISIMO' |
    'FAMILIA' |
    'PENAL' |
    'CONSTITUCIONAL' |
    'NOTARIAL' |
    'ADMINISTRATIVO';

export interface Checkpoint {
    idCheckpoint: string;           // ID unico del checkpoint
    orden: number;                  // Orden en que aparece
    nombre: string;                 // Descripcion basica del checkpoint
    especialidad: EspecialidadLegal;// LABORAL | CIVIL | FAMILIA | PENAL | NOTARIAL
    proceso: TipoProceso;           // CIVIL_ABREVIADO | CIVIL_CONOCIMIENTO | ...
    thumbnail: string;              // Nombre del icono de imagen
    elegible: boolean;              // Si se puede o no seleccionar
    mostrar: boolean;               // Indicador si se muestra o no en la app
    pintar: boolean;                // Indicador para ver si pintar o no
}