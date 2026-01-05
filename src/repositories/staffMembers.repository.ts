import prisma from "@/lib/prisma"
import { StaffMemberCreateProviderDTO,
  StaffMemberUpdateProviderDTO,
  StaffMemberCreateAdminEmployeeDTO,
  StaffMemberUpdateAdminEmployeeDTO } from "@/types"

const staffMemberQueryRelations = {
    userData: true,
    adminEmployeeData: true,
    providerData: {
        include: {
            specialties: true,
            prestations: {
                include: {
                    specialty: true
                }
            }
        }
    }
} 


class StaffMembersRepository {
    async createProvider(data: StaffMemberCreateProviderDTO) {
        return await prisma.$transaction(async (tx) => {
            const foundedSoftDeletedMember = await tx.staffMember.findUnique({
                where: { dni: data.dni  },
                include: { providerData: true, adminEmployeeData: true }
            });

            if (foundedSoftDeletedMember) {
                if(foundedSoftDeletedMember.deletedAt !== null) {
                    throw new Error("Existe un miembro eliminado con el mismo DNI, restaurelo para poder operar con el.")
                }
                throw new Error("Ya existe un miembro con el mismo DNI, Si desea convertirlo en proveedor administre su perfil y agregue dicho rol.")
            }

            const counter = await tx.entityCounter.upsert({
                where: { entity: 'staffMember' },
                update: { current: { increment: 1 } },
                create: { entity: 'staffMember', prefix: 'STAFF_MEMBER', current: 1 }
            });

            const code = `${counter.prefix}-${counter.current.toString().padStart(4, '0')}`;

            return await tx.staffMember.create({
                data: {
                    code: code,
                    dni: data.dni,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    whatsAppNumber: data.whatsAppNumber,
                    record: data.record,
                    providerData:{
                        create: {
                            displayName: data.displayName,
                            specialties: {
                                connect: data.specialtyIds.map((id) => ({ id }))
                            }
                        }
                    }
                },
                include: staffMemberQueryRelations
            });
        });
    }

    async createAdminEmployee(data: StaffMemberCreateAdminEmployeeDTO) {
        return await prisma.$transaction(async (tx) => {
            const foundedSoftDeletedMember = await tx.staffMember.findUnique({
                where: { dni: data.dni, deletedAt: { not: null } },
                include: { providerData: true, adminEmployeeData: true }
            });

            if (foundedSoftDeletedMember) throw new Error("Existe un miembro eliminado con el mismo DNI, restaurelo para poder operar con el.");
            
            const counter = await tx.entityCounter.upsert({
                where: { entity: 'staffMember' },
                update: { current: { increment: 1 } },
                create: { entity: 'staffMember', prefix: 'STAFF_MEMBER', current: 1 }
            });

            const code = `${counter.prefix}-${counter.current.toString().padStart(4, '0')}`;

            return await tx.staffMember.create({
                data: {
                    code: code,
                    dni: data.dni,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    whatsAppNumber: data.whatsAppNumber,
                    record: data.record,
                    adminEmployeeData:{
                        create: {
                            task: data.task
                        }
                    }
                },
                include: staffMemberQueryRelations
            });
        });
    }

    async getStaffMembers() {
        return await prisma.staffMember.findMany({
            where: { deletedAt: null },
            include: staffMemberQueryRelations
        });
    }

    async getStaffMemberById(id: string) {
        return await prisma.staffMember.findFirstOrThrow({
            where: { id, deletedAt: null },
            include: staffMemberQueryRelations
        });
    }

    async updateProvider(id: string, data: StaffMemberUpdateProviderDTO) {
        return await prisma.$transaction(async (tx) => {
            return await tx.staffMember.update({
                where: { id },
                include: staffMemberQueryRelations,
                data: {
                    dni: data.dni,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    whatsAppNumber: data.whatsAppNumber,
                    record: data.record,
                    providerData:{
                        update: {
                            displayName: data.displayName,
                            specialties: {
                                set: data.specialtyIds.map((id) => ({ id }))
                            }
                        }
                    }
                }
                
            });
        });
    }

    async updateAdminEmployee(id: string, data: StaffMemberUpdateAdminEmployeeDTO) {
        return await prisma.$transaction(async (tx) => {
            return await tx.staffMember.update({
                where: { id },
                include: staffMemberQueryRelations,
                data: {
                    dni: data.dni,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    whatsAppNumber: data.whatsAppNumber,
                    record: data.record,
                    adminEmployeeData:{
                        update: {
                            task: data.task
                        }
                    }
                }
            });
        });
    }

    
    async deleteStaffMember(id: string) {
        return await prisma.staffMember.update({
            where: { id },
            data: { deletedAt: new Date() },
            include: staffMemberQueryRelations
        });
    }

    async hardDeleteStaffMember(id: string) {
        return await prisma.staffMember.delete({
            where: { id },
            include: staffMemberQueryRelations
        });
    }
}


const staffMembersRepository = new StaffMembersRepository();

export type StaffMemberType = NonNullable<Awaited<ReturnType<typeof staffMembersRepository.getStaffMemberById>>>

export default staffMembersRepository;