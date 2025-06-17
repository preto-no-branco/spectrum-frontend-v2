import { useLogin } from './useLogin'
import { Controller, FormProvider } from 'react-hook-form'
import { Button } from '../ui/button'
import { CardContent, CardDescription, CardTitle } from '../ui/card'
import { LoginInput } from './LoginInput'
import eyeClosed from '@renderer/assets/icons/eye-closed.svg'
import eye from '@renderer/assets/icons/eye.svg'
import { cn } from '@renderer/lib/utils'

const Login = () => {
  const { form, onSubmit, hiddenPassword, togglePasswordVisibility, statusState, isSubmitEnabled } =
    useLogin()
  const { control, handleSubmit } = form

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-background-secondary border border-secondary rounded-[12px] flex flex-col items-center py-6 max-h-[37rem] max-w-[24.5rem] ">
          <CardContent className="space-y-4 flex flex-col gap-3 w-full">
            <h1 className="text-2xl font-semibold text-left text-secondary-foreground pb-2 ">
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
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <LoginInput
                    label="Nome de usuário"
                    inputProps={{
                      ...field,
                      placeholder: 'Ex: example.creatus'
                    }}
                    id="username"
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <LoginInput
                    label="Senha"
                    inputProps={{
                      ...field,
                      placeholder: 'Senha de acesso',
                      type: hiddenPassword ? 'password' : 'text'
                    }}
                    id="password"
                    icon={hiddenPassword ? eyeClosed : eye}
                    onClickIcon={togglePasswordVisibility}
                  />
                )}
              />
            </div>

            <Controller
              name="server"
              control={control}
              render={({ field }) => (
                <LoginInput
                  label="Servidor"
                  inputProps={{
                    ...field,
                    placeholder: 'Ex: localhost:8080',
                    disabled: statusState.status === 'loading'
                  }}
                  id="server"
                  icon={statusState.icon}
                />
              )}
            />

            <div className="py-4">
              <Button
                type="submit"
                className={`w-full py-4 ${!isSubmitEnabled ? 'bg-border-secondary !opacity-100' : ''}`}
                disabled={!isSubmitEnabled}
              >
                <span className={`${!isSubmitEnabled && 'text-content-secondary'}`}>Acessar</span>
              </Button>
            </div>
          </CardContent>
        </div>
      </form>
    </FormProvider>
  )
}

export default Login
