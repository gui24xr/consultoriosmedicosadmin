import { z } from 'zod';

export const consultationServiceDTOSchema = z.object({
  id: z.string(),
  inService: z.boolean(),
  label: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  specialty: z.object({
    id: z.string(),
    name: z.string(),
  }),
  medic: z.object({
    id: z.string(),
    completeName: z.string(),
  }),
});

export const consultationServiceInputDTOSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  specialtyId:z.string(),
  medicId:z.string(),
});

export type ConsultationServiceDTO = z.infer<typeof consultationServiceDTOSchema>;3
export type ConsultationServiceInputDTO = z.infer<typeof consultationServiceInputDTOSchema>;


