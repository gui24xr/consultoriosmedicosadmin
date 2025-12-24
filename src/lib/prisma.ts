import { PrismaClient } from '../generated/prisma'

// Helper para logging con timestamp
const log = (message: string, data?: unknown) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [PRISMA] ${message}`, data ? JSON.stringify(data, null, 2) : '')
}

const prismaClientSingleton = () => {
  log('🔄 Iniciando cliente Prisma...')
  log('Entorno:', {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL ? '✓ Configurada' : '✗ NO configurada'
  })

  const startTime = Date.now()

  const client = new PrismaClient({
    errorFormat: 'minimal',
    log: [
      { level: 'query', emit: 'event' },
      { level: 'error', emit: 'event' },
      { level: 'warn', emit: 'event' },
      { level: 'info', emit: 'event' },
    ],
  })

  // Log de queries (verás cada consulta SQL que se ejecuta)
  client.$on('query', (e) => {
    console.log(`[QUERY] ${e.query}`)
    console.log(`[PARAMS] ${e.params}`)
    console.log(`[DURATION] ${e.duration}ms`)
  })

  // Log de errores
  client.$on('error', (e) => {
    console.error('❌ [PRISMA ERROR]', e)
  })

  // Log de warnings
  client.$on('warn', (e) => {
    console.warn('⚠️ [PRISMA WARN]', e)
  })

  // Log de info
  client.$on('info', (e) => {
    console.info('ℹ️ [PRISMA INFO]', e)
  })

  // Intentar conectar y medir tiempo de conexión
  client.$connect()
    .then(() => {
      const duration = Date.now() - startTime
      log(`✅ Base de datos conectada exitosamente en ${duration}ms`)
    })
    .catch((error) => {
      const duration = Date.now() - startTime
      log(`❌ Error al conectar a la base de datos después de ${duration}ms`, {
        error: error.message,
        stack: error.stack
      })
    })

  return client
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
  log('🔧 Modo desarrollo: Cliente Prisma guardado en globalThis')
}
/*import { PrismaClient } from '../generated/prisma'

const prismaClientSingleton = () => {
  return new PrismaClient({
    errorFormat: 'minimal',
    log: process.env.NODE_ENV === 'development'
      ? ['error', 'warn']
      : ['error'],
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma


const log = (message: string, data?: unknown) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] [PRISMA] ${message}`, data ? JSON.stringify(data, null, 2) : '')
}*/