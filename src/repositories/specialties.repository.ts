import prisma from "@/lib/prisma"
import { SpecialtyUpdateDTO, SpecialtyCreateDTO } from "@/types"


const specialtyRelationsQuery = {
    providers: true,
    prestations: {
        include: {
            provider: true
        }
    },
} as const


const specialtiesRepository = {
   async createSpecialty(data: SpecialtyCreateDTO) {
  return await prisma.$transaction(async (tx) => {
    // 1. Intentar buscar si existe (para el caso de restauración)
    const existing = await tx.specialty.findFirst({
      where: { name: data.name },
    });

    // CASO 1: Restauración (Soft Delete)
    if (existing && existing.deletedAt !== null) {
      return await tx.specialty.update({
        where: { id: existing.id },
        data: { ...data, deletedAt: null },
        include: specialtyRelationsQuery
      });
    }

    // CASO 2: La especialidad no existe (o eso creemos)
    // Primero "reservamos" el número del contador
    const counter = await tx.entityCounter.upsert({
      where: { entity: 'specialty' },
      update: { current: { increment: 1 } },
      create: { entity: 'specialty', prefix: 'SPEC', current: 1 }
    });

    const code = `${counter.prefix}-${counter.current.toString().padStart(4, '0')}`;

    return await tx.specialty.create({
      data: {
        ...data,
        code
      },
      include: specialtyRelationsQuery
    });
  });
},

    getSpecialties: async () => {
        return await prisma.specialty.findMany({
                where: { deletedAt: null },
                include: specialtyRelationsQuery,
                orderBy: { createdAt: 'desc' }
            })
    },

    getSpecialty: async (id: string) => {
        return await prisma.specialty.findFirstOrThrow({
                where: { id, deletedAt: null },           
                include: specialtyRelationsQuery,          
            })
            
    },


    updateSpecialty: async (id: string, data: SpecialtyUpdateDTO) => {
      return await prisma.specialty.update({
                where: { id },
                data: data,
                include: specialtyRelationsQuery
            })
    },

    deleteSpecialty: async (id: string) => {
      return await prisma.specialty.update({
                where: { id },
                data: { deletedAt: new Date() },
                include: specialtyRelationsQuery
            })
    },


    hardDeleteSpecialty: async (id: string) => {
        return await prisma.specialty.delete({
                where: { id },
                include: specialtyRelationsQuery
            })
           
    },

    restoreSpecialty: async (id: string) => {
      return await prisma.specialty.update({
                where: { id },
                data: { deletedAt: null },
                include: specialtyRelationsQuery
            })
    },

}


type SpecialtyRepositoryReturn = Awaited<ReturnType<typeof specialtiesRepository.getSpecialty>>

export type SpecialtyType = NonNullable<SpecialtyRepositoryReturn>

export default specialtiesRepository