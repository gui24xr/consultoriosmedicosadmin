'use server'
import { specialtiesService } from "@/services"
import { updateTag } from "next/cache"
import { ActionResponse, SpecialtyDTO, SpecialtyCreateDTO,SpecialtyUpdateDTO} from "@/types"
import { specialtyCreateDTOSchema, specialtyUpdateSchema } from "@/schemas/specialties.schema"
import { errorHandler} from "@/lib/errorHandler"


async function createSpecialty(prevState: ActionResponse<SpecialtyDTO> | null, payload: SpecialtyCreateDTO) : Promise<ActionResponse<SpecialtyDTO>>{
  try {
    specialtyCreateDTOSchema.parse(payload)
    const newSpecialty = await specialtiesService.createSpecialty(payload)
     updateTag('specialties')
    return {
      success:true,
      payload:newSpecialty,
      message:'Especialidad creada correctamente',
    }
  } catch (error) {
      const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}

async function fetchSpecialties(): Promise<ActionResponse<SpecialtyDTO[]>>  {
  try {
    const specialties = await specialtiesService.getSpecialties()
    return {
      success: true,
      payload: specialties,
      message: 'Especialidades obtenidas correctamente'
    }
  } catch (error) {
    const errorMessage = errorHandler(error)
    return {
      success: false,
      message: errorMessage,
    }
}
}


async function updateSpecialty(prevState: ActionResponse<SpecialtyDTO> | null, payload:{id:string} & SpecialtyUpdateDTO) : Promise<ActionResponse<SpecialtyDTO>>{
  try {
      const {id:specialtyId, ...data} = payload
      if (!specialtyId) throw new Error('Id is required')
      specialtyUpdateSchema.parse(data)
      const updatedSpecialty = await specialtiesService.updateSpecialty(specialtyId, data)
       updateTag('specialties')
    return {
      success:true,
      payload:updatedSpecialty,
      message: 'Especialidad actualizado correctamente',
    }

  } catch (error) {
      const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}


async function deleteSpecialty(prevState: ActionResponse<SpecialtyDTO> | null, specialtyId: string): Promise<ActionResponse<SpecialtyDTO>>{
  try {
   //aca validamos con zod que haya venido un medicId
   if(!specialtyId) throw new Error('Id is required')
   const deletedSpecialty = await specialtiesService.deleteSpecialty(specialtyId)
    updateTag('specialties')
    return {
      success:true,
      payload:deletedSpecialty,
      message: 'Especialidad eliminada correctamente',
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
    createSpecialty,
    fetchSpecialties,
    updateSpecialty,
    deleteSpecialty,
    
}