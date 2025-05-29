export interface Tareo {
    idTareo: string,            // Identificador unico del tareo
    fecha: string,              // Fecha del tareo
    nombreDia: string,          // Nombre del día: Lunes | Martes ...
    idUsuario: string,          // Identificador del usuario
    nombreUsuario: string,      // Nombre del usuario
    entradaHora: string,        // Hora de entrada en formato 24h
    entradaMinuto: string,      // Minuto de entrada
    salidaHora: string,         // Hora de salida en formato 24h
    salidaMinuto: string,       // Minuto de salida
    observaciones: string,      // Campo para las observaciones
}