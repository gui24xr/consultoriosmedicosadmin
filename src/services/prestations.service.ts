import { PrestationDTO, PrestationCreateInternalDTO, PrestationCreateDTO, PrestationUpdateDTO } from "@/types";
import { PrestationType } from "@/repositories/prestations.repository";
import { prestationsRepository } from "@/repositories";
import { unstable_cache } from "next/cache";


function getPrestationDTO(prestation: PrestationType): PrestationDTO{
    
    return {
        id: prestation.id,
        inService: prestation.inService,
        label: prestation.label, 
        code: prestation.code,
        description: prestation.description || null,
        specialty: {
            id: prestation.specialty.id,
            name: prestation.specialty.name,
        },
        provider: {
            id: prestation.provider.id,
            completeName: prestation.provider.firstName + ' ' + prestation.provider.lastName,
        },
    }
}


class PrestationsService{

     private getNewProviderCode(): string {
        return 'PREST' + Date.now().toString()
    }
    async createPrestation(data: PrestationCreateDTO): Promise<PrestationDTO> {
       try{
            const newPrestationData:PrestationCreateInternalDTO = {
                code: this.getNewProviderCode(),
               ...data
            }
            const newPrestation = await prestationsRepository.createPrestation(newPrestationData)
            return getPrestationDTO(newPrestation)
       }catch(error){
        console.log(error)
        throw error
       }
    }

    async getPrestations(): Promise<PrestationDTO[]>{
        try{
            const getPrestationsFromDB  = async () => {
                const prestations = await prestationsRepository.getPrestations()
                return prestations.map(prestation => getPrestationDTO(prestation))
            }
            const cachedPrestations = unstable_cache(
                getPrestationsFromDB,
                ['all-prestations'],
                { tags: ['prestations'], revalidate: 3600 }
            )
           return await cachedPrestations()
        }catch(error){
            console.log(error)
            throw error
        }
    }

    async getPrestationById(id: string): Promise<PrestationDTO> {
        try{
            const getPrestationFromDB = async () => {
                const prestation = await prestationsRepository.getPrestationById(id)
                return getPrestationDTO(prestation)
            }
            const cachedPrestation = unstable_cache(
                getPrestationFromDB,
                ['prestation', id],
                { tags: ['prestations'], revalidate: 3600 }
            )
            return await cachedPrestation()
        }catch(error){
            console.log(error)
            throw error
        }
    }

    async updatePrestation(id: string, data: PrestationUpdateDTO): Promise<PrestationDTO> {
        try{
            const prestation = await prestationsRepository.updatePrestation(id, data)
            return getPrestationDTO(prestation)
        }catch(error){
            console.log(error)
            throw error
        }
    }

    async updatePrestationInServiceStatus(id: string, inService: boolean): Promise<PrestationDTO> {
        try{
            const prestation = await prestationsRepository.updatePrestationInServiceStatus(id, inService)
            return getPrestationDTO(prestation)
        }catch(error){
            console.log(error)
            throw error
        }
    }

    async deletePrestation(id: string): Promise<PrestationDTO> {
        try{
            const prestation = await prestationsRepository.deletePrestation(id)
            return getPrestationDTO(prestation)
        }catch(error){
            console.log(error)
            throw error
        }
    }

    async hardDeletePrestation(id: string): Promise<PrestationDTO> {
        try{
            const prestation = await prestationsRepository.hardDeletePrestation(id)
            return getPrestationDTO(prestation)
        }catch(error){
            console.log(error)
            throw error
        }
    }

    async restorePrestation(id: string): Promise<PrestationDTO> {
        try{
            const prestation = await prestationsRepository.restorePrestation(id)
            return getPrestationDTO(prestation)
        }catch(error){
            console.log(error)
            throw error
        }
    }


}


const prestationsService = new PrestationsService()
export default prestationsService