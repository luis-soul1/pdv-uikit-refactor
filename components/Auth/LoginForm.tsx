import Link from 'next/link'
import { useState, useEffect } from 'react'

import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'

import InputField from '@Uikit/Forms/InputField'
import PdvButton from '@Uikit/PdvButton'
import { PdvIcons } from '@Uikit/PdvIcons'
import LoginScreen from 'components/Auth/LoginScreen'
import useLoader from 'hooks/useLoader'
import { ILogin } from 'types/interfaces/requests/IAuth'
import { formatRut, validateRut, cleanRut } from 'utils/helpers'

const LoginForm: React.FC = () => {
  const { isLoading, setIsLoading } = useLoader()
  const [loginErrorMsg, setLoginErrorMsg] = useState('')
  const loginForm = useForm()

  const login = async ({ username, password }: ILogin) => {
    try {
      setIsLoading(true)
      const response = await signIn('credentials', { username: cleanRut(username), password, redirect: false })
      if (response?.error) {
        setLoginErrorMsg(response.error)
        throw new Error(response.error)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const subscription = loginForm.watch((data) => {
      const isAlreadyFormatted = data.username === formatRut(data.username)
      if (data.username && !isAlreadyFormatted) {
        loginForm.setValue('username', formatRut(data.username))
      }
    })

    return () => subscription.unsubscribe()
  }, [loginForm.watch])

  return (
    <LoginScreen>
      <div className="flex w-80 flex-col items-center justify-center">
        <p className="h4 mb-3 text-gray-500">Bienvenido a</p>
        <span className="h-1 w-6 rounded bg-teal-500" />
        <h3 className="m-3 text-center font-semibold text-gray-500">
          Plataformas <br /> Educativas PDV
        </h3>

        <div className="flex items-center justify-center gap-3">
          <span className="h-6 w-6 rounded-full bg-teal-500" />
          <span className="h-6 w-6 rounded-full bg-rose-500" />
          <span className="h-6 w-6 rounded-full bg-orange-500" />
          <span className="h-6 w-6 rounded-full bg-green-500" />
        </div>

        <form className="m-2 w-full p-2" onSubmit={loginForm.handleSubmit(login)}>
          <InputField
            name="username"
            form={loginForm}
            className="my-2"
            inputProps={{ placeholder: 'Usuario', type: 'text' }}
            options={{ required: 'Debe ingresar el RUT', validate: (value) => validateRut(value) || 'Debe ingresar un rut válido' }}
          />
          <InputField
            name="password"
            form={loginForm}
            className="my-2"
            inputProps={{ placeholder: 'Contraseña', type: 'password' }}
            options={{ required: 'Debe ingresar su contraseña' }}
          />

          <PdvButton type="submit" className="my-6 w-full" theme="teal-500" size="large" loading={isLoading} disabled={isLoading}>
            Entrar
            <PdvIcons name="ArrowRight" className="ml-2" color="white" />
          </PdvButton>

          {loginErrorMsg && <span className="body1 block pb-8 text-center text-rose-500">{loginErrorMsg}</span>}

          <Link href="/auth/recuperar-contrasena">
            <a className="subtitle2 block text-center text-gray-500">Olvidaste tu contraseña?</a>
          </Link>
        </form>

        <p className="body1 mt-5 text-gray-300">© Copyright Preuniversitario Pedro de Valdivia</p>
      </div>
    </LoginScreen>
  )
}

export default LoginForm
