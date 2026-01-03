import prisma from "@/lib/prisma";
import { PrestationCreateDTO, PrestationUpdateEntityDTO } from "@/types";

const prestationRelationsQuery = {
  specialty: true,
  provider: true,
};

const prestationsRepository = {
  createPrestation: async (data: PrestationCreateDTO) => {
    return await prisma.$transaction(async (tx) => {
      
      const existing = await tx.prestation.findFirst({
        where: { label: data.label },
      });

      if (existing && existing.deletedAt !== null) {
        return await tx.prestation.update({
          where: { id: existing.id },
          data: { ...data, deletedAt: null },
          include: prestationRelationsQuery,
        });
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
      })
  },

  getPrestations: async () => {
    return await prisma.prestation.findMany({
      where: { deletedAt: null }, 
      include: prestationRelationsQuery,
      orderBy: { createdAt: "desc" },
    });
    
  },

  getPrestationById: async (id: string) => {
    return await prisma.prestation.findFirstOrThrow({
      where: { id, deletedAt: null },
      include: prestationRelationsQuery,
    })
  },

  updatePrestation: async (id: string, data: PrestationUpdateEntityDTO) => {
    return await prisma.prestation.update({
      where: { id },
      data: data,
      include: prestationRelationsQuery,
    });
  },


    async deletePrestation(id: string) {
        return prisma.prestation.update({
        where: { id },
        include: prestationRelationsQuery,
        data: { deletedAt: new Date() },
        });
  },

  async hardDeletePrestation(id: string) {
    return await prisma.prestation.delete({
      where: { id },
      include: prestationRelationsQuery,
    });
  },

  async restorePrestation(id: string) {
    return prisma.prestation.update({
      where: { id },
      include: prestationRelationsQuery,
      data: { deletedAt: null },
    });
  },
};

export type PrestationType = NonNullable<Awaited<ReturnType<typeof prestationsRepository.getPrestationById>>>;
export default prestationsRepository;
