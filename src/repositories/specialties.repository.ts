import prisma from "@/lib/prisma"
import { SpecialtyUpdateDTO, SpecialtyCreateDTO } from "@/types"


const specialtyRelationsQuery = {
    providers: {
      include: {
        memberData: true
      }
    },
    prestations: {
        include: {
            provider: {
                include: {
                    memberData: true
                }
            }
        }
    },
} as const

class SpecialtiesRepository {
    async createSpecialty(data: SpecialtyCreateDTO) {
        return await prisma.$transaction(async (tx) => {

          const foundedSofDeletedSpecialty = await tx.specialty.findFirst({
              where: { identifier : data.identifier, deletedAt: {not: null} },
          });

          if (foundedSofDeletedSpecialty) throw new Error("Existe una especialidad eliminada con el mismo identificador, restaurela para poder operar con ella.");


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
    }

    async getSpecialties() {
        return await prisma.specialty.findMany({
            where: { deletedAt: null },
            include: specialtyRelationsQuery,
            orderBy: { createdAt: 'desc' }
        });
    }

    async getSpecialty(id: string) {
        return await prisma.specialty.findFirstOrThrow({
            where: { id, deletedAt: null },           
            include: specialtyRelationsQuery,          
        });
    }

    async updateSpecialty(id: string, data: SpecialtyUpdateDTO) {
        return await prisma.specialty.update({
            where: { id },
            data: data,
            include: specialtyRelationsQuery
        });
    }

    async deleteSpecialty(id: string) {
        return await prisma.specialty.update({
            where: { id },
            data: { deletedAt: new Date() },
            include: specialtyRelationsQuery
        });
    }

    async hardDeleteSpecialty(id: string) {
        return await prisma.specialty.delete({
            where: { id },
            include: specialtyRelationsQuery
        });
    }

    async restoreSpecialty(id: string) {
        return await prisma.specialty.update({
            where: { id },
            data: { deletedAt: null },
            include: specialtyRelationsQuery
        });
    }
}


const specialtiesRepository = new SpecialtiesRepository();

type SpecialtyRepositoryReturn = Awaited<ReturnType<typeof specialtiesRepository.getSpecialty>>
export type SpecialtyType = NonNullable<SpecialtyRepositoryReturn>

export default specialtiesRepository;