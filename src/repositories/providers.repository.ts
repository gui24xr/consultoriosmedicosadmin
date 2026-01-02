import prisma from "@/lib/prisma"
import { ProviderCreateInternalDTO, ProviderUpdateDTO } from "@/types"

const providerRelations = {
    specialties: true,
    prestations: {
        include: {
            specialty: true
        }
    }
} 

const providersRepository = {
    createProvider: async (data: ProviderCreateInternalDTO) => {
            return await prisma.provider.create({
                data: {
                    code: data.code,
                    record: data.record,
                    dni: data.dni,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    whatsAppNumber: data.whatsAppNumber,
                    specialties: {
                        connect: data.specialtyIds.map(id => ({ id }))
                    },
                },
                include: providerRelations
            })
    },

    getProviders: async () => {
      return await prisma.provider.findMany({
                where: { deletedAt: null },
                select: {
                    id: true,
                    code: true,
                    inService: true,
                    record: true,
                    firstName: true,
                    lastName: true,
                    specialties: {
                        select: {
                            id: true,
                            name: true
                        },
                    },
                    prestations: {
                        select: {
                            id: true,
                            code: true,
                            label: true,
                            specialty: {
                                select: {
                                    name: true
                                }
                            }
                        },
                    }
                },
                orderBy: { createdAt: 'desc' }  
            })
    },

    getProviderDetails: async (id: string) => {
       return await prisma.provider.findFirstOrThrow({
                where: { id, deletedAt: null },
                include: providerRelations
            })
    },

    updateProvider: async (id: string, data: ProviderUpdateDTO) => {       
        return await prisma.provider.update({
                where: { id },
                data:data,
                include: providerRelations
            })
    },

    updateProviderInServiceStatus: async (id: string, inService: boolean) => {       
        return await prisma.provider.update({
                where: { id },
                data: {
                    inService: inService
                },
                include: providerRelations
            })
    },

    deleteProvider: async (id: string) => {
       return await prisma.provider.update({
                where: { id },
                include: providerRelations,
                data: { deletedAt: new Date() }
            })
    },

    hardDeleteProvider: async (id: string) => {
       return await prisma.provider.delete({
                where: { id },
                include: providerRelations
            })
    },

    async restoreProvider(id: string) {
        return prisma.provider.update({
        where: { id },
        include: providerRelations,
        data: { deletedAt: null },
        });
    },
};


export type ProviderType = NonNullable<Awaited<ReturnType<typeof providersRepository.getProviders>>>[0]
export type ProviderDetailType = NonNullable<Awaited<ReturnType<typeof providersRepository.getProviderDetails>>>

export default providersRepository