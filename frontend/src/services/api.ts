// src/services/api.ts
const API_BASE_URL = 'http://localhost:8080/api';

// Tipos
export interface LoginRequest {
    email: string;
    contrasena: string;
}

export interface LoginResponse {
    alumnoId: number;
    nombre: string;
    email: string;
    rol: string;
    token?: string;
}

export interface Alumno {
    id: number;
    nombre: string;
    email: string;
}

export interface Curso {
    id: number;
    codigo: string;
    nombre: string;
    horario: string;
    docente: string;
}

export interface Calificacion {
    curso: string;
    parcial: number;
    nota: number;
}

export interface Tarea {
    curso: string;
    titulo: string;
    fechaEntrega: string;
    estado: string;
}

// Clase para manejar las llamadas API
class ApiService {
    private getHeaders(includeAuth = false): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        if (includeAuth) {
            const user = JSON.parse(localStorage.getItem('fa.user') || '{}');
            if (user.email) {
                headers['X-Alumno-Email'] = user.email;
            }
        }

        return headers;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }
        return response.json();
    }

    // Autenticación
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await fetch(`${API_BASE_URL}/autenticacion/login`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(credentials),
        });

        return this.handleResponse<LoginResponse>(response);
    }

    // Obtener información del alumno
    async getAlumno(): Promise<Alumno> {
        try {
            const response = await fetch(`${API_BASE_URL}/alumnos/yo`, {
                method: 'GET',
                headers: this.getHeaders(true),
            });

            return this.handleResponse<Alumno>(response);
        } catch (error) {
            console.error('Error getting alumno:', error);
            throw error;
        }
    }

    // Obtener cursos del alumno
    async getCursos(): Promise<Curso[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/cursos/mios`, {
                method: 'GET',
                headers: this.getHeaders(true),
            });

            return this.handleResponse<Curso[]>(response);
        } catch (error) {
            console.error('Error getting cursos:', error);
            throw error;
        }
    }

    // Obtener calificaciones del alumno
    async getCalificaciones(): Promise<Calificacion[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/calificaciones/mias`, {
                method: 'GET',
                headers: this.getHeaders(true),
            });

            return this.handleResponse<Calificacion[]>(response);
        } catch (error) {
            console.error('Error getting calificaciones:', error);
            throw error;
        }
    }

    // Obtener tareas del alumno
    async getTareas(): Promise<Tarea[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/tareas/mias`, {
                method: 'GET',
                headers: this.getHeaders(true),
            });

            return this.handleResponse<Tarea[]>(response);
        } catch (error) {
            console.error('Error getting tareas:', error);
            throw error;
        }
    }
}

export const api = new ApiService();