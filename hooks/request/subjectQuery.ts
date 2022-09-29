import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TPaginatedResponse, TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { ISubject } from 'types/interfaces/requests/ISubject'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  list: '/subjects/count',
  subject: '/subjects',
  activate: (id: number | string) => `/subjects/${id}/activate`,
  deactivate: (id: number | string) => `/subjects/${id}/deactivate`
}

export const useSubjectQueries = (queryParams?: TQueryParams, enabled?: boolean) => {
  const endpoint = `${endpoints.list}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<TPaginatedResponse<ISubject>>({ endpoint, queryParams }), {
    select: (data) => data,
    enabled
  })
  useLoader(list)

  return list
}

export const useSubjectMutation = () => {
  return useMutation(({ id, method, body }: TParams<ISubject>) =>
    apiClient.mutation<ISubject, ISubject>({ endpoint: `${endpoints.subject}/${id ?? ''}`, method, body })
  )
}

export const useSubjectActivate = () => {
  return useMutation(({ id, method }: TParams<ISubject>) =>
    apiClient.mutation<ISubject, ISubject>({ endpoint: endpoints.activate(id as string), method })
  )
}

export const useSubjectDeactivate = () => {
  return useMutation(({ id, method }: TParams<ISubject>) =>
    apiClient.mutation<ISubject, ISubject>({ endpoint: endpoints.deactivate(id as string), method })
  )
}
