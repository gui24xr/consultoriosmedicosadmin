import {  z } from 'zod'


export const providerSchemaDTO = z.object({
  id: z.string(),
  inService: z.boolean(),
  code: z.string(),
  record: z.string().nullable().optional(),
  completeName: z.string(),
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
      label: z.string(),
    })
  ),
})

export const providerDetailSchemaDTO = z.object({
  id: z.string(),
  code: z.string(),
  inService: z.boolean(),
  record: z.string().nullable().optional(),
  dni: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  completeName: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  whatsAppNumber: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
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
      label: z.string(),
    })
  ),
})




export const providerCreateInternalSchema = z.object({
  code: z.string().min(6, "El código es obligatorio y no puede estar vacío."),
  record: z.string().nullable().optional(), 
  dni: z.string().min(5, "El DNI es obligatorio y no puede estar vacío."),
  firstName: z.string().min(1, "El nombre es obligatorio."), 
  lastName: z.string().min(1, "El apellido es obligatorio."),
  email: z.string().email("Formato de email inválido.").optional(), 
  phone: z.string().optional(), 
  whatsAppNumber: z.string().optional(),
  specialtyIds: z.array(z.string()).min(1, "Debe seleccionar al menos una especialidad."), 
});

export const providerCreateSchema = z.object({
  record: z.string().nullable().optional(), 
  dni: z.string().min(5, "El DNI es obligatorio y no puede estar vacío."),
  firstName: z.string().min(1, "El nombre es obligatorio."), 
  lastName: z.string().min(1, "El apellido es obligatorio."),
  email: z.string().email("Formato de email inválido.").optional(), 
  phone: z.string().optional(), 
  whatsAppNumber: z.string().optional(),
  specialtyIds: z.array(z.string()).min(1, "Debe seleccionar al menos una especialidad."), 
});

export const providerUpdateSchema = providerCreateSchema.partial()


export type ProviderDTO = z.infer<typeof providerSchemaDTO>
export type ProviderDetailDTO = z.infer<typeof providerDetailSchemaDTO>
export type ProviderCreateInternalDTO = z.infer<typeof providerCreateInternalSchema>;
export type ProviderCreateDTO = z.infer<typeof providerCreateSchema>;
export type ProviderUpdateDTO = z.infer<typeof providerUpdateSchema>;