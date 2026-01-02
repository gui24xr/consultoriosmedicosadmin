import prisma from "@/lib/prisma";
import { PrestationCreateInternalDTO, PrestationUpdateDTO } from "@/types";

const prestationRelations = {
  specialty: true,
  provider: true,
};

const prestationsRepository = {
  createPrestation: async (data: PrestationCreateInternalDTO) => {
    return await prisma.prestation.create({
      data: {
        inService: true,
        code: data.code,
        label: data.label,
        description: data.description,
        specialty: {
          connect: {
            id: data.specialtyId,
          },
        },
        provider: {
          connect: {
            id: data.providerId,
          },
        },
      },
      include: prestationRelations,
    });
  },

  getPrestations: async () => {
    return await prisma.prestation.findMany({
      where: { deletedAt: null }, 
      include: prestationRelations,
      orderBy: { createdAt: "desc" },
    });
    
  },

  getPrestationById: async (id: string) => {
    return await prisma.prestation.findFirstOrThrow({
      where: { id, deletedAt: null },
      include: prestationRelations,
    })
  },

  updatePrestation: async (id: string, data: PrestationUpdateDTO) => {
    return await prisma.prestation.update({
      where: { id },
      data: data,
      include: prestationRelations,
    });
  },

  updatePrestationInServiceStatus: async (id: string, inService: boolean) => {
    return await prisma.prestation.update({
      where: { id },
      data: {
        inService: inService,
      },
      include: prestationRelations,
    });
  },

    async deletePrestation(id: string) {
        return prisma.prestation.update({
        where: { id },
        include: prestationRelations,
        data: { deletedAt: new Date() },
        });
  },

  async hardDeletePrestation(id: string) {
    return await prisma.prestation.delete({
      where: { id },
      include: prestationRelations,
    });
  },

  async restorePrestation(id: string) {
    return prisma.prestation.update({
      where: { id },
      include: prestationRelations,
      data: { deletedAt: null },
    });
  },
};

export type PrestationType = NonNullable<Awaited<ReturnType<typeof prestationsRepository.getPrestationById>>>;
export default prestationsRepository;
