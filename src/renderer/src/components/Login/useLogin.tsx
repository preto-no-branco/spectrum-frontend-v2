import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useDebounce } from '@renderer/hooks/useDebounce'
import { LoginFormData, loginStatus, StatusState } from './interfaces'
import checkCircleGreen from '@renderer/assets/icons/check-circle-green.svg'
import checkCircleGray from '@renderer/assets/icons/check-circle-gray.svg'
import checkCircleError from '@renderer/assets/icons/check-cricle-error.svg'
import spinnerForm from '@renderer/assets/icons/spinnerForm.svg'

export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  server: z.string().min(1)
})

export const statusIcons: Record<loginStatus | 'error', string> = {
  idle: checkCircleGray,
  loading: spinnerForm,
  success: checkCircleGreen,
  error: checkCircleError
}

export const useLogin = () => {
  const [statusState, setStatusState] = useState<StatusState>({
    status: 'idle',
    icon: checkCircleGray
  })

  const [hiddenPassword, setHiddenPassword] = useState(true)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '', server: '' },
    mode: 'onChange'
  })

  const { isValid } = form.formState
  const isSubmitEnabled = isValid && statusState.status === 'success'

  const serverValue = form.watch('server')
  const debouncedServer = useDebounce(serverValue, 500)

  const checkServer = async () => {
    setStatusState({ status: 'loading', icon: statusIcons.loading })

    await new Promise((r) => setTimeout(r, 2000))
    setStatusState({ status: 'success', icon: statusIcons.success })

    /*   await new Promise((r) => setTimeout(r, 2000))
    setStatusState({ status: 'error', message: 'Servidor inválido', icon: statusIcons.error })  */
  }

  useEffect(() => {
    if (!debouncedServer) return
    checkServer()
  }, [debouncedServer])

  const onSubmit = (data: LoginFormData) => {
    console.log('Form enviado:', data)
  }

  const togglePasswordVisibility = () => {
    setHiddenPassword((prev) => !prev)
  }

  return {
    form,
    onSubmit,
    hiddenPassword,
    togglePasswordVisibility,
    statusState,
    isSubmitEnabled
  }
}
