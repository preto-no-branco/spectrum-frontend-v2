import { FormField } from '@renderer/core/@types/components/form'
import { CreateUser } from './registerUserSchema'

const positionsOptions = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Usuário', value: 'user' }
]

export const registerUserForm: FormField<CreateUser> = {
  fullName: {
    label: 'Nome completo'
  },
  username: {
    label: 'Nome de usuário'
  },
  position: {
    label: 'Cargo'
  },
  accessLevel: {
    label: 'Nível de acesso',
    inputType: 'select',
    options: positionsOptions
  },
  id: {
    label: 'Identificador',
    colSpan: 2
  },
  password: {
    label: 'Senha'
  },
  confirmPassword: {
    label: 'Confirmar senha'
  }
}
