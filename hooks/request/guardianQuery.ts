import { useMutation, useQuery, useQueryClient } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { IProfile } from 'types/interfaces/requests/IProfile'
import { IPost, IPut, TPaginatedResponse, TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { ISchoolUser, ISchoolUserBody, IGuardianStudents } from 'types/interfaces/requests/IUser'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  guardians: (schoolId: TGenericId) => `/schools/${schoolId}/empowereds/count`,
  guardian: (schoolId: TGenericId, guardianId?: TGenericId) => `/schools/${schoolId}/empowereds/${guardianId}`,
  addGuardian: (schoolId: TGenericId) => `/schools/${schoolId}/add-empowereds`,
  editGuardian: (schoolId: TGenericId) => `/schools/${schoolId}/edit-empowereds`,
  activate: (guardianId: TGenericId) => `/schools/empowereds/${guardianId}/activate`,
  deactivate: (guardianId: TGenericId) => `/schools/empowereds/${guardianId}/deactivate`,
  notify: (schoolId: TGenericId) => `/templates/acces-to-system-one/${schoolId}/empowereds`,
  uploadGuardians: (schoolId: TGenericId) => `/excel-reader/${schoolId}/template-empowereds`,
  guardianImportTemplate: `/excel-reader/template-empowereds`,
  guardianRoles: `/schools/empowereds/roles`,
  guardianStudents: (schoolId: TGenericId, guardianId?: TGenericId) => `/schools/${schoolId}/${guardianId}/student-empowered`,
  studentActivate: (schoolId: TGenericId, guardianId: TGenericId, studentId: TGenericId) =>
    `/schools/${schoolId}/${guardianId}/${studentId}/activate`,
  studentDeactivate: (schoolId: TGenericId, guardianId: TGenericId, studentId: TGenericId) =>
    `/schools/${schoolId}/${guardianId}/${studentId}/deactivate`
}

export const useGuardianQueries = (schoolId: string, queryParams?: TQueryParams) => {
  const endpoint = `${endpoints.guardians(schoolId)}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<TPaginatedResponse<ISchoolUser>>({ endpoint, queryParams }), {
    select: (data) => data
  })
  useLoader(list)

  return list
}

export const useGuardianRolesQueries = () => {
  const endpoint = `${endpoints.guardianRoles}`
  const list = useQuery([endpoint], () => apiClient.get<IProfile[]>({ endpoint }), {
    select: (data) => data
  })
  useLoader(list)

  return list
}

export const useGuardianStudentsQueries = (schoolId: TGenericId, guardianId?: TGenericId) => {
  const endpoint = `${endpoints.guardianStudents(schoolId, guardianId)}`
  const list = useQuery([endpoint], () => apiClient.get<IGuardianStudents[]>({ endpoint }), {
    select: (data) => data,
    enabled: !!schoolId && !!guardianId
  })
  useLoader(list)

  return list
}

export const useGuardianQuery = (schoolId: TGenericId, guardianId?: TGenericId) => {
  const endpoint = `${endpoints.guardian(schoolId, guardianId)}`
  const request = useQuery([endpoint, guardianId], () => apiClient.get<ISchoolUser>({ endpoint }), { select: (data) => data, enabled: !!guardianId })
  useLoader(request)

  return request
}

export const useGuardianMutation = (schoolId: string) => {
  return useMutation(({ method, body }: TParams<ISchoolUserBody> & { method: 'POST' | 'PUT' }) => {
    const endpoint = {
      POST: endpoints.addGuardian(schoolId),
      PUT: endpoints.editGuardian(schoolId)
    }

    return apiClient.mutation<ISchoolUser, ISchoolUserBody>({ endpoint: `${endpoint[method]}`, method, body })
  })
}

export const useGuardianActivate = () => {
  return useMutation(({ id }: IPut<ISchoolUser>) => apiClient.put({ endpoint: endpoints.activate(id as string) }))
}

export const useGuardianDeactivate = () => {
  return useMutation(({ id }: IPut<ISchoolUser>) => apiClient.put({ endpoint: endpoints.deactivate(id as string) }))
}

export const useGuardianStudentActivate = (schoolId: TGenericId) => {
  return useMutation(({ guardianId, studentId }: { guardianId: TGenericId; studentId: TGenericId }) =>
    apiClient.put({ endpoint: endpoints.studentActivate(schoolId, guardianId, studentId) })
  )
}

export const useGuardianStudentDeactivate = (schoolId: TGenericId) => {
  return useMutation(({ guardianId, studentId }: { guardianId: TGenericId; studentId: TGenericId }) =>
    apiClient.put({ endpoint: endpoints.studentDeactivate(schoolId, guardianId, studentId) })
  )
}

export const useGuardianNotifyMutation = () => {
  return useMutation(({ id }: IPut<ISchoolUser>) => apiClient.mutation({ endpoint: endpoints.notify(id as string), method: 'GET' }))
}

export const useGuardianImportMutation = (schoolId: string) => {
  return useMutation(({ body }: IPost<FormData>) => {
    return apiClient.postFile({ endpoint: endpoints.uploadGuardians(schoolId), body })
  })
}

export const useGuardianTemplateQuery = () => {
  const query = useQueryClient()
  const downloadFile = async () => {
    const endpoint = endpoints.guardianImportTemplate
    const response = await query.fetchQuery(endpoint, () => apiClient.queryFile({ endpoint }))
    return response
  }
  return downloadFile
}
