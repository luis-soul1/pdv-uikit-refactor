import { useState, useEffect } from 'react'

import Divider from '@mui/material/Divider'
import { useForm } from 'react-hook-form'

import InputField from '@Uikit/Forms/InputField'
import PdvButton from '@Uikit/PdvButton'
import { PdvIcons } from '@Uikit/PdvIcons'
import LoginScreen from 'components/Auth/LoginScreen'
import useLoader from 'hooks/useLoader'
import { IRecovery, IRecoveryResponse } from 'types/interfaces/requests/IAuth'
import { apiClient } from 'utils/ApiClient'
import { formatRut, validateRut, cleanRut } from 'utils/helpers'

type TMessage = {
  message: string
  type: 'success' | 'error'
}

const RecoveryForm = () => {
  const { isLoading, setIsLoading } = useLoader()
  const [recoveryMsg, setRecoveryMsg] = useState<TMessage>({ message: '', type: 'success' })
  const recoveryForm = useForm()

  const recoverPassword = async ({ username }: IRecovery) => {
    try {
      setIsLoading(true)
      const body = { username: cleanRut(username) }
      const { email } = await apiClient.mutation<IRecoveryResponse, IRecovery>({ endpoint: '/auth/forgot-password', method: 'POST', body })
      setRecoveryMsg({ message: `Se ha enviado un email a ${email} para restablecer la contraseña.`, type: 'success' })
    } catch (error) {
      setRecoveryMsg({ message: 'Usuario inválido o no existe', type: 'error' })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const subscription = recoveryForm.watch((data) => {
      const isAlreadyFormatted = data.username === formatRut(data.username)
      if (data.username && !isAlreadyFormatted) {
        recoveryForm.setValue('username', formatRut(data.username))
      }
    })

    return () => subscription.unsubscribe()
  }, [recoveryForm.watch])

  return (
    <LoginScreen>
      <div className="flex w-80 flex-col items-center justify-center">
        <p className="subtitle1 mb-3 text-center font-bold text-gray-500">¿Tienes problemas para iniciar sesión?</p>
        <p className="body1 mb-3 text-center text-gray-500">Ingresa tu usuario y te enviaremos un enlace para que recuperes el acceso a tu cuenta.</p>
        <span className="h-1 w-6 rounded bg-teal-500" />
        <form className="m-2 w-full p-2" onSubmit={recoveryForm.handleSubmit(recoverPassword)}>
          <InputField
            name="username"
            form={recoveryForm}
            className="my-2"
            inputProps={{ placeholder: 'Usuario', type: 'text' }}
            options={{ required: 'Debe ingresar el RUT', validate: (value) => validateRut(value) || 'Debe ingresar un rut válido' }}
          />

          <PdvButton type="submit" className="mt-6 mb-2 w-full" theme="teal-500" size="large" loading={isLoading} disabled={isLoading}>
            Recuperar
            <PdvIcons name="ArrowRight" className="ml-2" color="white" />
          </PdvButton>

          {recoveryMsg.message && (
            <span className={`body1 block pt-4 text-center ${recoveryMsg.type === 'success' ? 'text-teal-500' : 'text-rose-500'}`}>
              {recoveryMsg.message}
            </span>
          )}
        </form>

        <Divider className="my-4 w-full" />

        <PdvButton asLink href="/auth/login" className="my-6 w-full" theme="gray-500" variant="outlined" size="large" icon="ArrowLeft">
          Volver
        </PdvButton>
        <p className="body1 mt-5 text-gray-300">© Copyright Preuniversitario Pedro de Valdivia</p>
      </div>
    </LoginScreen>
  )
}

export default RecoveryForm
