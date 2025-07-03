import { CustomColumnSwitch } from '@renderer/components/custom/switch/CustomColumnSwitch'
import { CustomRowSwitch } from '@renderer/components/custom/switch/CustomRowSwitch'
import { FormField } from '@renderer/core/@types/components/form'
import { AccessProfileCreate } from './accessProfileSchema'

export const accessProfileFields: FormField<AccessProfileCreate> = {
  accessName: {
    colSpan: 2,
    label: 'Nome do perfil de acesso',
    placeholder: 'Ex: Operador'
  },
  allAccess: {
    inputType: 'custom',
    colSpan: 2,
    label: 'Permitir tudo',
    options: [{ label: 'Permitir tudo', value: 'all' }],
    component: CustomRowSwitch
  },
  inspections: {
    inputType: 'custom',
    label: 'Inspeções',
    colSpan: 1,
    options: [
      { label: 'Analisar', value: 'analyzer' },
      { label: 'Visualizar histórico', value: 'history' },
      { label: 'Desfazer análise', value: 'undo' }
    ],
    component: CustomColumnSwitch
  },
  analyzers: {
    inputType: 'custom',
    colSpan: 1,
    label: 'Análise da imagem',
    options: [
      { label: 'Analisar', value: 'analyzer' },
      { label: 'Visualizar histórico', value: 'history' },
      { label: 'Desfazer análise', value: 'undo' }
    ],
    component: CustomColumnSwitch
  },
  users: {
    inputType: 'custom',
    colSpan: 1,
    label: 'Usuários',
    containerProps: { className: 'h-[400px]' },
    options: [
      { label: 'Visualizar', value: 'view' },
      { label: 'Adicionar', value: 'create' },
      { label: 'Bloquear', value: 'block' },
      { label: 'Desbloquear', value: 'unblock' }
    ],
    component: CustomColumnSwitch
  },
  analyzer_categories: {
    inputType: 'custom',
    colSpan: 1,
    label: 'Categorias de análise',
    options: [
      { label: 'Visualizar', value: 'view' },
      { label: 'Criar', value: 'create' },
      { label: 'Editar', value: 'update' },
      { label: 'Excluir', value: 'delete' }
    ],
    component: CustomColumnSwitch
  },
  configurations: {
    inputType: 'custom',
    label: 'Configurações',
    colSpan: 2,
    options: [
      { label: 'Emissão de relatórios', value: 'report' },
      { label: 'Editar', value: 'update' }
    ],
    component: CustomColumnSwitch
  }
}
