import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { IAction } from 'types/interfaces/requests/IAction'
import { TPaginatedResponse, TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  actions: '/actions',
  chanageActionStatus: (id: number | string) => `/actions/${id}/change-status`
}

export const useActionQueries = (queryParams?: TQueryParams) => {
  const endpoint = `${endpoints.actions}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<TPaginatedResponse<IAction>>({ endpoint, queryParams }), {
    select: (data) => data
  })
  useLoader(list)

  return list
}

export const useActionMutation = () => {
  return useMutation(({ method, body }: TParams<IAction>) => apiClient.mutation<IAction, IAction>({ endpoint: endpoints.actions, method, body }))
}

export const useActionStatus = () => {
  return useMutation(({ id, method }: TParams<IAction>) =>
    apiClient.mutation<IAction, IAction>({ endpoint: endpoints.chanageActionStatus(id as string), method })
  )
}
