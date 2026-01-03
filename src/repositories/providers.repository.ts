import prisma from "@/lib/prisma"
import { ProviderCreateDTO, ProviderUpdateEntityDTO } from "@/types"

const providerRelationsQuery = {
    specialties: true,
    prestations: {
        include: {
            specialty: true
        }
    }
} 

const providersRepository = {
    createProvider: async (data: ProviderCreateDTO) => {
            return await prisma.$transaction(async (tx)=>{
                const existing = await tx.provider.findFirst({
                    where: {dni: data.dni}
                })

                if (existing && existing.deletedAt !== null) {
                    return await tx.provider.update({
                        where: { id: existing.id },
                        data: { ...data, deletedAt: null },
                        include: providerRelationsQuery
                    });
                }

                const counter = await tx.entityCounter.upsert({
                    where: { entity: 'provider' },
                    update: { current: { increment: 1 } },
                    create: { entity: 'provider', prefix: 'PROV', current: 1 }
                });

                const code = `${counter.prefix}-${counter.current.toString().padStart(4, '0')}`;

                return await tx.provider.create({
                    data: {
                        ...data,
                        code: code
                    },
                    include: providerRelationsQuery
                });
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
                include: providerRelationsQuery
            })
    },

    updateProvider: async (id: string, data: ProviderUpdateEntityDTO) => {       
        return await prisma.provider.update({
                where: { id },
                data:data,
                include: providerRelationsQuery
            })
    },

    deleteProvider: async (id: string) => {
       return await prisma.provider.update({
                where: { id },
                include: providerRelationsQuery,
                data: { deletedAt: new Date() }
            })
    },

    hardDeleteProvider: async (id: string) => {
       return await prisma.provider.delete({
                where: { id },
                include: providerRelationsQuery
            })
    },

    async restoreProvider(id: string) {
        return prisma.provider.update({
        where: { id },
        include: providerRelationsQuery,
        data: { deletedAt: null },
        });
    },
};


export type ProviderType = NonNullable<Awaited<ReturnType<typeof providersRepository.getProviders>>>[0]
export type ProviderDetailType = NonNullable<Awaited<ReturnType<typeof providersRepository.getProviderDetails>>>

export default providersRepository