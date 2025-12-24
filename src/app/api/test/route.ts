// app/api/test/route.ts
import prisma  from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { specialtiesRepository } from '@/repositories'

export async function GET() {
  try {
    // Prueba simple: contar usuarios
    const specialties = await specialtiesRepository.getSpecialties()
    
    return NextResponse.json({ 
      message: 'Conexión exitosa!', 
      data: specialties
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Error de conexión',
      details: error 
    }, { status: 500 })
  }
}