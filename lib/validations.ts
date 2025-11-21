import { z } from "zod"

export const createObjectSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre est requis")
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(100, "Le titre ne peut pas dépasser 100 caractères"),
  description: z
    .string()
    .min(1, "La description est requise")
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(500, "La description ne peut pas dépasser 500 caractères"),
})

export type CreateObjectInput = z.infer<typeof createObjectSchema>
