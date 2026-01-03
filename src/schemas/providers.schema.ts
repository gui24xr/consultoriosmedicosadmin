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


export const providerDBSchema = z.object({
  record: z.string().nullable(),
  dni: z.string().min(5, "El DNI es obligatorio y no puede estar vacío."),
  firstName: z.string().min(1, "El nombre es obligatorio."), 
  lastName: z.string().min(1, "El apellido es obligatorio."),
  email: z.string().email("Formato de email inválido."),
  phone: z.string(),
  whatsAppNumber: z.string(),
  specialtyIds: z.array(z.string()).min(1, "Debe seleccionar al menos una especialidad."), 
  inService: z.boolean(),
});

export const providerUpdateEntity = providerDBSchema.partial();

export const providerCreateSchema = providerDBSchema
  .omit({ inService: true })  
  .extend({
    phone: z.string().optional(),          
    whatsAppNumber: z.string().optional() 
  });

 export const providerUpdateBasicDataSchema = providerDBSchema
  .omit({ inService: true })  // Quitar inService
  .partial();                 // Hacer todos los campos opcionales

export const providerUpdateStatusSchema = providerDBSchema.pick({
  inService: true,
});






export type ProviderDTO = z.infer<typeof providerSchemaDTO>
export type ProviderDetailDTO = z.infer<typeof providerDetailSchemaDTO>
export type ProviderCreateDTO = z.infer<typeof providerCreateSchema>;
export type ProviderUpdateEntityDTO = z.infer<typeof providerUpdateEntity>;
export type ProviderUpdateBasicDataDTO = z.infer<typeof providerUpdateBasicDataSchema>;
export type ProviderUpdateStatusDTO = z.infer<typeof providerUpdateStatusSchema>;