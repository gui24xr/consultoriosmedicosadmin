import prisma from "@/lib/prisma";
import { PrestationCreateDTO, PrestationUpdateDTO } from "@/types";

const prestationRelationsQuery = {
  specialty: true,
  provider: {
    include: {
      memberData: true
    }
  },
};
class PrestationsRepository {
  async createPrestation(data: PrestationCreateDTO) {
    return await prisma.$transaction(async (tx) => {
      const foundedSoftDeletedPrestation = await tx.prestation.findFirst({
        where: { identifier: data.identifier, deletedAt: { not: null } },
      });

      if (foundedSoftDeletedPrestation) {
        throw new Error("Existe una prestación eliminada con el mismo identificador, restaurela para poder operar con ella.");
      }

      const counter = await tx.entityCounter.upsert({
        where: { entity: 'prestation' },
        update: { current: { increment: 1 } },
        create: { entity: 'prestation', prefix: 'PRES', current: 1 }
      });

      const code = `${counter.prefix}-${counter.current.toString().padStart(4, '0')}`;

      return await tx.prestation.create({
        data: {
          ...data,
          code: code
        },
        include: prestationRelationsQuery,
      }); 
    });
  }

  async getPrestations() {
    return await prisma.prestation.findMany({
      where: { deletedAt: null }, 
      include: prestationRelationsQuery,
      orderBy: { createdAt: "desc" },
    });
  }

  async getPrestationById(id: string) {
    return await prisma.prestation.findFirstOrThrow({
      where: { id, deletedAt: null },
      include: prestationRelationsQuery,
    });
  }

  async updatePrestation(id: string, data: PrestationUpdateDTO) {
    return await prisma.prestation.update({
      where: { id },
      data: data,
      include: prestationRelationsQuery,
    });
  }

  async changePrestationInServiceStatus(id: string, inService: boolean) {
    return await prisma.prestation.update({
      where: { id },
      data: { inService },
      include: prestationRelationsQuery,
    });
  }

  async deletePrestation(id: string) {
    return await prisma.prestation.update({
      where: { id },
      data: { deletedAt: new Date() },
      include: prestationRelationsQuery,
    });
  }

  async hardDeletePrestation(id: string) {
    return await prisma.prestation.delete({
      where: { id },
      include: prestationRelationsQuery,
    });
  }

  async restorePrestation(id: string) {
    return await prisma.prestation.update({
      where: { id },
      data: { deletedAt: null },
      include: prestationRelationsQuery,
    });
  }
}


const prestationsRepository = new PrestationsRepository();


export type PrestationType = NonNullable<Awaited<ReturnType<typeof prestationsRepository.getPrestationById>>>;
export default prestationsRepository;