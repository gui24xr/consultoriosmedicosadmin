'use server'
import { staffMembersService } from "@/services"
import { updateTag } from "next/cache"
import { ActionResponse,StaffMemberCreateProviderDTO,
  StaffMemberUpdateProviderDTO,
  StaffMemberCreateAdminEmployeeDTO,
  StaffMemberUpdateAdminEmployeeDTO,
  StaffMemberDTO,
  ProviderOptionDTO } from "@/types"
import {  staffMemberCreateProviderSchema, staffMemberUpdateProviderSchema, staffMemberCreateAdminEmployeeSchema, staffMemberUpdateAdminEmployeeSchema} from "@/schemas/staffMembers.schema"
import { errorHandler } from "@/lib/errorHandler"

async function createProvider(prevState: ActionResponse<StaffMemberDTO> | null, payload: StaffMemberCreateProviderDTO) : Promise<ActionResponse<StaffMemberDTO>>{
  try {
    staffMemberCreateProviderSchema.parse(payload)
    const newProvider= await staffMembersService.createProvider(payload)
    updateTag('staffMembers')
    return {
      success:true,
      payload:newProvider,
      message:'EMpleado creado correctamente',
    }
  } catch (error) {
      const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}

async function createAdminEmployee(prevState: ActionResponse<StaffMemberDTO> | null, payload: StaffMemberCreateAdminEmployeeDTO) : Promise<ActionResponse<StaffMemberDTO>>{
  try {
    staffMemberCreateAdminEmployeeSchema.parse(payload)
    const newEmployeeAdmin= await staffMembersService.createAdminEmployee(payload)
    updateTag('staffMembers')
    return {
      success:true,
      payload:newEmployeeAdmin,
      message:'Empleado creado correctamente',
    }
  } catch (error) {
      const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}

async function fetchProvidersOptions(): Promise<ActionResponse<ProviderOptionDTO[]>>  {
  try {
    const providersOptions = await staffMembersService.getProvidersOptions()
    return {
      success: true,
      payload: providersOptions,
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


async function updateProvider(prevState: ActionResponse<StaffMemberDTO> | null, payload:{id:string} & StaffMemberUpdateProviderDTO) : Promise<ActionResponse<StaffMemberDTO>>{
  try {
      const {id:providerId, ...data} = payload
      if (!providerId) throw new Error('Id is required')
      staffMemberUpdateProviderSchema.parse(data)
      const updatedProvider = await staffMembersService.updateProvider(providerId, data)
      updateTag('staffMembers')
    return {
      success:true,
      payload:updatedProvider,
      message: 'Miembro actualizado correctamente',
    }

  } catch (error) {
      const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}

async function updateAdminEmployee(prevState: ActionResponse<StaffMemberDTO> | null, payload:{id:string} & StaffMemberUpdateAdminEmployeeDTO) : Promise<ActionResponse<StaffMemberDTO>>{
  try {
      const {id:adminEmployee, ...data} = payload
      if (!adminEmployee) throw new Error('Id is required')
      staffMemberUpdateAdminEmployeeSchema.parse(data)
      const updatedAdminEmployee = await staffMembersService.updateAdminEmployee(adminEmployee, data)
      updateTag('staffMembers')
    return {
      success:true,
      payload:updatedAdminEmployee,
      message: 'Miembro actualizado correctamente',
    }

  } catch (error) {
      const errorMessage = errorHandler(error)
      return {
        success: false,
        message: errorMessage,
      }
  }
}
/*
async function changeProviderInServiceStatus(prevState: ActionResponse<ProviderDTO> | null, payload:{id:string} & {newStatus:boolean}) : Promise<ActionResponse<ProviderDTO>>{
  try {
      const {id:providerId, newStatus} = payload
      if (!providerId  ) throw new Error('Id is required')
      providerUpdateStatusSchema.parse({newStatus})
      const updatedProvider = await providersService.changeProviderInServiceStatus(providerId, newStatus) 
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
*/
async function deleteStaffMember(prevState: ActionResponse<StaffMemberDTO> | null, staffMemberId: string): Promise<ActionResponse<StaffMemberDTO>>{
  try {
   if(!staffMemberId) throw new Error('Id is required')
   const deletedStaffMember = await staffMembersService.deleteStaffMember(staffMemberId)
   updateTag('staffMembers') 
  return {
      success:true,
      payload: deletedStaffMember,
      message: 'Miembro eliminado correctamente',
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
  createAdminEmployee,
  fetchProvidersOptions,
  updateProvider,
  updateAdminEmployee,
  //changeProviderInServiceStatus,
  deleteStaffMember
}