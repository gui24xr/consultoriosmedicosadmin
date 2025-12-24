import prisma from "@/lib/prisma"
import { ConsultationServiceInputDTO } from "@/types"

const includeConsultationService = {
    specialty: true,
    medic: {
        include: {
            person: true
        }
    }
}

const consultationServicesRepository = {
    createConsultationService: async (data: ConsultationServiceInputDTO) => {
        try{
            const consultationService = await prisma.consultationService.create({
                data:{
                    name: data.name,
                    description: data.description,
                    specialty: {
                        connect: {
                            id: data.specialtyId
                        }
                    },
                    medic: {
                        connect: data.medicId ? {
                            id: data.medicId
                        } : undefined
                    }
                },
                include: includeConsultationService
            })
            return consultationService
        }catch(error){
            console.error(error)
            throw error
        }
    },

    getConsultationServices: async () => {
        try{
            const consultationServices = await prisma.consultationService.findMany({
                include: includeConsultationService,
                orderBy: { createdAt: 'desc' }
            })
            return consultationServices
        }catch(error){
            console.error(error)
            throw error
        }
    },

    getConsultationService: async (id: string) => {
        try{
            const consultationService = await prisma.consultationService.findUnique({
                where: { id },
                include: includeConsultationService
            })
            return consultationService
        }catch(error){
            console.error(error)
            throw error
        }
    },

    updateConsultationService: async (id: string, data: ConsultationServiceInputDTO) => {
        try{
            const consultationService = await prisma.consultationService.update({
                where: { id },
                data: {
                    name: data.name,
                    description: data.description,
                    specialty: {
                        connect: {
                            id: data.specialtyId
                        }
                    },
                    medic: {
                        connect: data.medicId ? {
                            id: data.medicId
                        } : undefined
                    }
                },
                include: includeConsultationService
            })
            return consultationService
        }catch(error){
            console.error(error)
            throw error
        }
    }

}

export default consultationServicesRepository