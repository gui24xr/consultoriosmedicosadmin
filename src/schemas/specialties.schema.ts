import { z } from 'zod'

export const specialtyDTOSchema = z.object({
  id: z.string().uuid('ID debe ser un UUID válido'),
  name: z.string().min(5, 'El nombre de la especialidad es requerido, debe tener al menos 5 caracteres'),
  code: z.string().min(5, 'El código de la especialidad es requerido, debe tener al menos 5 caracteres'),
  updatedAt: z.date(),
  prestations: z.array(z.object({
    id: z.string().uuid('ID del servicio debe ser un UUID válido'),
    code: z.string().nullable(),
    label: z.string()
  })).default([]),
  providers: z.array(z.object({
    id: z.string().uuid('ID del médico debe ser un UUID válido'),
    completeName: z.string().min(1, 'El nombre completo del médico es requerido')
  })).default([])
})



export const specialtyCreateDTOSchema = z.object({
  name: z.string().min(5, 'El nombre de la especialidad es requerido y/o debe tener al menos 5 caracteres'),
})

export const specialtyUpdateSchema = specialtyCreateDTOSchema.partial()



export type SpecialtyDTO = z.infer<typeof specialtyDTOSchema>
export type SpecialtyCreateDTO = z.infer<typeof specialtyCreateDTOSchema>
export type SpecialtyUpdateDTO = z.infer<typeof specialtyUpdateSchema>