// app/api/test/route.ts
import prisma  from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Prueba simple: contar usuarios
    const userCount = await prisma.user.count()
    
    return NextResponse.json({ 
      message: 'Conexión exitosa!', 
      userCount 
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Error de conexión',
      details: error 
    }, { status: 500 })
  }
}