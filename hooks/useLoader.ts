import { useContext, useEffect } from 'react'

import { UseMutationResult, UseQueryResult } from 'react-query'

import { LoaderContext } from 'context/LoaderContext'

const useLoader = <T, P>(request?: UseMutationResult<T, unknown, P, unknown> | UseQueryResult<T, unknown>) => {
  const loader = useContext(LoaderContext)

  useEffect(() => {
    loader.isLoading !== request?.isLoading && request && loader.setIsLoading(request.isLoading)
  }, [request?.isLoading])

  return loader
}

export default useLoader
