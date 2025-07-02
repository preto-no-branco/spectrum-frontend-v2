import { FormField } from '@renderer/core/@types/components/form'
import { CreateUser } from './registerUserSchema'

const positionsOptions = [
  { label: 'Administrador', value: 'admin' },
  { label: 'Usuário', value: 'user' }
]

export const registerUserForm: FormField<CreateUser> = {
  fullName: {
    label: 'Nome completo',
    placeholder: 'Digite o nome do usuário'
  },
  username: {
    label: 'Nome de usuário',
    placeholder: 'Ex: joao.silva'
  },
  position: {
    label: 'Cargo',
    placeholder: 'Ex: Operador'
  },
  accessLevel: {
    label: 'Nível de acesso',
    inputType: 'select',
    placeholder: 'Selecione o nível',
    options: positionsOptions
  },
  id: {
    label: 'Identificador',
    placeholder: 'Código único do usuário',
    colSpan: 2
  },
  password: {
    label: 'Senha',
    placeholder: 'Digite uma senha'
  },
  confirmPassword: {
    label: 'Confirmar senha',
    placeholder: 'Confirme a senha'
  }
}
