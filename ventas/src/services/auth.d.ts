// src/services/auth.d.ts

// Declaración para la función de login
export function login(username: string, password: string): Promise<{ token: string; rol: string; name: string }>;

// Declaración para la función de registro
export function register(name: string, email: string, password: string, roles?: string): Promise<{ /* Aquí puedes definir el tipo de respuesta esperado */ }>;
