export interface Tareo {
    idTareo: string,            // Identificador unico del tareo
    fecha: string,              // Fecha del tareo
    nombreDia: string,          // Nombre del día: Lunes | Martes ...
    idUsuario: string,          // Identificador del usuario
    nombreUsuario: string,      // Nombre del usuario
    horaIngreso: string,        // Hora de entrada en formato 24h
    horaSalida: string,         // Minuto de entrada
    minutoIngreso: string,      // Hora de salida en formato 24h
    minutoSalida: string,       // Minuto de salida
    observaciones: string,      // Campo para las observaciones
}