

const log = (message: string) => console.log('//----EEROR HANDLER -------\n', message)

/**
 * Convierte errores de Prisma en mensajes user-friendly
 */
export function errorHandler(error: unknown): string {
  let errorMessage: string | null = null

  // 1. Errores conocidos de Prisma con códigos específicos
  const isPrismaError = error && typeof error === 'object' && 'code' in error;

  if (isPrismaError) {
    const prismaError = error as { code: string; meta?: any; message: string };
    
    switch (prismaError.code) {
      case 'P2002': {
        const target = prismaError.meta?.target as string[] | undefined
        const field = target ? target[0] : 'este campo'
        errorMessage = `Error: Ya existe un registro con el mismo ${field}`
        break
      }
      case 'P2025':
        errorMessage = 'Error: Registro no encontrado'
        break
      case 'P2003':
        errorMessage = 'Error: La referencia a otro registro no existe (violación de clave foránea)'
        break
      case 'P2014':
        errorMessage = 'Error: No se puede eliminar porque tiene registros relacionados'
        break
      // ... (mantén el resto de tus cases igual)
      default:
        errorMessage = `Error de base de datos (${prismaError.code}): ${prismaError.message}`
        break
    }
  }

  // 2. Check de validación (por mensaje si el instanceof falla)
  if (!errorMessage && error instanceof Error) {
    if (error.name === 'PrismaClientValidationError' || error.message.includes('PrismaClientValidationError')) {
      errorMessage = 'Error de validación: Los datos enviados no son válidos'
    }
  }

  // Si tenemos un mensaje, lo devolvemos
  if (errorMessage) {
    log(errorMessage)
    return errorMessage
  }

  // Si no es un error de Prisma conocido, lo lanzamos para que lo capture el Error Boundary
  if (errorMessage) {
    log(errorMessage)
    return errorMessage
  }

  log('//---- ERROR DESCONOCIDOOOOOOOOOOOOO -------\n')
  throw error
}