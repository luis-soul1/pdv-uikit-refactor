import { useEffect } from 'react'

import { useSnackbar } from 'notistack'
import { UseMutationResult, UseQueryResult } from 'react-query'

import useLoader from './useLoader'

const useMutationAlert = <T, P>(
  request: UseMutationResult<T, unknown, P, unknown> | UseQueryResult<T, unknown>,
  actionAfterSuccess?: () => void,
  actionAfterError?: () => void
) => {
  const snackbar = useSnackbar()
  useLoader(request)

  useEffect(() => {
    if (request.isError) {
      actionAfterError && actionAfterError()
      snackbar.enqueueSnackbar('Hubo un error. Intentalo nuevamente', { variant: 'error' })
    }
    if (request.isSuccess) {
      actionAfterSuccess && actionAfterSuccess()
      snackbar.enqueueSnackbar('Cambios realizados exitosamente!', { variant: 'success' })
    }
  }, [request.isError, request.isSuccess])
}

export default useMutationAlert
