import prisma from "@/lib/prisma"
import { SpecialtyCreateInternalDTO, SpecialtyUpdateDTO} from "@/types"



const includeSpecialties = {
    medics: {
        include: {
            person: true
        }
    },
    consultationServices: true,

} as const


const specialtiesRepository = {
    createSpecialty: async (data: SpecialtyCreateInternalDTO) => {
        try {
            console.log('data createSpecialty en query', data)
            const specialty = await prisma.specialty.create({
                data: {
                    code: data.code,
                    name: data.name
                },
                include: includeSpecialties,
            })
            return specialty
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    getSpecialties: async () => {
        try {
            const specialties = await prisma.specialty.findMany({
                include: includeSpecialties,
                orderBy: { createdAt: 'desc' }
            })
            return specialties
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    getSpecialty: async (id: string) => {

        try {
            const specialty = await prisma.specialty.findUnique({
                where: { id },
                
                include: includeSpecialties,
               
            })
            
            return specialty
        } catch (error) {
            console.error(error)
            throw error
        }
    },


    updateSpecialty: async (id: string, data: SpecialtyUpdateDTO) => {
        try {
            const specialty = await prisma.specialty.update({
                where: { id },
                data: { name: data.name, code: data.code },
                include: includeSpecialties
            })
            return specialty
        } catch (error) {
            console.error(error)
            throw error
        }
    },

    deleteSpecialty: async (id: string) => {
        try {
            const specialty = await prisma.specialty.delete({
                where: { id },
                include: includeSpecialties
            })
            return specialty
        } catch (error) {
            console.error(error)
            throw error
        }
    },

}


// Inferir el tipo del retorno de una función del repository
type SpecialtyRepositoryReturn = Awaited<ReturnType<typeof specialtiesRepository.getSpecialty>>

export type SpecialtyWithRelations = NonNullable<SpecialtyRepositoryReturn>

export default specialtiesRepository