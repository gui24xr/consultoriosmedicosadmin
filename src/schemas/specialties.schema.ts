import { z } from 'zod'

export const specialtyDTOSchema = z.object({
  id: z.string().uuid('ID debe ser un UUID válido'),
  name: z.string().min(1, 'El nombre de la especialidad es requerido'),
  code: z.string().min(1, 'El código de la especialidad es requerido'),
  updatedAt: z.date(),
  consultationServices: z.array(z.object({
    id: z.string().uuid('ID del servicio debe ser un UUID válido'),
    name: z.string().nullable()
  })).default([]),
  medics: z.array(z.object({
    id: z.string().uuid('ID del médico debe ser un UUID válido'),
    completeName: z.string().min(1, 'El nombre completo del médico es requerido')
  })).default([])
})

export const specialtyCreateInternalDTOSchema = z.object({
  name: z.string().min(1, 'El nombre de la especialidad es requerido'),
  code: z.string().min(1, 'El código de la especialidad es requerido'),
})

export const specialtyCreteInputDTOSchema = z.object({
  name: z.string().min(1, 'El nombre de la especialidad es requerido'),
})

export const SpecialtyUpdateSchema = z.object({
    code: z.string().optional(),
    name: z.string().optional()
}).refine(data => data.code || data.name, {
    message: "Debes proporcionar al menos un campo para actualizar"
})



export type SpecialtyDTO = z.infer<typeof specialtyDTOSchema>
export type SpecialtyCreateInternalDTO = z.infer<typeof specialtyCreateInternalDTOSchema>
export type SpecialtyCreateDTO = z.infer<typeof specialtyCreteInputDTOSchema>
export type SpecialtyUpdateDTO = z.infer<typeof SpecialtyUpdateSchema>