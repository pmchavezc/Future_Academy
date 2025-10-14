const API_BASE_URL = 'http://localhost:8080/api';

/* =========================
   Tipos
========================= */
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

/** DTO real que devuelve el backend ahora */
export interface TareaDto {
    id: number; // <-- ID real de la tarea (no índice)
    curso: string;
    titulo: string;
    fechaEntrega: string;
    estado: 'PENDIENTE' | 'ENVIADO'; // estado por alumno (EntregaTarea)
    archivoSubido?: string | null;   // nombre de archivo si ya envió
}

/* =========================
   Clase API
========================= */
class ApiService {
    private getHeaders(includeAuth = false): HeadersInit {
        const headers: HeadersInit = { 'Content-Type': 'application/json' };

        if (includeAuth) {
            const user = JSON.parse(localStorage.getItem('fa.user') || '{}');
            if (user.email) headers['X-Alumno-Email'] = user.email;
        }
        return headers;
    }

    /** Para multipart/form-data (NO agregar Content-Type manualmente) */
    private getHeadersForFiles(includeAuth = false): HeadersInit {
        const headers: HeadersInit = {};
        if (includeAuth) {
            const user = JSON.parse(localStorage.getItem('fa.user') || '{}');
            if (user.email) headers['X-Alumno-Email'] = user.email;
        }
        return headers;
    }

    /** Manejo de respuestas sin usar @ts-expect-error */
    private async handleResponse<T>(response: Response): Promise<T> {
        const status = response.status;
        const contentType = response.headers.get('content-type') || '';

        if (!response.ok) {
            let body = '';
            try { body = await response.text(); } catch {}
            throw new Error(body ? `HTTP ${status}: ${body}` : `HTTP ${status}`);
        }

        if (contentType.includes('application/json')) {
            try {
                return (await response.json()) as T;
            } catch {
                throw new Error('Invalid JSON response');
            }
        }

        const text = await response.text();
        return text as unknown as T;
    }

    /* ===== Autenticación ===== */
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await fetch(`${API_BASE_URL}/autenticacion/login`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(credentials),
        });
        return this.handleResponse<LoginResponse>(response);
    }

    /* ===== Alumno ===== */
    async getAlumno(): Promise<Alumno> {
        const response = await fetch(`${API_BASE_URL}/alumnos/yo`, {
            method: 'GET',
            headers: this.getHeaders(true),
        });
        return this.handleResponse<Alumno>(response);
    }

    /* ===== Cursos ===== */
    async getCursos(): Promise<Curso[]> {
        const response = await fetch(`${API_BASE_URL}/cursos/mios`, {
            method: 'GET',
            headers: this.getHeaders(true),
        });
        return this.handleResponse<Curso[]>(response);
    }

    async getCursosDisponibles(): Promise<Curso[]> {
        const response = await fetch(`${API_BASE_URL}/inscripciones/disponibles`, {
            method: 'GET',
            headers: this.getHeaders(true),
        });
        return this.handleResponse<Curso[]>(response);
    }

    async inscribirseACurso(cursoId: number): Promise<{ message: string }> {
        const response = await fetch(`${API_BASE_URL}/inscripciones/inscribir/${cursoId}`, {
            method: 'POST',
            headers: this.getHeaders(true),
        });
        return this.handleResponse<{ message: string }>(response);
    }

    /* ===== Calificaciones ===== */
    async getCalificaciones(): Promise<Calificacion[]> {
        const response = await fetch(`${API_BASE_URL}/calificaciones/mias`, {
            method: 'GET',
            headers: this.getHeaders(true),
        });
        return this.handleResponse<Calificacion[]>(response);
    }

    /* ===== Tareas ===== */

    /** Devuelve las tareas SIEMPRE desde el servidor */
    async getTareas(): Promise<TareaDto[]> {
        const response = await fetch(`${API_BASE_URL}/tareas/mias`, {
            method: 'GET',
            headers: this.getHeaders(true),
        });
        return this.handleResponse<TareaDto[]>(response);
    }

    /** Nueva subida: POST /api/tareas/{id}/entregar (multipart) -> { nombreArchivo } */
    async entregarTarea(
        tareaId: number,
        archivo: File
    ): Promise<{ nombreArchivo: string }> {
        const fd = new FormData();
        fd.append('archivo', archivo);

        const response = await fetch(`${API_BASE_URL}/tareas/${tareaId}/entregar`, {
            method: 'POST',
            headers: this.getHeadersForFiles(true),
            body: fd,
        });
        return this.handleResponse<{ nombreArchivo: string }>(response);
    }

    /* (Opcional) Legacy: si en algún lado usabas esto, lo puedes mantener */
    async subirTarea(archivo: File, tareaId: number): Promise<{ message: string; nombreArchivo: string }> {
        const formData = new FormData();
        formData.append('archivo', archivo);
        formData.append('tareaId', tareaId.toString());

        const response = await fetch(`${API_BASE_URL}/archivos/subir-tarea`, {
            method: 'POST',
            headers: this.getHeadersForFiles(true),
            body: formData,
        });

        return this.handleResponse<{ message: string; nombreArchivo: string }>(response);
    }
}

export const api = new ApiService();
