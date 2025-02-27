export interface Pago {
    idpago: string;
    lactive: boolean;
    idExpediente: string;
    sexpediente: string;
    nmonto: number;
    sfecha: string;
    sdescripcion: string;
    sdemandante: string;
    sdemandado: string;
    sespecialidad: string;

    nfechacreacion: number;
    screador: string;
    nfechaedicion: number;
    seditor: string;
    
    // Solo para front-end
    sfechalocal: string;
    sfechacreacion: string;
    sfechaedicion: string;
}
