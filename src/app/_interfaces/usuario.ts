export interface Usuario {
    // Identificación
    uid: string;                // ID único de Firebase Auth

    // Datos personales
    nombre: string;             // Nombre completo
    departamento: string;       // Área/Departamento (para empresas)
    rol: 'admin' | 'usuario';   // Roles base

    // Autenticación
    email: string;              // Email (debe ser único)
    emailVerificado: boolean;   // Si verificó su email
    password: string;           // Solo para formularios de creación

    // Estado
    esTrabajador: boolean;      // Cuenta habilitada/deshabilitada
    fechaRegistro: Date;        // Fecha de registro
    fechaRetiro: Date | null;   // Fecha de desactivacion de cuenta
}
