import { useMutation } from 'react-query'

import { IPut } from 'types/interfaces/requests/IRequest'
import { ISchoolUser } from 'types/interfaces/requests/IUser'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  activate: (schoolRoleId: string) => `/users_schools_roles/${schoolRoleId}/activate`,
  deactivate: (schoolRoleId: string) => `/users_schools_roles/${schoolRoleId}/deactivate`
}

export const useUserSchoolRoleActivate = () => {
  return useMutation(({ id }: IPut<ISchoolUser>) => apiClient.put({ endpoint: endpoints.activate(id as string) }))
}

export const useUserSchoolRoleDeactivate = () => {
  return useMutation(({ id }: IPut<ISchoolUser>) => apiClient.put({ endpoint: endpoints.deactivate(id as string) }))
}
