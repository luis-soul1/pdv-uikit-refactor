import { useMutation, useQuery } from 'react-query'

import { IHoliday } from 'types/interfaces/requests/IHoliday'
import { TParams, TPaginatedResponse, TQueryParams } from 'types/interfaces/requests/IRequest'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  holidays: '/holidays'
}

export const useHolidayQueries = (year: number, queryParams?: TQueryParams) => {
  const endpoint = `${endpoints.holidays}/${year}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<TPaginatedResponse<IHoliday>>({ endpoint, queryParams }), {
    select: (data) => data,
    enabled: !!year
  })

  return list
}

export const useHolidayMutation = () => {
  return useMutation(({ id, method, body }: TParams<IHoliday>) => {
    const endpoint = id ? `${endpoints.holidays}/${id}` : endpoints.holidays
    return apiClient.mutation<IHoliday, IHoliday>({ endpoint, method, body })
  })
}
