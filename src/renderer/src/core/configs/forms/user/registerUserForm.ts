import { FormField } from '@renderer/core/@types/components/form'
import { CreateUser } from './registerUserSchema'

const positionsOptions = [
  { label: 'Administrador', value: 'ADMIN' },
  { label: 'Usuário', value: 'user' }
]

export const registerUserForm: FormField<CreateUser> = {
  name: {
    label: 'Nome completo',
    placeholder: 'Digite o nome do usuário'
  },
  username: {
    label: 'Nome de usuário',
    placeholder: 'Ex: joao.silva'
  },
  spectrums: {
    label: 'Spectrum',
    inputType: 'select',
    placeholder: 'Selecione o Spectrum',
    options: [{ label: 'Spectrum 1', value: '0000' }]
  },
  role: {
    label: 'Nível de acesso',
    inputType: 'select',
    placeholder: 'Selecione o nível',
    options: positionsOptions
  },
  personalIdentification: {
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
