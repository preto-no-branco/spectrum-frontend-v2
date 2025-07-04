import { useLogin } from './useLogin'
import { Controller, FormProvider } from 'react-hook-form'
import { cn } from '@renderer/lib/utils'
import { CardContent, CardDescription, CardTitle } from '@renderer/components/ui/card'
import { Input } from '@renderer/components/ui/input'
import { Button } from '@renderer/components/ui/button'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'

const Login = () => {
  const {
    form,
    fields,
    onSubmit,
    submitDisable,
    statusState,
    isPasswordHidden,
    togglePasswordVisibility
  } = useLogin()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = form

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case 'password':
        return isPasswordHidden ? VscEyeClosed : VscEye
      case 'server':
        return statusState.icon
      default:
        return null
    }
  }

  const getFieldType = (field: (typeof fields)[number]) => {
    if (field.name === 'password') {
      return isPasswordHidden ? 'password' : 'text'
    }
    return field.type
  }

  const getFieldOnClick = (fieldName: string) => {
    switch (fieldName) {
      case 'password':
        return togglePasswordVisibility
      default:
        return undefined
    }
  }

  const isFieldDisabled = (fieldName: string) => {
    return fieldName === 'server' && statusState.status === 'testing'
  }

  const getFieldClassName = (fieldName: string) => {
    const baseClasses = 'dark:bg-background pr-10'

    // Add error styling if field has errors
    if (errors[fieldName as keyof typeof errors]) {
      return cn(baseClasses, 'border-red-500 focus:border-red-500')
    }

    // Add success styling for server field when connection is successful
    if (fieldName === 'server' && statusState.status === 'success') {
      return cn(baseClasses, 'border-green-500 focus:border-green-500')
    }

    // Add loading styling for server field when testing
    if (fieldName === 'server' && statusState.status === 'testing') {
      return cn(baseClasses, 'border-blue-500 focus:border-blue-500')
    }

    return cn(baseClasses)
  }

  return (
    <div className="flex items-center justify-center w-full h-screen max-h-full">
      <FormProvider {...form}>
        <form onSubmit={onSubmit}>
          <div className="bg-background-secondary border border-secondary rounded-[12px] flex flex-col items-center py-6 max-h-[37rem] max-w-[24.5rem]">
            <CardContent className="space-y-4 flex flex-col gap-3 w-full">
              <h1 className="text-2xl font-semibold text-left text-secondary-foreground pb-2">
                CREATUS SECURITY
              </h1>
              <CardTitle className="font-bold">Autenticação</CardTitle>
              <CardDescription className={cn('text-[14px] leading-[20px] font-normal font-plex')}>
                Entre com suas credenciais para acessar o sistema.
              </CardDescription>

              <div className="w-full px-2 py-[2px]">
                <div className="w-full h-[1px] bg-border opacity-25" />
              </div>

              <div className="flex flex-col gap-3 pb-4">
                {fields.map((field) => {
                  const FieldIcon = getFieldIcon(field.name)

                  return (
                    <div key={field.name} className="space-y-1">
                      <Controller
                        name={field.name}
                        control={control}
                        render={({ field: controlledField }) => (
                          <Input
                            id={controlledField.name}
                            label={field.label}
                            rightIcon={
                              FieldIcon ? (
                                <div
                                  onClick={getFieldOnClick(field.name)}
                                  className={cn(
                                    'cursor-pointer',
                                    field.name === 'password' &&
                                      'hover:opacity-70 transition-opacity'
                                  )}
                                >
                                  <FieldIcon />
                                </div>
                              ) : undefined
                            }
                            type={getFieldType(field)}
                            className={getFieldClassName(field.name)}
                            disabled={isFieldDisabled(field.name)}
                            placeholder={field.placeholder}
                            {...controlledField}
                          />
                        )}
                      />

                      {/* Only show form validation errors, not server status messages */}
                      {errors[field.name as keyof typeof errors] && (
                        <p className="text-sm text-red-500 px-1">
                          {errors[field.name as keyof typeof errors]?.message}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Submit Button */}
              <div className="py-2">
                <Button
                  type="submit"
                  className={cn(
                    'w-full py-4 transition-colors',
                    submitDisable && 'bg-border-secondary cursor-not-allowed'
                  )}
                  disabled={submitDisable}
                >
                  <span
                    className={cn('transition-colors', submitDisable && 'text-content-secondary')}
                  >
                    {statusState.status === 'testing' ? 'Verificando...' : 'Acessar'}
                  </span>
                </Button>
              </div>
            </CardContent>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default Login
