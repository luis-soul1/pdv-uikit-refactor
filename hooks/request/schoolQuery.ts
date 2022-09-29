import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { TPaginatedResponse, TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { ISchool, ISchoolBody, ISchoolCourseBody } from 'types/interfaces/requests/ISchool'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  schools: '/schools/count',
  school: (id: TGenericId) => `/schools/${id}`,
  updateSchool: `/schools`,
  createCourse: (id: TGenericId) => `/schools/${id}/create-course`,
  activate: (id: number | string) => `/schools/${id}/activate`,
  deactivate: (id: number | string) => `/schools/${id}/deactivate`
}

export const useSchoolQueries = (queryParams?: TQueryParams) => {
  const endpoint = `${endpoints.schools}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<TPaginatedResponse<ISchool>>({ endpoint, queryParams }), {
    select: (data) => data
  })
  useLoader(list)

  return list
}

export const useSchoolQuery = (id: TGenericId) => {
  const endpoint = endpoints.school(id)
  const item = useQuery([endpoint], () => apiClient.get<ISchool>({ endpoint }), {
    select: (data) => data,
    enabled: !!id
  })
  useLoader(item)

  return item
}

export const useSchoolMutation = () => {
  return useMutation(({ body, method }: TParams<ISchoolBody>) =>
    apiClient.mutation<ISchool, ISchoolBody>({ endpoint: `${endpoints.updateSchool}`, body, method })
  )
}

export const useSchoolActivate = () => {
  return useMutation(({ id, method }: TParams<ISchool>) =>
    apiClient.mutation<ISchool, ISchool>({ endpoint: endpoints.activate(id as string), method })
  )
}

export const useSchoolDeactivate = () => {
  return useMutation(({ id, method }: TParams<ISchool>) =>
    apiClient.mutation<ISchool, ISchool>({ endpoint: endpoints.deactivate(id as string), method })
  )
}

export const useSchoolCourseMutation = (schoolId: TGenericId) => {
  return useMutation(({ body, method }: TParams<ISchoolCourseBody>) =>
    apiClient.mutation<ISchool, ISchoolCourseBody>({ endpoint: `${endpoints.createCourse(schoolId)}`, body, method })
  )
}
