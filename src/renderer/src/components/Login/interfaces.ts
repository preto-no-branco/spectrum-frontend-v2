import { z } from 'zod'
import { loginSchema } from './useLogin'

export type LoginFormData = z.infer<typeof loginSchema>

export type loginStatus = 'idle' | 'loading' | 'success'

export type StatusState =
  | { status: loginStatus; icon: string }
  | { status: 'error'; message: string; icon: string }
