// Error para ser mostrado en pantalla o en logs
export interface DisplayError {
  message: string
  code?: string | number
  context?: string
}

// Wrapper de respuestas de servicios para normalizarlos
export type ServiceResponse<T> =
  | { data: T; error: null }
  | { data: null; error: DisplayError }

// Custom error para añadir contexto
export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public context?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}
