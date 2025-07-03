import { useForm } from '@renderer/components/custom/Form'
import { registerUserForm } from '@renderer/core/configs/forms/user/registerUserForm'
import {
  CreateUser,
  registerUserSchema
} from '@renderer/core/configs/forms/user/registerUserSchema'
import {
  atLeastEightCharacters,
  atLeastOneNumberAndOneLowercase,
  atLeastOneSpecialCharacter,
  atLeastOneUppercase
} from '@renderer/core/constants/regex'
import { User } from '@renderer/services/userService/interfaces'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const useUserFormModal = ({ defaultValues }: { defaultValues?: User }) => {
  const [passwordWatch, setPasswordWatch] = useState('')

  const passwordRules = useMemo(() => {
    return [
      {
        message: 'Pelo menos 1 letra e 1 número',
        isValid: atLeastOneNumberAndOneLowercase.test(passwordWatch)
      },
      {
        message: 'Pelo menos 1 letra maiúscula',
        isValid: atLeastOneUppercase.test(passwordWatch)
      },
      {
        message: 'Pelo menos 1 caractere especial',
        isValid: atLeastOneSpecialCharacter.test(passwordWatch)
      },
      {
        message: 'Pelo menos 8 caracteres',
        isValid: atLeastEightCharacters.test(passwordWatch)
      }
    ]
  }, [passwordWatch])

  const { Form: UserForm, submitForm } = useForm<CreateUser>({
    fields: registerUserForm,
    schema: registerUserSchema(Boolean(defaultValues)),
    // watch: {
    //   watchList: ['password'],
    //   onStateChange: ({ state }) => {
    //     setPasswordWatch(state ?? '')
    //   }
    // },
    defaultValues: {
      role: defaultValues?.role ?? 'user',
      name: defaultValues?.name ?? '',
      spectrums: defaultValues?.spectrums[0] ?? '',
      username: defaultValues?.username ?? '',
      password: defaultValues?.password ?? '',
      confirmPassword: defaultValues?.password ?? '',
      personalIdentification: defaultValues?.personalIdentification ?? ''
    }
  })

  const handleSubmit = useCallback(
    (calback: (data: Omit<User, 'id'>) => void) => {
      submitForm((data) => {
        calback({
          role: data.role,
          name: data.name,
          username: data.username,
          password: data.password,
          personalIdentification: data.personalIdentification,
          spectrums: [data.spectrums]
        })
      })
    },
    [submitForm]
  )

  useEffect(() => {
    return () => {
      setPasswordWatch('')
    }
  }, [passwordWatch])

  return {
    UserForm,
    passwordRules,
    handleSubmit
  }
}
