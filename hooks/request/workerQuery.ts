import { useMutation, useQuery, useQueryClient } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { IPost, IPut, TPaginatedResponse, TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { ISchoolUser, ISchoolUserBody } from 'types/interfaces/requests/IUser'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  workers: (schoolId: TGenericId) => `/schools/${schoolId}/workers/count`,
  worker: (schoolId: TGenericId, workerId?: TGenericId) => `/schools/${schoolId}/workers/${workerId}`,
  addWorker: (schoolId: TGenericId) => `/schools/${schoolId}/add-worker`,
  editWorker: (schoolId: TGenericId) => `/schools/${schoolId}/edit-worker`,
  activate: (workerId: TGenericId) => `/schools/workers/${workerId}/activate`,
  deactivate: (workerId: TGenericId) => `/schools/workers/${workerId}/deactivate`,
  notify: (schoolId: TGenericId) => `/templates/acces-to-system-one/${schoolId}/workers`,
  uploadWorkers: (schoolId: TGenericId) => `/excel-reader/${schoolId}/template-workers`,
  workerImportTemplate: `/excel-reader/template-workers`
}

export const useWorkerQueries = (schoolId: string, queryParams?: TQueryParams) => {
  const endpoint = `${endpoints.workers(schoolId)}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<TPaginatedResponse<ISchoolUser>>({ endpoint, queryParams }), {
    select: (data) => data
  })
  useLoader(list)

  return list
}

export const useWorkerQuery = (schoolId: TGenericId, workerId?: TGenericId) => {
  const endpoint = `${endpoints.worker(schoolId, workerId)}`
  const request = useQuery([endpoint, workerId], () => apiClient.get<ISchoolUser>({ endpoint }), { select: (data) => data, enabled: !!workerId })
  useLoader(request)

  return request
}

export const useWorkerMutation = (schoolId: string) => {
  return useMutation(({ method, body }: TParams<ISchoolUserBody> & { method: 'POST' | 'PUT' }) => {
    const endpoint = {
      POST: endpoints.addWorker(schoolId),
      PUT: endpoints.editWorker(schoolId)
    }

    return apiClient.mutation<ISchoolUser, ISchoolUserBody>({ endpoint: `${endpoint[method]}`, method, body })
  })
}

export const useWorkerActivate = () => {
  return useMutation(({ id }: IPut<ISchoolUser>) => apiClient.put({ endpoint: endpoints.activate(id as string) }))
}

export const useWorkerDeactivate = () => {
  return useMutation(({ id }: IPut<ISchoolUser>) => apiClient.put({ endpoint: endpoints.deactivate(id as string) }))
}

export const useWorkerNotifyMutation = () => {
  return useMutation(({ id }: IPut<ISchoolUser>) => apiClient.mutation({ endpoint: endpoints.notify(id as string), method: 'GET' }))
}

export const useWorkerImportMutation = (schoolId: string) => {
  return useMutation(({ body }: IPost<FormData>) => {
    return apiClient.postFile({ endpoint: endpoints.uploadWorkers(schoolId), body })
  })
}

export const useWorkerTemplateQuery = () => {
  const query = useQueryClient()
  const downloadFile = async () => {
    const endpoint = endpoints.workerImportTemplate
    const response = await query.fetchQuery(endpoint, () => apiClient.queryFile({ endpoint }))
    return response
  }
  return downloadFile
}
