import { z } from 'zod';

export const prestationDTOSchema = z.object({
  id: z.string(),
  code: z.string(),
  identifier: z.string(),
  displayName: z.string(),
  description: z.string().nullable(),
  inService: z.boolean(),
  specialty: z.object({
    id: z.string(),
    code: z.string(),
    identifier: z.string(),
    displayName: z.string(),
  }),
  providerData: z.object({
    id: z.string(),
    displayName: z.string(),
    completeName: z.string(),
  }),
});


export const prestationEntitySchema = z.object({
  code: z.string(),
  inService: z.boolean(),
  identifier: z.string(),
  displayName: z.string(),
  description: z.string(),
  specialtyId:z.string(),
  providerId:z.string(),
})


export const prestationCreateSchema = prestationEntitySchema.omit({
  inService: true}).extend({
  description: z.string().optional(),
})

export const prestationUpdateSchema = prestationEntitySchema.partial().omit({
  inService: true, code: true
})

export const prestationUpdateStatusSchema = prestationEntitySchema.pick({
  inService: true,
});


export type PrestationDTO = z.infer<typeof prestationDTOSchema>;3
export type PrestationCreateDTO = z.infer<typeof prestationCreateSchema>;
export type PrestationUpdateDTO = z.infer<typeof prestationUpdateSchema>;
export type PrestationUpdateStatusDTO = z.infer<typeof prestationUpdateStatusSchema>;


