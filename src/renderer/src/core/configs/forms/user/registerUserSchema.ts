import { z } from 'zod'

export const registerUserSchema = z.object({
  fullName: z.string({
    required_error: 'Nome completo obrigatório',
    invalid_type_error: 'Nome completo obrigatório'
  }),
  username: z.string(),
  position: z.string(),
  accessLevel: z.string(),
  id: z.string(),
  password: z.string(),
  confirmPassword: z.string()
  //   email: z.string().email(),
  //   status: z.string(),
  //   lastAccess: z.string()
})

export type CreateUser = z.infer<typeof registerUserSchema>
