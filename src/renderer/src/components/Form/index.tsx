import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@renderer/components/ui/button'
import { Input } from '@renderer/components/ui/input'
import { Select } from '@renderer/components/ui/select'
import { useEffect, useMemo } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { FormComponentProps } from './interface'

export function Form<T extends FieldValues>({
  fields,
  columns = 1,
  schema,
  defaultValues,
  onSubmit,
  children,
  watch
}: FormComponentProps<T>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch: hookFormWatch
  } = useForm<T>({
    resolver: schema && zodResolver(schema),
    defaultValues: defaultValues
  })

  const watchList = useMemo(() => {
    return watch?.watchList ?? []
  }, [watch])

  const watchSubscribes = hookFormWatch(watchList)

  useEffect(() => {
    if (watchSubscribes.length && watch) {
      watchSubscribes.forEach((field, index) => {
        watch?.onStateChange({ field: watchList[index], state: field })
      })
    }
  }, [watchSubscribes, watch, watchList])

  return (
    <form
      className={`grid gap-3`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {Object.entries(fields).map(([name, field]) => {
        const { inputType, colSpan, ...restField } = field
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
    </form>
  )
}
