export interface Audiencia {
    idaudiencia: string;
    sexpediente: string;
    sespecialidad: string;
    sdemandante: string;
    sdemandado: string;
    sfecha: string;
    shora: string;
    stipo: string;
    sencargados: string;
    surl: string;

    // Solo para vistas
    sfechauser: string;
    sprefijolink: string;
    ssufijolink: string;
    scuerpolink: string;
    nombreDia: string;      // Dia de la semana, ej: "Lunes", "Martes", ...
    nombreMes: string;      // Mes del año, ej: "Enero", "Febrero", ...
    numeroDia: string;      // Numero del dia del mes
    numeroAnio: number;     // Numero de año
}
