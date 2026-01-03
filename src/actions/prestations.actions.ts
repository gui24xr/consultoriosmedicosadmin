'use server'
import { prestationsService } from "@/services"
import {  updateTag } from "next/cache"
import { ActionResponse, PrestationDTO, PrestationCreateDTO, PrestationUpdateBasicDataDTO, PrestationUpdateStatusDTO } from "@/types"
import { prestationCreateSchema, prestationUpdateBasicDataSchema, prestationUpdateStatusSchema } from "@/schemas/prestations.schema"
import { errorHandler } from "@/lib/errorHandler"

async function createPrestation(prevState: ActionResponse<PrestationDTO> | null, payload: PrestationCreateDTO) : Promise<ActionResponse<PrestationDTO>>{

  try {
    prestationCreateSchema.parse(payload)
    const newPrestation = await prestationsService.createPrestation(payload)
    updateTag('prestations')
    return {
      success:true,
      payload:newPrestation,
      message:'Servicio  creado correctamente',
    }

  } catch (error) {
      const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}


async function fetchPrestations(): Promise<ActionResponse<PrestationDTO[]>>  {
  try {
    const prestations = await prestationsService.getPrestations()
    return {
      success: true,
      payload: prestations,
      message: 'Servicios obtenidos correctamente'
    }
  } catch (error) {
     const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}

async function updatePrestations(prevState: ActionResponse<PrestationDTO> | null, payload:{id:string} & PrestationUpdateBasicDataDTO) : Promise<ActionResponse<PrestationDTO>>{
  try {
      const {id:prestationId, ...data} = payload
      prestationUpdateBasicDataSchema.parse(payload)
      const updatedPrestation = await prestationsService.updatePrestation(prestationId, data)
      updateTag('prestations')
    return {
      success:true,
      payload:updatedPrestation,
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

async function changePrestationInServiceStatus(prevState: ActionResponse<PrestationDTO> | null, payload:{id:string} & {newStatus: boolean}) : Promise<ActionResponse<PrestationDTO>>{
  try {
      const {id:prestationId, newStatus} = payload
      if (!prestationId) throw new Error('Id is required')
      prestationUpdateStatusSchema .parse({newStatus})
      const updatedPrestation = await prestationsService.changePrestationInServiceStatus(prestationId, newStatus)
      updateTag('prestations')
    return {
      success:true,
      payload:updatedPrestation,
      message: 'Estado de Servicio actualizado correctamente',
    }

  } catch (error) {
      const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}

async function deletePrestations(prevState: ActionResponse<PrestationDTO> | null, consultationServiceId: string): Promise<ActionResponse<PrestationDTO>>{
  try {
   //aca validamos con zod que haya venido un medicId
   if(!consultationServiceId) throw new Error('Id is required')
   const deletedConsultationService = await prestationsService.deletePrestation(consultationServiceId)
   updateTag('prestations')
   return {
      success:true,
      payload:deletedConsultationService,
      message: 'Servicio eliminado correctamente',
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
  createPrestation, 
  fetchPrestations,
  updatePrestations, 
  changePrestationInServiceStatus,
  deletePrestations 
}