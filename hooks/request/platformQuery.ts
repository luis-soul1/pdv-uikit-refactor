import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { IPlatform } from 'types/interfaces/requests/IPlatform'
import { TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  platforms: '/platforms',
  activate: (id: number | string) => `${endpoints.platforms}/${id}/activate`,
  deactivate: (id: number | string) => `${endpoints.platforms}/${id}/deactivate`
}

export const usePlatformQueries = (queryParams?: TQueryParams) => {
  const endpoint = `${endpoints.platforms}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<IPlatform[]>({ endpoint, queryParams }), { select: (data) => data })
  useLoader(list)

  return list
}

export const usePlatformQuery = (id: number | string) => {
  const endpoint = `${endpoints.platforms}${id ? `/${id}` : ''}`
  const request = useQuery([endpoint, id], () => apiClient.get<IPlatform>({ endpoint }), { select: (data) => data, enabled: !!id })
  useLoader(request)

  return request
}

export const usePlatformMutation = () => {
  return useMutation(({ id, method, body }: TParams<IPlatform>) =>
    apiClient.mutation<IPlatform, IPlatform>({ endpoint: `${endpoints.platforms}/${id ?? ''}`, method, body })
  )
}

export const usePlatformActivate = () => {
  return useMutation(({ id, method }: TParams<IPlatform>) =>
    apiClient.mutation<IPlatform, IPlatform>({ endpoint: endpoints.activate(id as string), method })
  )
}

export const usePlatformDeactivate = () => {
  return useMutation(({ id, method }: TParams<IPlatform>) =>
    apiClient.mutation<IPlatform, IPlatform>({ endpoint: endpoints.deactivate(id as string), method })
  )
}
