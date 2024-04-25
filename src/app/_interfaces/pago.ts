export interface Pago {
    idpago: string;
    lactive: boolean;
    sexpediente: string;
    nmonto: number;
    sfecha: string;
    sdescripcion: string;

    nfechacreacion: number;
    screador: string;
    nfechaedicion: number;
    seditor: string;
    
    // Solo para front-end
    sfechalocal: string;
    sfechacreacion: string;
    sfechaedicion: string;
}
