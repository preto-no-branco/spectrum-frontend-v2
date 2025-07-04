import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Nome de usuário é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
  server: z.string().min(1, 'Servidor é obrigatório')
})

export type LoginFormData = z.infer<typeof loginSchema>

export type loginStatus = 'idle' | 'loading' | 'success'

export type StatusState =
  | { status: loginStatus; icon: string }
  | { status: 'error'; message: string; icon: string }
