import { useLogin } from './useLogin'
import { Controller, FormProvider } from 'react-hook-form'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardTitle } from '../ui/card'
import { cn } from '@renderer/lib/utils'
import { Input } from '../ui/input'

const Login = () => {
  const { form, fields, onSubmit, submitDisable, statusState } = useLogin()

  const { control, handleSubmit } = form

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-background-secondary border border-secondary rounded-[12px] flex flex-col items-center py-6 max-h-[37rem] max-w-[24.5rem] ">
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
              {fields.map((field) => (
                <Controller
                  key={field.name}
                  name={field.name}
                  control={control}
                  render={({ field: rhfField }) => (
                    <Input
                      id={field.name}
                      label={field.label}
                      icon={field.icon}
                      onClickIcon={field.onClickIcon}
                      type={field.type || 'text'}
                      className={cn('dark:bg-background pr-10')}
                      disabled={field.label === 'Servidor' && statusState.status === 'loading'}
                      placeholder={field.placeholder}
                      {...rhfField}
                    />
                  )}
                />
              ))}
            </div>

            <div className="py-2">
              <Button
                type="submit"
                className={`w-full py-4 ${submitDisable ? 'bg-border-secondary' : ''}`}
                disabled={submitDisable}
              >
                <span className={`${submitDisable && 'text-content-secondary'}`}>Acessar</span>
              </Button>
            </div>
          </CardContent>
        </div>
      </form>
    </FormProvider>
  )
}

export default Login
