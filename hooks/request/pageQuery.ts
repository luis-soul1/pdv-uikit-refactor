import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { IPage } from 'types/interfaces/requests/IPage'
import { TPaginatedResponse, TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  pages: '/pages',
  chanagePageStatus: (id: number | string) => `/pages/${id}/change-status`
}

export const usePagesQueries = ({ queryParams = {}, allowFetch = true }: { queryParams?: TQueryParams; allowFetch?: boolean }) => {
  const endpoint = `${endpoints.pages}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<TPaginatedResponse<IPage>>({ endpoint, queryParams }), {
    select: (data) => data,
    enabled: allowFetch
  })
  useLoader(list)

  return list
}

export const usePageQuery = ({ id, allowFetch = true }: { id: number | string; allowFetch?: boolean }) => {
  const endpoint = `${endpoints.pages}${id ? '/' + id : ''}`
  const item = useQuery([endpoint, id], () => apiClient.get<IPage>({ endpoint }), {
    select: (data) => data,
    enabled: allowFetch
  })
  useLoader(item)

  return item
}

export const usePageMutation = () => {
  return useMutation(({ method, body }: TParams<IPage>) => apiClient.mutation<IPage, IPage>({ endpoint: endpoints.pages, method, body }))
}

export const usePageStatus = () => {
  return useMutation(({ id, method }: TParams<IPage>) =>
    apiClient.mutation<IPage, IPage>({ endpoint: endpoints.chanagePageStatus(id as string), method })
  )
}
