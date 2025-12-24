import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  const startTime = Date.now()
  
  try {
    await prisma.$queryRaw`SELECT 1`
    const duration = Date.now() - startTime
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      latency: `${duration}ms`,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    const duration = Date.now() - startTime
    
    return NextResponse.json({
      status: 'error',
      database: 'disconnected',
      latency: `${duration}ms`,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
