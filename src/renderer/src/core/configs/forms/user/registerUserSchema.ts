import { validatePassword } from '@renderer/core/constants/regex'
import { z } from 'zod'

export const registerUserSchema = z
  .object({
    fullName: z.string({
      required_error: 'Digite um nome válido',
      invalid_type_error: 'Digite um nome válido'
    }),
    username: z.string({
      required_error: 'Nome de usuário obrigatório',
      invalid_type_error: 'Nome de usuário obrigatório'
    }),
    position: z.string({
      required_error: 'Digite o cargo',
      invalid_type_error: 'Digite o cargo'
    }),
    accessLevel: z.string({
      required_error: 'Nível de acesso obrigatório',
      invalid_type_error: 'Nível de acesso obrigatório'
    }),
    id: z.string({
      required_error: 'Digite um identificador',
      invalid_type_error: 'Digite um identificador'
    }),
    password: z
      .string({
        required_error: 'Senha obrigatória',
        invalid_type_error: 'Senha obrigatória'
      })
      .refine(
        (data) => {
          return validatePassword.test(data)
        },
        {
          message: 'Digite uma senha válida'
        }
      ),
    confirmPassword: z.string({
      required_error: 'Confirme a senha',
      invalid_type_error: 'Confirme a senha'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword']
  })

export type CreateUser = z.infer<typeof registerUserSchema>
