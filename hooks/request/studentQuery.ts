import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { IPut, TPaginatedResponse, TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { ISchoolUser, ISchoolUserBody, IStudentUser } from 'types/interfaces/requests/IUser'
import { apiClient } from 'utils/ApiClient'

type TStudentQueries = {
  schoolId: TGenericId
  periodId: TGenericId
  queryParams: TQueryParams
}

const endpoints = {
  students: (schoolId: TGenericId, periodId: TGenericId) => `/schools/${schoolId}/${periodId}/students/count`,
  student: (schoolId: TGenericId, periodId: TGenericId, studentId?: TGenericId) => `/schools/${schoolId}/${periodId}/student/${studentId}`,
  addStudent: (schoolId: TGenericId) => `/schools/${schoolId}/add-student`,
  editStudent: (schoolId: TGenericId) => `/schools/${schoolId}/edit-student`,
  activate: (schoolId: TGenericId, studentId: TGenericId) => `/schools/${schoolId}/${studentId}/activate`,
  deactivate: (schoolId: TGenericId, studentId: TGenericId) => `/schools/${schoolId}/${studentId}/deactivate`,
  notify: (schoolId: TGenericId) => `/templates/acces-to-system-one/${schoolId}/students`,
  studentCourses: (schoolId: TGenericId, periodId: TGenericId) => `/schools/${schoolId}/${periodId}`
}

export const useStudentQueries = ({ schoolId, periodId, queryParams = {} }: TStudentQueries) => {
  const endpoint = `${endpoints.students(schoolId, periodId)}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<TPaginatedResponse<IStudentUser>>({ endpoint, queryParams }), {
    select: (data) => data
  })
  useLoader(list)

  return list
}

export const useStudentQuery = (schoolId: TGenericId, periodId: TGenericId, studentId?: TGenericId) => {
  const endpoint = `${endpoints.student(schoolId, periodId, studentId)}`
  const request = useQuery([endpoint, studentId], () => apiClient.get<IStudentUser>({ endpoint }), { select: (data) => data, enabled: !!studentId })
  useLoader(request)

  return request
}

export const useStudentMutation = (schoolId: string) => {
  return useMutation(({ method, body }: TParams<ISchoolUserBody> & { method: 'POST' | 'PUT' }) => {
    const endpoint = {
      POST: endpoints.addStudent(schoolId),
      PUT: endpoints.editStudent(schoolId)
    }

    return apiClient.mutation<ISchoolUser, ISchoolUserBody>({ endpoint: `${endpoint[method]}`, method, body })
  })
}

export const useStudentActivate = (schoolId: TGenericId) => {
  return useMutation(({ id }: IPut<ISchoolUser>) => apiClient.put({ endpoint: endpoints.activate(schoolId, id as string) }))
}

export const useStudentDeactivate = (schoolId: TGenericId) => {
  return useMutation(({ id }: IPut<ISchoolUser>) => apiClient.put({ endpoint: endpoints.deactivate(schoolId, id as string) }))
}

export const useStudentNotifyMutation = () => {
  return useMutation(({ id }: IPut<ISchoolUser>) => apiClient.mutation({ endpoint: endpoints.notify(id as string), method: 'GET' }))
}
