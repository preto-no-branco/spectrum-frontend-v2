import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { ZodTypeAny } from 'zod'

export type FormFieldConfig = Record<
  string,
  {
    label: string
    placeholder?: string
    type?: string
    zod: ZodTypeAny
    default: any
    icon?: string
    onClickIcon?: () => void
    disabled?: boolean
  }
>

export function createForm<T extends FormFieldConfig>(fields: T) {
  const schemaShape = Object.fromEntries(
    Object.entries(fields).map(([key, config]) => [key, config.zod])
  )

  const defaultValues = Object.fromEntries(
    Object.entries(fields).map(([key, config]) => [key, config.default])
  )

  const schema = z.object(schemaShape)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onChange'
  })

  const fieldArray = useMemo(() => {
    return Object.entries(fields).map(([name, config]) => ({
      name,
      ...config
    }))
  }, [fields])

  // --- Teste de Types --- //
  type InferZodShape<T extends FormFieldConfig> = {
    [K in keyof T]: T[K]['zod']
  }

  type InferFormData<T extends FormFieldConfig> = z.infer<z.ZodObject<InferZodShape<T>>>

  type FormData = InferFormData<typeof fields>

  const formType: FormData = {} as FormData

  return { form, fields: fieldArray, formType }
}
