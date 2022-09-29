import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { IScheduleDayBlockBody, IScheduleDaysBlockBody, ITeachingTypeSchedule, ScheduleCloneBody } from 'types/interfaces/requests/IPeriod'
import { IPut, IPost, TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import { ISchoolTeachingType, ISchoolTeachingTypeHoliday, ISchoolTeachingTypeHolidayBody } from 'types/interfaces/requests/ISchoolTeachingType'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  schoolTeachingTypes: (schoolId: TGenericId) => `/schools/${schoolId}/types-teachings`,
  addSchoolTeachingType: (schoolId: TGenericId) => `/schools/${schoolId}/add-type-teaching`,
  activate: (schoolTeachingTypeId: TGenericId) => `/schools/type-teaching/${schoolTeachingTypeId}/activate`,
  deactivate: (schoolTeachingTypeId: TGenericId) => `/schools/type-teaching/${schoolTeachingTypeId}/deactivate`,
  teachingTypeHolidays: (schoolTeachingTypeId: TGenericId, periodId: TGenericId) =>
    `/schools_types_teachings_holidays/${schoolTeachingTypeId}/${periodId}`,
  holiday: '/schools_types_teachings_holidays',
  scheduleBlockConfig: '/schools_types_teachings_schedules',
  toggleScheduleDay: (dayId: TGenericId) => `/schedules_days/${dayId}/deactive-or-active`,
  toggleScheduleDayBlocks: (dayId: TGenericId) => `/schedules_days/${dayId}/toggle-blocks`,
  addBlocksToDays: '/schedules_days_blocks/replicate',
  cloneSchedule: '/schools_types_teachings_schedules/clone'
}

export const useSchoolTeachingTypeQueries = (schoolTeachingTypeId: TGenericId, queryParams?: TQueryParams) => {
  const endpoint = endpoints.schoolTeachingTypes(schoolTeachingTypeId)
  const list = useQuery([endpoint], () => apiClient.get<ISchoolTeachingType[]>({ endpoint, queryParams }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useHolidaysQueries = (schoolTeachingTypeId: TGenericId, periodId: TGenericId) => {
  const endpoint = endpoints.teachingTypeHolidays(schoolTeachingTypeId, periodId)
  const list = useQuery([endpoint], () => apiClient.get<ISchoolTeachingTypeHoliday[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useSchoolTeachingTypeMutation = () => {
  return useMutation(({ id, body }: IPost<Partial<ISchoolTeachingType>> & { id: string }) =>
    apiClient.post<ISchoolTeachingType, Partial<ISchoolTeachingType>>({ endpoint: `${endpoints.addSchoolTeachingType(id)}`, body })
  )
}

export const useHolidayMutation = () => {
  return useMutation(({ id, body, method }: TParams<ISchoolTeachingTypeHolidayBody>) => {
    const endpoint = id ? `${endpoints.holiday}/${id}` : endpoints.holiday
    return apiClient.mutation<ISchoolTeachingTypeHoliday, ISchoolTeachingTypeHolidayBody>({
      endpoint,
      body,
      method
    })
  })
}

export const useSchoolTeachingTypeActivate = () => {
  return useMutation(({ id }: IPut) => apiClient.put({ endpoint: endpoints.activate(id as string) }))
}

export const useSchoolTeachingTypeDeactivate = () => {
  return useMutation(({ id }: IPut) => apiClient.put({ endpoint: endpoints.deactivate(id as string) }))
}

export const useScheduleBlockConfigMutation = () => {
  return useMutation(({ body, method }: TParams<ITeachingTypeSchedule>) => {
    const endpoint = endpoints.scheduleBlockConfig
    return apiClient.mutation<ITeachingTypeSchedule, ITeachingTypeSchedule>({
      endpoint,
      body,
      method
    })
  })
}

export const useScheduleDayToggleMutation = () => {
  return useMutation(({ id }: IPut<ITeachingTypeSchedule>) => {
    const endpoint = endpoints.toggleScheduleDay(id)
    return apiClient.put<ITeachingTypeSchedule, ITeachingTypeSchedule>({
      endpoint
    })
  })
}

export const useScheduleDayBlocksToggleMutation = () => {
  return useMutation(({ id, body }: IPut<IScheduleDaysBlockBody>) => {
    const endpoint = endpoints.toggleScheduleDayBlocks(id)
    return apiClient.put<ITeachingTypeSchedule, IScheduleDaysBlockBody>({
      endpoint,
      body
    })
  })
}

export const useAddScheduleBlocksMutation = () => {
  return useMutation(({ body, method }: TParams<IScheduleDayBlockBody>) => {
    const endpoint = endpoints.addBlocksToDays
    return apiClient.mutation<ITeachingTypeSchedule, IScheduleDayBlockBody>({
      endpoint,
      body,
      method
    })
  })
}

export const useCloneScheduleMutation = () => {
  return useMutation(({ body, method }: TParams<ScheduleCloneBody>) => {
    const endpoint = endpoints.cloneSchedule
    return apiClient.mutation<ITeachingTypeSchedule, ScheduleCloneBody>({
      endpoint,
      body,
      method
    })
  })
}
