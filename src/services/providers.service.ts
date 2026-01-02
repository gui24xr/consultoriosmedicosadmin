import { ProviderDTO,  ProviderDetailDTO, ProviderCreateInternalDTO, ProviderCreateDTO, ProviderUpdateDTO }from "@/types";
import { ProviderType, ProviderDetailType } from "@/repositories/providers.repository";
import { providersRepository } from "@/repositories";
import { unstable_cache } from "next/cache";



function getProviderDetailsDTO(providerDetail: ProviderDetailType): ProviderDetailDTO {
    return {
    id: providerDetail.id,
    code: providerDetail.code,
    inService: providerDetail.inService,
    record: providerDetail.record,
    dni: providerDetail.dni,
    firstName: providerDetail.firstName,
    lastName: providerDetail.lastName,
    completeName: providerDetail.lastName + ' ' + providerDetail.firstName,
    email: providerDetail.email,
    phone: providerDetail.phone,
    whatsAppNumber: providerDetail.whatsAppNumber,
    createdAt: providerDetail.createdAt,
    updatedAt: providerDetail.updatedAt,
    specialties: providerDetail.specialties.map(specialty => ({
        id: specialty.id,
        code: specialty.code,
        name: specialty.name
    })) || [],
    prestations: providerDetail.prestations.map(prestation => ({
        id: prestation.id,
        code: prestation.code,
        label: prestation.label,
    })) || [],
}
    }


function getProviderDTO(provider: ProviderType): ProviderDTO{
    return {
    id: provider.id,
    inService: provider.inService,
    record: provider.record,
    code: provider.code,
    completeName: provider.lastName + ' ' + provider.firstName,
    specialties: provider.specialties.map(specialty => ({
        id: specialty.id,
        name: specialty.name
    })) || [],
       prestations: provider.prestations.map(prestation => ({
        id: prestation.id,
        code: prestation.code,
        label: prestation.label,
    })) || [],
}
}
class ProvidersService {
    private getNewProviderCode(): string {
        return 'PROV' + Date.now().toString()
    }

    private getNewProviderRecord(): string {
        return 'LEG' + Date.now().toString()
    }
    

    async createProvider(data: ProviderCreateDTO): Promise<ProviderDetailDTO> {
        try {
            const newProviderCreateData: ProviderCreateInternalDTO = {
                ...data,
                code: this.getNewProviderCode(),
            }
            const newProvider = await providersRepository.createProvider(newProviderCreateData)
            return getProviderDetailsDTO(newProvider)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async getProviders():Promise<ProviderDTO[]> {
        try {
            const getProvidersFromDB = async () => {
                const providers = await providersRepository.getProviders()
                return providers.map(provider => getProviderDTO(provider))
            }
            const cachedProviders = unstable_cache(getProvidersFromDB, ['all-providers'], {tags: ['providers'], revalidate: 3600})
            const providers = await cachedProviders()
            return providers
        }catch (error) {
            console.error(error)
            throw error
        }
        
    }

    async getProvider(id: string) : Promise<ProviderDetailDTO>{
        try {
            const getProviderFromDB = async () : Promise<ProviderDetailDTO> => {
                const provider = await providersRepository.getProviderDetails(id)
                return getProviderDetailsDTO(provider)
            }

            const cachedProvider = unstable_cache(
                getProviderFromDB, 
                ['provider-detail', id], 
                { tags: ['providers'], revalidate: 3600 }
            )
            
            const provider = await cachedProvider()
            return provider
            
        } catch (error) {
            console.error(error)
            throw error
        }
    }


    async updateProvider(id: string, data: ProviderUpdateDTO): Promise<ProviderDetailDTO> {
        try {
            const updatedProvider = await providersRepository.updateProvider(id, data)
            return getProviderDetailsDTO(updatedProvider)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async changeProviderInServiceStatus(id:string,inService: boolean): Promise<ProviderDTO> {
        try {
            const updatedProvider = await providersRepository.updateProviderInServiceStatus(id, inService)
            return getProviderDTO(updatedProvider)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async deleteProvider(id: string): Promise<ProviderDTO> {
        try {
            const deletedProvider = await providersRepository.deleteProvider(id)
            return getProviderDTO(deletedProvider)
        } 
            catch (error) {
            console.error(error)
            throw error
        }
    }

    async hardDeleteProvider(id: string): Promise<ProviderDTO> {
        try {
            const deletedProvider = await providersRepository.hardDeleteProvider(id)
            return getProviderDTO(deletedProvider)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async restoreProvider(id: string): Promise<ProviderDTO> {
        try {
            const restoredProvider = await providersRepository.restoreProvider(id)
            return getProviderDTO(restoredProvider)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

}


const providersService = new ProvidersService()
export default providersService