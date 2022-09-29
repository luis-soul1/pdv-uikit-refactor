import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { ITeachingType } from 'types/interfaces/requests/ITeachingType'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  teachingTypes: '/types_teachings',
  activate: (id: number | string) => `${endpoints.teachingTypes}/${id}/activate`,
  deactivate: (id: number | string) => `${endpoints.teachingTypes}/${id}/deactivate`
}

export const useTeachingTypeQueries = (queryParams?: TQueryParams) => {
  const endpoint = `${endpoints.teachingTypes}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<ITeachingType[]>({ endpoint, queryParams }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useTeachingTypeMutation = () => {
  return useMutation(({ id, method, body }: TParams<ITeachingType>) =>
    apiClient.mutation<ITeachingType, ITeachingType>({ endpoint: `${endpoints.teachingTypes}/${id ?? ''}`, method, body })
  )
}

export const useTeachingTypeActivate = () => {
  return useMutation(({ id, method }: TParams<ITeachingType>) =>
    apiClient.mutation<ITeachingType, ITeachingType>({ endpoint: endpoints.activate(id as string), method })
  )
}

export const useTeachingTypeDeactivate = () => {
  return useMutation(({ id, method }: TParams<ITeachingType>) =>
    apiClient.mutation<ITeachingType, ITeachingType>({ endpoint: endpoints.deactivate(id as string), method })
  )
}
