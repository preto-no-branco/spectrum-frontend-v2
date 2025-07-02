import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Select } from '@renderer/components/ui/select'
import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react'
import { FieldValues, Path, PathValue, useForm as useHookForm } from 'react-hook-form'
import { FormComponentProps } from './interface'

type OmitedFormProps = 'schema' | 'defaultValues' | 'control' | 'fields' | 'watch'
export type FormHandle<T = FieldValues> = {
  submitForm: (submit?: (data: FieldValues) => void) => void
  resetForm: () => void
  getValues: () => FieldValues
  setValue: (name: Path<T>, value: PathValue<T, Path<T>>) => void
}

function createFormFields<T extends FieldValues>({
  fields,
  defaultValues,
  schema
}: {
  fields: FormComponentProps<T>['fields']
  schema?: FormComponentProps<T>['schema']
  defaultValues?: FormComponentProps<T>['defaultValues']
}) {
  return forwardRef<FormHandle<T>, Omit<FormComponentProps<T>, OmitedFormProps>>(function Form(
    { columns = 1, onSubmit, children, showSubmitButton = false },
    ref
  ) {
    const {
      handleSubmit,
      control,
      formState: { errors },
      // watch: hookFormWatch,
      reset,
      setValue,
      getValues
    } = useHookForm<T>({
      resolver: schema && zodResolver(schema),
      defaultValues: defaultValues
    })

    const externalSubmitForm = useCallback(
      (submit?: (data: T) => void) => {
        if (submit) {
          handleSubmit(submit)()
          return
        }

        if (onSubmit) {
          handleSubmit(onSubmit)()
        }
      },
      [handleSubmit, onSubmit]
    )

    useImperativeHandle(
      ref,
      () => ({
        submitForm: externalSubmitForm,
        resetForm: () => {
          reset()
        },
        getValues: () => {
          return getValues()
        },
        setValue: (name: Path<T>, value: PathValue<T, Path<T>>) => {
          setValue(name, value)
        }
      }),
      [externalSubmitForm, reset, setValue, getValues]
    )

    return (
      <form
        className="grid gap-3"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
        }}
      >
        {Object.entries(fields).map(([name, field]) => {
          const { inputType, colSpan, ...restField } = field

          if (inputType === 'custom') {
            const Component = field.component
            return (
              <div key={name} style={{ gridColumn: `span ${colSpan ?? 1}` }}>
                <Component
                  control={control}
                  name={String(name)}
                  {...field}
                  style={{ gridColumn: `span ${colSpan ?? 1}` }}
                />
              </div>
            )
          }

          if (inputType === 'select') {
            return (
              <Select
                key={name}
                control={control}
                name={String(name)}
                label={field.label}
                options={field.options}
                {...restField}
                errorMessage={errors[name]?.message?.toString()}
                containerProps={{
                  style: {
                    gridColumn: `span ${colSpan ?? 1}`
                  }
                }}
              />
            )
          }

          if (inputType === 'checkbox') {
            return <input key={name} type="checkbox" />
          }

          return (
            <Input
              key={name}
              control={control}
              name={String(name)}
              {...restField}
              errorMessage={errors[name]?.message?.toString()}
              containerProps={{
                style: {
                  gridColumn: `span ${colSpan ?? 1}`
                }
              }}
            />
          )
        })}

        {children && <div style={{ gridColumn: `span ${columns}` }}>{children}</div>}
        {showSubmitButton && (
          <Button
            type="submit"
            style={{
              gridColumn: `span ${columns}`
            }}
            onClick={() => {
              if (onSubmit) {
                handleSubmit(onSubmit)()
              }
            }}
          >
            Submit
          </Button>
        )}
      </form>
    )
  })
}

export function useForm<T extends FieldValues>(props: {
  fields: FormComponentProps<T>['fields']
  schema?: FormComponentProps<T>['schema']
  defaultValues?: FormComponentProps<T>['defaultValues']
}) {
  const formRef = useRef<FormHandle<T>>(null)

  const FormComponent = useMemo(() => {
    return createFormFields<T>({
      fields: props.fields,
      schema: props.schema,
      defaultValues: props.defaultValues
    })
  }, [props.fields, props.schema, props.defaultValues])

  return {
    Form: (formProps: Omit<FormComponentProps<T>, OmitedFormProps>) => (
      <FormComponent ref={formRef} {...formProps} />
    ),
    submitForm: (submit?: (data: FieldValues) => void) => formRef.current?.submitForm(submit),
    resetForm: () => formRef.current?.resetForm(),
    getValues: () => formRef.current?.getValues()
  }
}
