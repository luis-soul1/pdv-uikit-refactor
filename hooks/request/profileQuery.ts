import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { ISchoolRoleModuleAccess, ISchoolRolesModuleActionAccess } from 'types/interfaces/requests/IModule'
import { ISchoolRolesPageAccess, ISchoolRolesPageActionAccess } from 'types/interfaces/requests/IPage'
import { IProfile, IProfileAccess, IProfileBody } from 'types/interfaces/requests/IProfile'
import { TParams, TQueryParams, IPut } from 'types/interfaces/requests/IRequest'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  profiles: '/schools_roles',
  activate: (id: TGenericId) => `${endpoints.profiles}/${id}/activate`,
  deactivate: (id: TGenericId) => `${endpoints.profiles}/${id}/deactivate`,
  activatePlatformAccess: (accessId: TGenericId) => `/schools_roles_access/${accessId}/activate`,
  deactivatePlatormAccess: (accessId: TGenericId) => `/schools_roles_access/${accessId}/deactivate`,
  changeModuleAccess: (profileId: TGenericId, moduleId: TGenericId) => `/schools_roles/${profileId}/module-access/${moduleId}`,
  changeModuleActionAccess: (profileId: TGenericId, moduleId: TGenericId) => `/schools_roles/${profileId}/module-action-access/${moduleId}`,
  changePageAccess: (profileId: TGenericId, pageId: TGenericId) => `/schools_roles/${profileId}/page-access/${pageId}`,
  changeModulePageAccess: (profileId: TGenericId, pageId: TGenericId) => `/schools_roles/${profileId}/page-action-access/${pageId}`
}

export const useProfileQueries = (queryParams?: TQueryParams) => {
  const endpoint = `${endpoints.profiles}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<IProfile[]>({ endpoint, queryParams }), {
    select: (data) => data.map((info) => ({ ...info, id: info.id.toString() }))
  })
  useLoader(list)

  return list
}

export const useProfileQuery = (id: TGenericId) => {
  const endpoint = `${endpoints.profiles}${id ? `/${id}` : ''}`
  const request = useQuery([endpoint, id], () => apiClient.get<IProfileAccess>({ endpoint }), { select: (data) => data, enabled: !!id })
  useLoader(request)

  return request
}

export const useProfileMutation = () => {
  return useMutation(({ id, method, body }: TParams<IProfile>) =>
    apiClient.mutation<IProfile, IProfileBody>({ endpoint: `${endpoints.profiles}/${id ?? ''}`, method, body })
  )
}

export const useProfileActivate = () => {
  return useMutation(({ id, method }: TParams<IProfile>) => apiClient.mutation({ endpoint: endpoints.activate(id as string), method }))
}

export const useProfileDeactivate = () => {
  return useMutation(({ id, method }: TParams<IProfile>) => apiClient.mutation({ endpoint: endpoints.deactivate(id as string), method }))
}

export const useProfilePlatformActivate = () => {
  return useMutation(({ id, method }: TParams<IProfile>) => apiClient.mutation({ endpoint: endpoints.activatePlatformAccess(id as string), method }))
}

export const useProfilePlatformDeactivate = () => {
  return useMutation(({ id, method }: TParams<IProfile>) => apiClient.mutation({ endpoint: endpoints.deactivatePlatormAccess(id as string), method }))
}

export const useProfileModuleAccess = (profileId: TGenericId) => {
  return useMutation(({ id: moduleId, body }: IPut<ISchoolRoleModuleAccess>) =>
    apiClient.patch({ endpoint: endpoints.changeModuleAccess(profileId, moduleId), body })
  )
}

export const useProfileModuleActionAccess = (profileId: TGenericId) => {
  return useMutation(({ id: moduleId, body }: IPut<ISchoolRolesModuleActionAccess>) =>
    apiClient.patch({ endpoint: endpoints.changeModuleActionAccess(profileId, moduleId), body })
  )
}

export const useProfilePageAccess = (profileId: TGenericId) => {
  return useMutation(({ id: pageId, body }: IPut<ISchoolRolesPageAccess>) =>
    apiClient.patch({ endpoint: endpoints.changePageAccess(profileId, pageId), body })
  )
}

export const useProfilePageActionAccess = (profileId: TGenericId) => {
  return useMutation(({ id: pageId, body }: IPut<ISchoolRolesPageActionAccess>) =>
    apiClient.patch({ endpoint: endpoints.changeModulePageAccess(profileId, pageId), body })
  )
}
