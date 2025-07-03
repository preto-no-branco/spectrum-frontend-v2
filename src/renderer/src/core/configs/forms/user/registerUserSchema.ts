import { validatePassword } from '@renderer/core/constants/regex'
import { z } from 'zod'

export const registerUserSchema = (isUpdate?: boolean) => {
  const commounSchema = z
    .object({
      name: z.string({
        required_error: 'Digite um nome válido',
        invalid_type_error: 'Digite um nome válido'
      }),
      username: z.string({
        required_error: 'Nome de usuário obrigatório',
        invalid_type_error: 'Nome de usuário obrigatório'
      }),
      // position: z.string({
      //   required_error: 'Digite o cargo',
      //   invalid_type_error: 'Digite o cargo'
      // }),
      role: z.string({
        required_error: 'Nível de acesso obrigatório',
        invalid_type_error: 'Nível de acesso obrigatório'
      }),
      personalIdentification: z.string({
        required_error: 'Digite um identificador',
        invalid_type_error: 'Digite um identificador'
      }),
      spectrums: z.string({
        required_error: 'Spectrum obrigatório',
        invalid_type_error: 'Spectrum obrigatório'
      }),
      password: z
        .string({
          invalid_type_error: 'Senha inválida'
        })
        .optional()
        .refine(
          (data) => {
            if (data) {
              return validatePassword.test(data)
            }

            return true
          },
          {
            message: 'Digite uma senha válida'
          }
        ),
      confirmPassword: z
        .string({
          invalid_type_error: 'Confirme a senha'
        })
        .optional()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'As senhas devem ser iguais',
      path: ['confirmPassword']
    })

  if (isUpdate) {
    return commounSchema
  }

  return commounSchema
}

export type CreateUser = z.infer<ReturnType<typeof registerUserSchema>>
