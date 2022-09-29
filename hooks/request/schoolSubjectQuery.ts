import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { IDelete, TParams } from 'types/interfaces/requests/IRequest'
import {
  IAddCurricularBody,
  ICurricularMutationStructure,
  ICurricularToggleBody,
  ICurricularList,
  ICurricularSubject,
  IExtracurricularSubject,
  IExtracurricularList,
  IAddExtracurricularBody,
  IExtracurricularToggleBody
} from 'types/interfaces/requests/ISchoolSubject'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  curricularList: (schoolId: TGenericId, periodId: TGenericId) => `/schools_types_teachings_subjects/subject/${schoolId}/${periodId}`,
  curricular: (schoolId: TGenericId) => `/schools_types_teachings_subjects/subject/${schoolId}`,
  toggleCurricular: (schoolId: TGenericId) => `/schools_types_teachings_subjects/subject/${schoolId}/activate-deactivate`,
  extracurricularList: (schoolId: TGenericId, periodId: TGenericId) => `/schools_types_teachings_subjects/extracurricular/${schoolId}/${periodId}`,
  addExtracurricular: (schoolId: TGenericId) => `/schools_types_teachings_subjects/extracurricular/${schoolId}`,
  deleteExtracurricular: (extracurricularId: TGenericId) => `/schools_types_teachings_subjects/extracurricular/${extracurricularId}`,
  toggleExtracurricular: (schoolId: TGenericId) => `/schools_types_teachings_subjects/extracurricular/${schoolId}/activate-deactivate`
}

export const useCurricularQueries = (schoolId: TGenericId, periodId: TGenericId) => {
  const endpoint = endpoints.curricularList(schoolId, periodId)
  const list = useQuery([endpoint], () => apiClient.get<ICurricularList[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useDeleteCurricularMutation = () => {
  return useMutation(({ id, body, method }: TParams<ICurricularMutationStructure>) => {
    const endpoint = endpoints.curricular(id as string)
    return apiClient.mutation<ICurricularSubject, ICurricularMutationStructure>({
      endpoint,
      body,
      method
    })
  })
}

export const useAddCurricularMutation = () => {
  return useMutation(({ id, body, method }: TParams<IAddCurricularBody>) => {
    const endpoint = endpoints.curricular(id as string)
    return apiClient.mutation<ICurricularSubject, IAddCurricularBody>({
      endpoint,
      body,
      method
    })
  })
}

export const useToggleCurricularMutation = () => {
  return useMutation(({ id, body, method }: TParams<ICurricularToggleBody>) => {
    const endpoint = endpoints.toggleCurricular(id as string)
    return apiClient.mutation<ICurricularSubject, ICurricularToggleBody>({
      endpoint,
      body,
      method
    })
  })
}

export const useExtracurricularQueries = (schoolId: TGenericId, periodId: TGenericId) => {
  const endpoint = endpoints.extracurricularList(schoolId, periodId)
  const list = useQuery([endpoint], () => apiClient.get<IExtracurricularList[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useDeleteExtracurricularMutation = () => {
  return useMutation(({ id }: IDelete) => {
    return apiClient.delete({ endpoint: endpoints.deleteExtracurricular(id as string) })
  })
}

export const useAddExtracurricularMutation = () => {
  return useMutation(({ id, body, method }: TParams<IAddExtracurricularBody>) => {
    const endpoint = endpoints.addExtracurricular(id as string)
    return apiClient.mutation<IExtracurricularSubject, IAddExtracurricularBody>({
      endpoint,
      body,
      method
    })
  })
}

export const useToggleExtracurricularMutation = () => {
  return useMutation(({ id, body, method }: TParams<IExtracurricularToggleBody>) => {
    const endpoint = endpoints.toggleExtracurricular(id as string)
    return apiClient.mutation<IExtracurricularSubject, IExtracurricularToggleBody>({
      endpoint,
      body,
      method
    })
  })
}
