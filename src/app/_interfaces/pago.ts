export interface Pago {
    idpago: string;
    nmonto: number;
    sdescripcion: string;
    sexpediente: string;
    sfecha: string;

    sfechacreacion: string;
    screador: string;
    sfechaedicion: string;
    seditor: string;
    
    // Solo para front-end
    sfechalocal: string;
}
