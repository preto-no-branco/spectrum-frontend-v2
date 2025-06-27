import { FormHandle, createForm } from '@renderer/components/custom/Form'
import { useCallback, useMemo, useRef } from 'react'
import { z } from 'zod'
import { SwitchAccessGroup } from './components/SwitchAccessGroup'
import { SwitchAllAccess } from './components/SwittchAllAccess'

const schema = z.object({
  accessName: z.string({
    required_error: 'Digite o nome do perfil de acesso',
    invalid_type_error: 'Digite o nome do perfil de acesso'
  }),
  allAccess: z.boolean().optional(),
  inspections: z
    .object({
      analyzer: z.boolean().optional(),
      history: z.boolean().optional(),
      undo: z.boolean().optional()
    })
    .optional(),
  analyzers: z
    .object({
      analyzer: z.boolean().optional(),
      history: z.boolean().optional(),
      undo: z.boolean().optional()
    })
    .optional(),
  users: z
    .object({
      view: z.boolean().optional(),
      create: z.boolean().optional(),
      block: z.boolean().optional(),
      unblock: z.boolean().optional()
    })
    .optional(),
  analyzer_categories: z
    .object({
      view: z.boolean().optional(),
      create: z.boolean().optional(),
      edit: z.boolean().optional(),
      delete: z.boolean().optional()
    })
    .optional(),
  configurations: z
    .object({
      report: z.boolean().optional(),
      edit: z.boolean().optional()
    })
    .optional()
})

export const useAccessFormModal = () => {
  const formRef = useRef<FormHandle>(null)

  const AccessForm = useMemo(() => {
    return createForm<z.infer<typeof schema>>({
      schema,
      fields: {
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
          component: (props) => <SwitchAllAccess {...props} />
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
          component: (props) => {
            return <SwitchAccessGroup {...props} />
          }
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
          component: (props) => <SwitchAccessGroup {...props} />
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
          component: (props) => <SwitchAccessGroup {...props} />
        },
        analyzer_categories: {
          inputType: 'custom',
          colSpan: 1,
          label: 'Categorias de análise',
          options: [
            { label: 'Visualizar', value: 'view' },
            { label: 'Criar', value: 'create' },
            { label: 'Editar', value: 'edit' },
            { label: 'Excluir', value: 'delete' }
          ],
          component: (props) => <SwitchAccessGroup {...props} />
        },
        configurations: {
          inputType: 'custom',
          label: 'Configurações',
          colSpan: 2,
          options: [
            { label: 'Emissão de relatórios', value: 'report' },
            { label: 'Editar', value: 'edit' }
          ],
          component: (props) => <SwitchAccessGroup {...props} />
        }
      }
    })
  }, [])

  const handleSubmit = useCallback(() => {
    const { current: form } = formRef
    form?.submitForm((data) => {
      console.log(data)
    })
  }, [formRef])

  return {
    AccessForm,
    formRef,
    handleSubmit
  }
}
