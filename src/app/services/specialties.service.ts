import { SpecialtyCreateDTO, SpecialtyDTO, SpecialtyUpdateDTO } from "@/types"
import { specialtiesRepository } from "@/repositories"
import { unstable_cache } from "next/cache"
import {SpecialtyWithRelations} from "@/repositories/specialties.repository"


class SpecialtiesService {
    private normalizeSpecialtyName(name: string): string {
        return name.toLowerCase().trim()
    }

    private getNewSpecialtyCode(): string {
        return 'SPEC' + Date.now().toString()
    }

    private getSpecialtyDTO(specialty: SpecialtyWithRelations): SpecialtyDTO {
         return {
            id: specialty.id,
            name: specialty.name,
            code: specialty.code,
            updatedAt: specialty.updatedAt,
            consultationServices: specialty.consultationServices.map(consultationService => ({
                id: consultationService.id,
                name: consultationService.name
            })) || [],
            medics: specialty.medics.map(medic => ({
                id: medic.id,
                completeName: medic.person.firstName + ' ' + medic.person.lastName
            })) || [],
        }
    }

    async createSpecialty(data: SpecialtyCreateDTO): Promise<SpecialtyDTO> {
       const newSpecialtyData = {
           name: this.normalizeSpecialtyName(data.name),
           code: this.getNewSpecialtyCode()
       }
        const specialty = await specialtiesRepository.createSpecialty(newSpecialtyData) 
        return this.getSpecialtyDTO(specialty)
    }

    async getSpecialties(): Promise<SpecialtyDTO[]> {
        const cachedSpecialties = unstable_cache(
            async () => {
                const specialties = await specialtiesRepository.getSpecialties()
                return specialties.map(specialty => this.getSpecialtyDTO(specialty)) // ✅ this funciona
            },
            ['specialties'],
            { tags: ['specialties'], revalidate: 3600 }
        )
        
        return await cachedSpecialties()
    }

    async updateSpecialty(id: string, data: SpecialtyCreateDTO): Promise<SpecialtyDTO> {
               const updateSpecialtyData = {
           name: this.normalizeSpecialtyName(data.name),
           code: this.getNewSpecialtyCode()
       }
        const updatedSpecialty = await specialtiesRepository.updateSpecialty(id, updateSpecialtyData)
        return this.getSpecialtyDTO(updatedSpecialty)
    }
}


const specialtiesService = new SpecialtiesService()
export default specialtiesService