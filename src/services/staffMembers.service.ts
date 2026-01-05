import {  StaffMemberCreateProviderDTO, StaffMemberUpdateProviderDTO, StaffMemberCreateAdminEmployeeDTO, StaffMemberUpdateAdminEmployeeDTO, StaffMemberDTO, ProviderOptionDTO} from "@/types";
import { StaffMemberType } from "@/repositories/staffMembers.repository";
import { staffMembersRepository } from "@/repositories";
import { unstable_cache } from "next/cache";



function toStaffMemberDTO(staffMember: StaffMemberType): StaffMemberDTO {

    const getStaffMemeberCompleteName = () => `${staffMember.firstName} ${staffMember.lastName}`
    return {
        id: staffMember.id,
        code: staffMember.code,
        dni: staffMember.dni,
        firstName: staffMember.firstName,
        lastName: staffMember.lastName,
        completeName: getStaffMemeberCompleteName(),
        email: staffMember.email,
        phone: staffMember.phone,
        whatsAppNumber: staffMember.whatsAppNumber,
        roles: staffMember.providerData ? ['PROVIDER_MEMBER'] : staffMember.adminEmployeeData ? ['ADMIN_EMPLOYEE_MEMBER'] : [],
        adminEmployeeData: staffMember.adminEmployeeData ? {
            id: staffMember.adminEmployeeData.id,
            task: staffMember.adminEmployeeData.task
        } : null,
        providerData: staffMember.providerData ? {
            displayName: staffMember.providerData.displayName,
            specialties: staffMember.providerData.specialties.map((specialty) => ({
                id: specialty.id,
                displayName: specialty.displayName
            })),
            prestations: staffMember.providerData.prestations.map((prestation) => ({
                id: prestation.id,
                code: prestation.code,
                displayName: prestation.displayName || (prestation.specialty.displayName + " - " + staffMember.providerData?.displayName)
            }))
        } : null
    }
}

class StaffMembersService {
    
    async createProvider(data: StaffMemberCreateProviderDTO): Promise<StaffMemberDTO>{
        const newProvider = await staffMembersRepository.createProvider(data)
        return toStaffMemberDTO(newProvider)
    }

    async createAdminEmployee(data: StaffMemberCreateAdminEmployeeDTO): Promise<StaffMemberDTO>{
        const newAdminEmployee = await staffMembersRepository.createAdminEmployee(data)
        return toStaffMemberDTO(newAdminEmployee)
    }

    async getStaffMembers(): Promise<StaffMemberDTO[]>{
        const getFromDB = async () => {
            const staffMembers = await staffMembersRepository.getStaffMembers()
            return staffMembers.map(toStaffMemberDTO)
        }
        
        const cachedMembers = unstable_cache(
            getFromDB,
            ["all-staffMembers"] ,
            { tags: ["staffMembers"], revalidate: 3600}
        );
        
        return await cachedMembers();
    }

    async getStaffMemberById(id: string): Promise<StaffMemberDTO>{
        const getFromDB = async () => {
            const staffMember = await staffMembersRepository.getStaffMemberById(id)
            return toStaffMemberDTO(staffMember)
        }
        
        const cachedMember = unstable_cache(
            getFromDB,
            ["staffMember", id],
            { tags: ["staffMembers"], revalidate: 3600}
        );
        
        return await cachedMember();
    }
    
    async getProvidersOptions(): Promise<ProviderOptionDTO[]>{
        const providers = await this.getStaffMembers()
        return providers.filter(provider => provider.roles.includes('PROVIDER_MEMBER')).map(item => ({
            id: item.id,
            displayName: item.providerData?.displayName,
            specialties: item.providerData?.specialties,
            prestations: item.providerData?.prestations
        }))
    }

    async updateProvider(id: string, data: StaffMemberUpdateProviderDTO): Promise<StaffMemberDTO> {
        const updatedProvider = await staffMembersRepository.updateProvider(id, data)
        return toStaffMemberDTO(updatedProvider)
    }

    async updateAdminEmployee(id: string, data: StaffMemberUpdateAdminEmployeeDTO): Promise<StaffMemberDTO> {
        const updatedAdminEmployee = await staffMembersRepository.updateAdminEmployee(id, data)
        return toStaffMemberDTO(updatedAdminEmployee)
    }

    async deleteStaffMember(id: string): Promise<StaffMemberDTO> {
        const deletedStaffMember = await staffMembersRepository.deleteStaffMember(id)
        return toStaffMemberDTO(deletedStaffMember)
    }

    async hardDeleteStaffMember(id: string): Promise<StaffMemberDTO> {
        const deletedStaffMember = await staffMembersRepository.hardDeleteStaffMember(id)
        return toStaffMemberDTO(deletedStaffMember)
    }

}
    

const staffMembersService = new StaffMembersService();
export default staffMembersService
    
