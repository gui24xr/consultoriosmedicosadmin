import { z } from "zod";


export const providerSchema = z.object({
  id: z.string(),
  code: z.string(),
  record: z.string().nullable().optional(),
  completeName: z.string(),
  displayName: z.string(),
  specialties: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
  prestations: z.array(
    z.object({
      id: z.string(),
      code: z.string(),
      displayName: z.string().nullable,
    })
  ),
});

export const staffMemberSchema = z.object({
  id: z.string(),
  code: z.string(),
  dni: z.string(),
  record: z.string().nullable().optional(),
  firstName: z.string(),
  lastName: z.string(),
  completeName: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  whatsAppNumber: z.string().nullable(),
  roles: z.array(z.enum(["ADMIN_EMPLOYEE_MEMBER", "PROVIDER_MEMBER"])),
  adminEmployeeData: z.object({
    id: z.string(),
    task: z.string()
  }).nullable(),
  providerData: z.object({
    displayName: z.string(),
    specialties: z.array(
      z.object({
        id: z.string(),
        displayName: z.string(),
      })
    ),
    prestations: z.array(
      z.object({
        id: z.string(),
        code: z.string(),
        displayName: z.string(),
      })
    ),
  }).nullable(),
});

export const staffMemberEntitySchema = z.object({
  id: z.string("ID debe ser un UUID valido"),
  code: z.string(),
  record: z.string(),
  dni: z.string().min(5, "El DNI es requerido"),
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  displayName: z.string().min(1, "El nombre de visualización es requerido"),
  email: z.email("El email es requerido"),
  phone: z.string(),
  whatsAppNumber: z.string(),

  specialtyIds: z
    .array(z.string())
    .min(1, "Debe seleccionar al menos una especialidad."),

  task: z
    .string()
    .min(3, "La tarea es requerida, debe tener al menos 3 caracteres"),
});

export const staffMemberCreateProviderSchema = staffMemberEntitySchema
  .partial({
    record: true,
    phone: true,
    whatsAppNumber: true,
  })
  .omit({ task: true, id: true, code: true });

export const staffMemberCreateAdminEmployeeSchema = staffMemberEntitySchema
  .partial({
    record: true,
    phone: true,
    whatsAppNumber: true,
  })
  .omit({ id: true, code: true });

export const staffMemberUpdateProviderSchema =
  staffMemberCreateAdminEmployeeSchema
    .partial({})
    .omit({ task: true, id: true });

export const staffMemberUpdateAdminEmployeeSchema =
  staffMemberCreateAdminEmployeeSchema
    .partial()
    .omit({ specialtyIds: true, id: true, code: true });

export const ProvidersOptionsSchema = staffMemberSchema.pick({
  id: true,
  displayName: true,
  specialties: true,
  prestations: true
})

export type StaffMemberCreateProviderDTO = z.infer<
  typeof staffMemberCreateProviderSchema
>;
export type StaffMemberCreateAdminEmployeeDTO = z.infer<
  typeof staffMemberCreateAdminEmployeeSchema
>;
export type StaffMemberUpdateProviderDTO = z.infer<
  typeof staffMemberUpdateProviderSchema
>;
export type StaffMemberUpdateAdminEmployeeDTO = z.infer<
  typeof staffMemberUpdateAdminEmployeeSchema
>;

export type ProviderOptionDTO = z.infer<typeof ProvidersOptionsSchema>;


export type StaffMemberDTO = z.infer<typeof staffMemberSchema>;
export type ProviderDTO = z.infer<typeof providerSchema>;
