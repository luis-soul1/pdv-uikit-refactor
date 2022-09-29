import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { IModule } from 'types/interfaces/requests/IModule'
import { TPaginatedResponse, TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  modules: '/modules',
  changeModuleStatus: (id: number | string) => `/modules/${id}/change-status`
}

export const useModuleQueries = ({ queryParams = {}, allowFetch = true }: { queryParams?: TQueryParams; allowFetch?: boolean }) => {
  const endpoint = `${endpoints.modules}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<TPaginatedResponse<IModule>>({ endpoint, queryParams }), {
    select: (data) => data,
    enabled: allowFetch
  })
  useLoader(list)

  return list
}

export const useModuleQuery = ({ id, allowFetch = true }: { id: number | string; allowFetch?: boolean }) => {
  const endpoint = `${endpoints.modules}${id ? '/' + id : ''}`
  const item = useQuery([endpoint, id], () => apiClient.get<IModule>({ endpoint }), {
    select: (data) => data,
    enabled: allowFetch
  })
  useLoader(item)

  return item
}

export const useModuleMutation = () => {
  return useMutation(({ method, body }: TParams<IModule>) => apiClient.mutation<IModule, IModule>({ endpoint: endpoints.modules, method, body }))
}

export const useModuleStatus = () => {
  return useMutation(({ id, method }: TParams<IModule>) =>
    apiClient.mutation<IModule, IModule>({ endpoint: endpoints.changeModuleStatus(id as string), method })
  )
}
