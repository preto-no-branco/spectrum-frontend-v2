import { z } from 'zod'

export const accessProfileSchema = z.object({
  accessName: z.string({
    required_error: 'Digite o nome do perfil de acesso',
    invalid_type_error: 'Digite o nome do perfil de acesso'
  }),
  allAccess: z.boolean().optional(),
  inspections: z
    .object({
      analyzer: z.boolean().optional(),
      history: z.boolean().optional(),
      undo: z.boolean().optional()
    })
    .optional(),
  analyzers: z
    .object({
      analyzer: z.boolean().optional(),
      history: z.boolean().optional(),
      undo: z.boolean().optional()
    })
    .optional(),
  users: z
    .object({
      view: z.boolean().optional(),
      create: z.boolean().optional(),
      block: z.boolean().optional(),
      unblock: z.boolean().optional()
    })
    .optional(),
  analyzer_categories: z
    .object({
      view: z.boolean().optional(),
      create: z.boolean().optional(),
      edit: z.boolean().optional(),
      delete: z.boolean().optional()
    })
    .optional(),
  configurations: z
    .object({
      report: z.boolean().optional(),
      edit: z.boolean().optional()
    })
    .optional()
})

export type AccessProfileCreate = z.infer<typeof accessProfileSchema>
