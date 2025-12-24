import { Prisma } from "@/generated/prisma"


export class DatabaseError extends Error {
    constructor(name: string) {
        super(name)
        this.name = name
    }
}

const DATABASE_ERROR_CODES = {
    // Errores de validación
    'P2000': 'INVALID_DATA_LENGTH',           // El valor proporcionado es demasiado largo para el tipo de columna
    'P2011': 'MISSING_REQUIRED_FIELD',        // Falta un campo requerido
    'P2006': 'INVALID_FIELD_TYPE',            // El tipo de dato proporcionado es inválido
    'P2007': 'INVALID_FIELD_VALUE',           // El valor proporcionado es inválido

    // Errores de restricciones
    'P2002': 'DUPLICATE_ENTRY',               // Violación de restricción única
    'P2003': 'INVALID_RELATION',              // Violación de clave foránea
    'P2025': 'RECORD_NOT_FOUND',              // Registro no encontrado
    'P2018': 'RELATION_NOT_FOUND',            // Relación no encontrada

    // Errores de operaciones
    'P2004': 'OPERATION_FAILED',              // Operación fallida
    'P2017': 'BATCH_OPERATION_FAILED',        // Operación en lote fallida
    'P2016': 'QUERY_INTERPRETATION_ERROR',    // Error en la interpretación de la consulta

    // Errores de consulta
    'P2019': 'QUERY_EXECUTION_ERROR',         // Error al ejecutar la consulta
    'P2020': 'QUERY_TIMEOUT',                 // Timeout de la consulta
    'P2021': 'QUERY_INTERRUPTED',             // Consulta interrumpida
    'P2022': 'QUERY_CANCELLED',               // Consulta cancelada
} as const;


const getErrorName = (code: string) => {
    return DATABASE_ERROR_CODES[code as keyof typeof DATABASE_ERROR_CODES]
}



// Tipo para los códigos de error
export type DatabaseErrorCode = keyof typeof DATABASE_ERROR_CODES;



const databaseServiceErrorHandler = (error: any) =>{
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                return new DatabaseError(getErrorName(error.code))
            case 'P2003':
                return new DatabaseError(getErrorName(error.code))
            case 'P2025':
                return new DatabaseError(getErrorName(error.code))
            default:
                return new DatabaseError(getErrorName(error.code))
        }
    }
    
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        return new DatabaseError('DATABASE_CLIENT_ERROR')
    }

    return new DatabaseError('DATABASE_UNKNOWN_ERROR')
}



export default databaseServiceErrorHandler