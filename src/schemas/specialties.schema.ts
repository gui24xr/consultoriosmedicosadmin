import { z } from 'zod'

export const specialtyDTOSchema = z.object({
  id: z.string().uuid('ID debe ser un UUID válido'),
  identifier: z.string().min(5, 'El nombre debe tener al menos 6 caracteres').regex(/^[A-Z0-9-]+$/, 'Solo se permiten mayúsculas, números y guiones medios'),
  displayName: z.string().min(3, 'Debe existir un nombre de visualización de la especialidad, y debe tener al menos 3 caracteres'),
  code: z.string().min(5, 'El código de la especialidad es requerido, debe tener al menos 5 caracteres'),
  updatedAt: z.date(),
  prestationsData: z.array(z.object({
    id: z.string().uuid('ID del servicio debe ser un UUID válido'),
    code: z.string().nullable(),
    displayName: z.string()
  })).default([]),
  providersData: z.array(z.object({
    id: z.string().uuid('ID del médico debe ser un UUID válido'),
    completeName: z.string().min(1, 'El nombre completo del médico es requerido'),
    displayName: z.string()
  })).default([])
})

export const specialtyOptionDTOSchema = specialtyDTOSchema.pick({ 
  id: true, displayName: true
})

export const specialtyCreateDTOSchema = z.object({
  identifier: z.string().min(5, 'El Identifica de la especialidad es requerido y/o debe tener al menos 5 caracteres'),
  displayName: z.string().min(5, 'El nombre de la especialidad es requerido y/o debe tener al menos 5 caracteres'),
})

export const specialtyUpdateSchema = specialtyCreateDTOSchema.partial()



export type SpecialtyDTO = z.infer<typeof specialtyDTOSchema>
export type SpecialtyCreateDTO = z.infer<typeof specialtyCreateDTOSchema>
export type SpecialtyUpdateDTO = z.infer<typeof specialtyUpdateSchema>
export type SpecialtyOptionDTO = z.infer<typeof specialtyOptionDTOSchema>