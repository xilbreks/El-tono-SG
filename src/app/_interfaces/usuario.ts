export interface Usuario {
    // Identificación
    uid: string;                // ID único de Firebase Auth

    // Datos personales
    nombre: string;             // Nombre completo
    nick: string;               // Alias (debe ser único)
    departamento: 'admin' |
    'laboral' | 'familia' |
    'civil' | 'penal' |
    'administracion';           // Área/Departamento (para empresas)
    rol: 'admin' | 'lider'
    | 'asistente'
    | 'recepcionista';          // Roles base

    // Autenticación
    email: string;              // Email (debe ser único)
    emailVerificado: boolean;   // Si verificó su email
    password: string;           // Solo para formularios de creación

    // Estado
    esActivo: boolean;            // Cuenta habilitada/deshabilitada
    fechaRegistro: Date;        // Fecha de registro
    fechaRetiro: number | null; // Fecha de desactivacion de cuenta en formato Timestamp
}
