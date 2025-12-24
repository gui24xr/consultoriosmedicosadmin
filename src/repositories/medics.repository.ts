import prisma from "@/lib/prisma"
import { MedicCreateDTO, MedicUpdateDTO } from "@/types"


const medicsInclude = {
    person: {
        include: {
            addressData: true,
            user: true
        }
    },
    specialties: true,
    consultationService: true
}

const medicsRepository = {
    createMedicAndProfile: async (data: MedicCreateDTO) => {
        try {
            const medic = await prisma.medic.create({
                data: {
                    record: data.record,
                    specialties: {
                        connect: data.specialtyIds.map(id => ({ id }))
                    },
                    person: {
                        connectOrCreate: {
                            where: {
                                dni: data.dni
                            },
                            create: {
                                dni: data.dni,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                //addressData: {
                                //    create: {}
                                //}
                            }
                        }
                    }
                },
                include: medicsInclude
            })
            return medic
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    getMedics: async () => {
        try {
            const medics = await prisma.medic.findMany({
                include: {
                person: {
                    
                },
                specialties: true,
                consultationService: true
        },
                orderBy: { createdAt: 'desc' }
            })
            return medics
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    getMedic: async (id: string) => {
        try {
            const medic = await prisma.medic.findUnique({
                where: { id },
                include: {
    person: {
        include: {
            addressData: true,
            user: true
        }
    },
    specialties: true,
    consultationService: true
}
            })
            return medic
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    updateMedic: async (id: string, data: MedicUpdateDTO) => {       
        try {
            console.log('data en updateMedic en query', data)
            const medic = await prisma.medic.update({
                where: { id },
                data: {
                    record: data.record,
                    specialties: {
                        connect: data.specialtyIds.map(id => ({ id }))
                    },
                    person: {
                        update: {
                            dni: data.dni,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            phone: data.phone,
                            whatsAppNumber: data.whatsAppNumber,
                        }
                    }
                },
                include: medicsInclude
            })
            return medic
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    deleteMedic: async (id: string) => {
        try {
            const medic = await prisma.medic.delete({
                where: { id },
                include: medicsInclude
            })
            return medic
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}


export default medicsRepository