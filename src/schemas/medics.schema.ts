import { z } from 'zod'


export const medicSchemaDTO = z.object({
  id: z.string(),
  inService: z.boolean(),
  record: z.string().nullable().optional(),
  dni: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  completeName: z.string(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),

  specialties: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),

  consultationServices: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
})

export const medicDetailSchemaDTO = z.object({
  id: z.string(),
  inService: z.boolean(),
  record: z.string().nullable().optional(),
  dni: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  completeName: z.string(),

  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),

  contactData: z.object({
    email: z.string().email().nullable().optional(),
    whatsAppNumber: z.string().nullable().optional(),
    phone: z.string().nullable().optional(),
  }),

  profile: z.object({
    id: z.string(),
  }),

  addressData: z
    .object({
      id: z.string(),
      street: z.string(),
      number: z.string(),
      city: z.string(),
      postalCode: z.string(),
      state: z.string(),
      country: z.string(),
      updatedAt: z.coerce.date(),
      medicId: z.string(),
    })
    .nullable(),

  specialties: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),

  consultationServices: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
})


export const medicInputSchema = z.object({
  record: z.string().nullable().optional(), 
  dni: z.string().min(1, "El DNI es obligatorio y no puede estar vacío."),
  firstName: z.string().min(1, "El nombre es obligatorio."), 
  lastName: z.string().min(1, "El apellido es obligatorio."),
  email: z.string().email("Formato de email inválido.").optional(), 
  phone: z.string().optional(), 
  whatsAppNumber: z.string().optional(),
  specialtyIds: z.array(z.string()).min(1, "Debe seleccionar al menos una especialidad."), 
});

export const medicCreateSchema = z.object({
  record: z.string().nullable(),
  dni: z.string().min(1, "El DNI es obligatorio y no puede estar vacío."),
  firstName: z.string().min(1, "El nombre es obligatorio."), 
  lastName: z.string().min(1, "El apellido es obligatorio."),
  email: z.string().email("Formato de email inválido.").optional(), 
  phone: z.string().optional(), 
  whatsAppNumber: z.string().optional(),
  specialtyIds: z.array(z.string()).min(1, "Debe seleccionar al menos una especialidad."), 
});

export const medicUpdateSchema = z.object({
  record: z.string().nullable(),
  dni: z.string().min(1, "El DNI es obligatorio y no puede estar vacío."),
  firstName: z.string().min(1, "El nombre es obligatorio."), 
  lastName: z.string().min(1, "El apellido es obligatorio."),
  email: z.string().email("Formato de email inválido.").optional(), 
  phone: z.string().optional(), 
  whatsAppNumber: z.string().optional(),
  specialtyIds: z.array(z.string()).min(1, "Debe seleccionar al menos una especialidad."), 
});

export type MedicDTO = z.infer<typeof medicSchemaDTO>
export type MedicDetailDTO = z.infer<typeof medicDetailSchemaDTO>
export type MedicInputDTO = z.infer<typeof medicInputSchema>;
export type MedicCreateDTO = z.infer<typeof medicCreateSchema>;
export type MedicUpdateDTO = z.infer<typeof medicUpdateSchema>;


