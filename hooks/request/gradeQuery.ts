import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { IGrade } from 'types/interfaces/requests//IGrade'
import { TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  grades: '/grades',
  teachingTypeLevel: (teachingTypeId: TGenericId) => `/grades/type-teaching-level/${teachingTypeId}`,
  activate: (id: number | string) => `${endpoints.grades}/${id}/activate`,
  deactivate: (id: number | string) => `${endpoints.grades}/${id}/deactivate`
}

export const useGradeQueries = (queryParams?: TQueryParams) => {
  const endpoint = `${endpoints.grades}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<IGrade[]>({ endpoint, queryParams }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useTeachingTypeLevelQueries = ({ teachingTypeId, enabled }: { teachingTypeId: TGenericId; enabled: boolean }) => {
  const endpoint = `${endpoints.teachingTypeLevel(teachingTypeId)}`
  const list = useQuery([endpoint], () => apiClient.get<IGrade[]>({ endpoint }), { select: (data) => data, enabled })
  useLoader(list)

  return list
}

export const useGradeMutation = () => {
  return useMutation(({ id, method, body }: TParams<IGrade>) =>
    apiClient.mutation<IGrade, IGrade>({ endpoint: `${endpoints.grades}/${id ?? ''}`, method, body })
  )
}

export const useGradeActivate = () => {
  return useMutation(({ id, method }: TParams<IGrade>) => apiClient.mutation<IGrade, IGrade>({ endpoint: endpoints.activate(id as string), method }))
}

export const useGradeDeactivate = () => {
  return useMutation(({ id, method }: TParams<IGrade>) =>
    apiClient.mutation<IGrade, IGrade>({ endpoint: endpoints.deactivate(id as string), method })
  )
}
