import { useDebounce } from '@renderer/hooks/useDebounce'
import { useEffect, useState } from 'react'
import checkCircleGray from '@renderer/assets/icons/check-circle-gray.svg'
import checkCircleGreen from '@renderer/assets/icons/check-circle-green.svg'
import checkCircleError from '@renderer/assets/icons/check-cricle-error.svg'
import spinnerForm from '@renderer/assets/icons/spinnerForm.svg'
import eye from '@renderer/assets/icons/eye.svg'
import eyeClosed from '@renderer/assets/icons/eye-closed.svg'
import { z } from 'zod'
import { createForm } from '@renderer/utils/formGenerate'
import { showToast } from '@renderer/hooks/useToast'

export type loginStatus = 'idle' | 'loading' | 'success'
export interface StatusState {
  status: loginStatus | 'error'
  icon: string
  message?: string
}

export const statusIcons: Record<loginStatus | 'error', string> = {
  idle: checkCircleGray,
  loading: spinnerForm,
  success: checkCircleGreen,
  error: checkCircleError
}

const baseFields = {
  username: {
    label: 'Nome de usuário',
    placeholder: 'Example.creatus',
    zod: z.string().min(1),
    default: ''
  },
  password: {
    label: 'Senha',
    placeholder: 'Senha de acesso',
    type: 'password',
    zod: z.string().min(1),
    default: ''
  },
  server: {
    label: 'Servidor',
    placeholder: 'Ex: localhost:8080',
    zod: z.string().min(1),
    default: '',
    icon: statusIcons.idle
  }
} as const

export function useLogin() {
  const [statusState, setStatusState] = useState<StatusState>({
    status: 'idle',
    icon: statusIcons.idle
  })

  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const togglePasswordVisibility = () => setIsPasswordHidden((prev) => !prev)

  const { form, fields } = createForm(baseFields)

  const server = form.watch('server')
  const debounced = useDebounce(server, 500)

  useEffect(() => {
    if (!debounced) return

    setStatusState({ status: 'loading', icon: statusIcons.loading })
    setTimeout(() => {
      setStatusState({ status: 'success', icon: statusIcons.success })
    }, 1000)

    // setTimeout(() => {
    //   setStatusState({ status: 'error', icon: statusIcons.error, message: 'Servidor inválido' })
    // }, 1000)
  }, [debounced])

  const isValid = form.formState.isValid
  const submitDisable = !(isValid && statusState.status === 'success')

  const onSubmit = (data) => {
    console.log('submit', data)

    showToast('success', 'Tudo certo!', {
      description: 'Operação finalizada com sucesso.'
    })

    showToast('error', 'Erro ao salvar', {
      description: 'Verifique os campos e tente novamente.'
    })
    showToast('success', 'Tudo certo!', {})

    showToast('error', 'Erro ao salvar', {})
  }

  const updatedFields = fields.map((f) => {
    if (f.name === 'server') {
      return { ...f, icon: statusState.icon }
    }

    if (f.name === 'password') {
      return {
        ...f,
        type: isPasswordHidden ? 'password' : 'text',
        icon: isPasswordHidden ? eyeClosed : eye,
        onClickIcon: togglePasswordVisibility
      }
    }

    return f
  })

  return {
    form,
    fields: updatedFields,
    onSubmit,
    submitDisable,
    statusState
  }
}
