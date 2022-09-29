import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { TQueryParams, IPut, IPost } from 'types/interfaces/requests/IRequest'
import { ISubscriptions, ISchoolSubscriptionBody } from 'types/interfaces/requests/ISubscription'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  subscriptions: (schoolId: TGenericId) => `/schools/${schoolId}/subscriptions`,
  subscription: (schoolId: TGenericId) => `/schools/${schoolId}/subscription`,
  addSubscription: (schoolId: TGenericId) => `/schools/${schoolId}/add-subscriptions`,
  activate: (schoolSubscriptionsId: number | string) => `/schools/subscription/${schoolSubscriptionsId}/activate`,
  deactivate: (schoolSubscriptionsId: number | string) => `/schools/subscription/${schoolSubscriptionsId}/deactivate`
}

export const useSubscriptionQueries = (id: string, queryParams?: TQueryParams) => {
  const endpoint = `${endpoints.subscriptions(id)}`
  const list = useQuery([endpoint, queryParams], () => apiClient.get<ISubscriptions[]>({ endpoint, queryParams }), {
    select: (data) => data
  })
  useLoader(list)

  return list
}

export const useSubscriptionMutation = () => {
  return useMutation(({ id, body }: IPut<ISchoolSubscriptionBody>) =>
    apiClient.put<ISchoolSubscriptionBody, ISchoolSubscriptionBody>({ endpoint: `${endpoints.subscription(id)}`, body })
  )
}

export const useAddSubscriptionMutation = () => {
  return useMutation(({ id, body }: IPost<ISchoolSubscriptionBody> & { id: string }) =>
    apiClient.post({ endpoint: endpoints.addSubscription(id), body })
  )
}

export const useSubscriptionActivate = () => {
  return useMutation(({ id }: IPut) => apiClient.put({ endpoint: endpoints.activate(id as string) }))
}

export const useSubscriptionDeactivate = () => {
  return useMutation(({ id }: IPut) => apiClient.put({ endpoint: endpoints.deactivate(id as string) }))
}
