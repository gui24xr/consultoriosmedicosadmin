import { z } from 'zod';

export const prestationDTOSchema = z.object({
  id: z.string(),
  inService: z.boolean(),
  label: z.string(),
  code: z.string(),
  description: z.string().nullable(),
  specialty: z.object({
    id: z.string(),
    name: z.string(),
  }),
  provider: z.object({
    id: z.string(),
    completeName: z.string(),
  }),
});

export const prestationCreateInternalDTOSchema = z.object({
  code: z.string(),
  label: z.string(),
  description: z.string().nullable(),
  specialtyId:z.string(),
  providerId:z.string(),
});

export const prestationCreateSchema = z.object({
  label: z.string(),
  description: z.string().nullable(),
  specialtyId:z.string(),
  providerId:z.string(),
});

export const prestationUpdateSchema = prestationCreateSchema.partial()




export type PrestationDTO = z.infer<typeof prestationDTOSchema>;3
export type PrestationCreateInternalDTO = z.infer<typeof prestationCreateInternalDTOSchema>;
export type PrestationCreateDTO = z.infer<typeof prestationCreateSchema>;
export type PrestationUpdateDTO = z.infer<typeof prestationUpdateSchema>;


