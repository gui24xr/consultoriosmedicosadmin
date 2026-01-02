'use server'
import { providersService } from "@/services"
import { updateTag } from "next/cache"
import { ActionResponse, ProviderDTO, ProviderDetailDTO, ProviderCreateDTO, ProviderUpdateDTO } from "@/types/"
import { providerCreateSchema, providerUpdateSchema,  } from "@/schemas/providers.schema"
import { errorHandler } from "@/lib/errorHandler"

async function createProvider(prevState: ActionResponse<ProviderDetailDTO> | null, payload: ProviderCreateDTO) : Promise<ActionResponse<ProviderDetailDTO>>{

  try {
    providerCreateSchema.parse(payload)
    const newProvider= await providersService.createProvider(payload)
    updateTag('providers')
    return {
      success:true,
      payload:newProvider,
      message:'Medico creado correctamente',
    }
  } catch (error) {
      const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}

async function fetchProviders(): Promise<ActionResponse<ProviderDTO[]>>  {
  try {
    const providers = await providersService.getProviders()
    return {
      success: true,
      payload: providers,
      message: 'Medicos obtenidos correctamente'
    }
  } catch (error) {
     const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}

async function fetchProviderDetails(providerId: string) : Promise<ActionResponse<ProviderDetailDTO>>{
  try{
    //aca validamos con zod que haya venido un medicId
    const provider = await providersService.getProvider(providerId)
    return {
      success: true,
      payload: provider,
      message: 'Medico obtenido correctamente'
    }
  }catch(error){
    const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}


async function updateProvider(prevState: ActionResponse<ProviderDetailDTO> | null, payload:{id:string} & ProviderUpdateDTO) : Promise<ActionResponse<ProviderDetailDTO>>{
  try {
      const {id:providerId, ...data} = payload
      providerUpdateSchema.parse(payload)
      const updatedProvider = await providersService.updateProvider(providerId, data)
      updateTag('providers')
    return {
      success:true,
      payload:updatedProvider,
      message: 'Servicio actualizado correctamente',
    }

  } catch (error) {
      const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}

async function deleteProvider(prevState: ActionResponse<ProviderDTO> | null, providerId: string): Promise<ActionResponse<ProviderDTO>>{
  try {
   if(!providerId) throw new Error('Id is required')
   const deletedProvider = await providersService.deleteProvider(providerId)
   updateTag('providers') 
  return {
      success:true,
      payload: deletedProvider,
      message: 'Médico eliminado correctamente',
    }
    
  } catch (error) {
    const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }

}


export {
  createProvider,
  fetchProviders,
  fetchProviderDetails,
  updateProvider,
  deleteProvider
}