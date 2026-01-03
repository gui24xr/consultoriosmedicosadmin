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


export const prestationDBSchema = z.object({
  inService: z.boolean(),
  label: z.string(),
  description: z.string(),
  specialtyId:z.string(),
  providerId:z.string(),
})


export const prestationCreateSchema = prestationDBSchema.omit({
  inService: true}).extend({
  description: z.string().optional(),
})

export const prestationUpdateEntitySchema = prestationDBSchema.partial()

 export const prestationUpdateBasicDataSchema = prestationDBSchema
  .omit({ inService: true })  
  .partial();                

export const prestationUpdateStatusSchema = prestationDBSchema.pick({
  inService: true,
});


export type PrestationDTO = z.infer<typeof prestationDTOSchema>;3
export type PrestationCreateDTO = z.infer<typeof prestationCreateSchema>;
export type PrestationUpdateEntityDTO = z.infer<typeof prestationUpdateEntitySchema>;
export type PrestationUpdateBasicDataDTO = z.infer<typeof prestationUpdateBasicDataSchema>;
export type PrestationUpdateStatusDTO = z.infer<typeof prestationUpdateStatusSchema>;


