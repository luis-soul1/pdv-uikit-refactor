import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { ICreatePeriodTypeBody, IPeriod, IPeriodDates, IPeriodTeachingType } from 'types/interfaces/requests//IPeriod'
import { IPost, IPut, TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  periods: (schoolId: TGenericId) => `/schools/${schoolId}/periods`,
  createPeriod: (schoolId: TGenericId) => `/schools/${schoolId}/create-periods`,
  activate: (periodId: TGenericId) => `/periods/${periodId}/activate`,
  deactivate: (periodId: TGenericId) => `/periods/${periodId}/deactivate`,
  periodTeachingTypes: (schoolId: TGenericId, periodId: TGenericId | undefined) => `/schools_types_teachings_periods/${schoolId}/${periodId}`,
  createTeachingTypePeriod: (schoolId: TGenericId) => `/schools_types_teachings_periods/${schoolId}`,
  updatePeriodTypeDates: `/semesters_periods_dates`
}

export const usePeriodQueries = (schoolId: TGenericId, queryParams?: TQueryParams) => {
  const endpoint = endpoints.periods(schoolId)
  const list = useQuery([endpoint, queryParams], () => apiClient.get<IPeriod[]>({ endpoint, queryParams }), { select: (data) => data })
  useLoader(list)

  return list
}

export const usePeriodTeachingTypeQueries = (schoolId: TGenericId, periodId: TGenericId | undefined) => {
  const endpoint = endpoints.periodTeachingTypes(schoolId, periodId)
  const list = useQuery([endpoint], () => apiClient.get<IPeriodTeachingType[]>({ endpoint }), { select: (data) => data, enabled: !!periodId })
  useLoader(list)

  return list
}

export const usePeriodMutation = (schoolId: TGenericId) => {
  return useMutation(({ method, body }: TParams<Partial<IPeriod>>) =>
    apiClient.mutation<IPeriod, Partial<IPeriod>>({ endpoint: endpoints.createPeriod(schoolId), method, body })
  )
}

export const useTeachingTypePeriodMutation = (schoolId: TGenericId) => {
  return useMutation(({ body }: IPost<ICreatePeriodTypeBody>) =>
    apiClient.post<IPeriodTeachingType, ICreatePeriodTypeBody>({ endpoint: endpoints.createTeachingTypePeriod(schoolId), body })
  )
}

export const usePeriodTypeDateMutation = () => {
  return useMutation(({ body, method }: TParams<Partial<IPeriodDates>>) =>
    apiClient.mutation<IPeriodTeachingType, Partial<IPeriodDates>>({ endpoint: endpoints.updatePeriodTypeDates, body, method })
  )
}

export const usePeriodActivate = () => {
  return useMutation(({ id }: IPut) => apiClient.put({ endpoint: endpoints.activate(id as string) }))
}

export const usePeriodDeactivate = () => {
  return useMutation(({ id }: IPut) => apiClient.put({ endpoint: endpoints.deactivate(id as string) }))
}
