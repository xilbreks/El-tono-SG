export interface Contrato {
    idcontrato: string;         // Identificador unico del contrato
    idExpediente: string;       // Identificador del expediente relacionado
    nmonto: number;             // Monto del contrato
    sdetalle: string;           // Detalle del contrato
    sfecha: string;             // Fecha tentativa de pago
    sexpediente: string;        // Numero del expediente al momento de registrar el pago
    sdemandante: string;        // Nombre del demandante
    sdemandado: string;         // Nombre del demandado
    sespecialidad: string;      // Area de especialidad
    smateria: string;           // Materia del expediente

    fechaUser: string;          // Formato de fecha dd/mm/yyyy solo de lectura
    nombreDia: string;          // Nombre del dia, ejemplo: Lunes, Martes
    nombreMes: string;          // Nombre del mes, ejemplo: Enero, Febrero
    numeroDia: string;          // Numero dle dia, ejemplo: 01, 02, 03
}
