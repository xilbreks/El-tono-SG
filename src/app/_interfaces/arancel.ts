export interface Arancel {
    idArancel: string; // Identificador unico del gasto
    idExpediente: string;       // Identificador del expediente asociado
    concepto: number;           // Concepto del gasto complementario
    monto: number;              // Monto del gasto complementario

    numeroExpediente: string;   // Numero del expediente
    demandante: string;         // Nombre del demandante
    demandado: string;          // Nombre del demandado
    especialidad: string;       // Area de especialidad
    materia: string;            // Materia del expediente
}
