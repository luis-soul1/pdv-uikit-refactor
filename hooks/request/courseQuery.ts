import { useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { ICourse } from 'types/interfaces/requests/ICourse'
import { TPaginatedResponse, TQueryParams } from 'types/interfaces/requests/IRequest'
import { apiClient } from 'utils/ApiClient'

type TStudentQueries = {
  schoolId: TGenericId
  periodId: number
  queryParams: TQueryParams
}

const endpoints = {
  courses: (schoolId: TGenericId, periodId: number) => `/schools/${schoolId}/${periodId}/courses/count`
}

export const useCourseQueries = ({ schoolId, periodId, queryParams = {} }: TStudentQueries) => {
  const endpoint = `${endpoints.courses(schoolId, periodId)}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<TPaginatedResponse<ICourse>>({ endpoint, queryParams }), {
    select: (data) => data,
    enabled: !!periodId
  })
  useLoader(list)

  return list
}
