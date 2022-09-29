import { useMutation, useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { IPeriodTeachingType } from 'types/interfaces/requests/IPeriod'
import { IDelete, IPost, TPaginatedResponse, TParams, TQueryParams } from 'types/interfaces/requests/IRequest'
import {
  IHeadTeacher,
  IHeadTeacherCourseBody,
  ISchoolTeacher,
  ISchoolTeacherSubject,
  ITeacherCourse,
  IToggleCurricularBody,
  IToggleExtracurricularBody,
  IUserCurricular,
  IUserExtracurricular,
  IUserSubjectCourse,
  IAddCourseSubjectBody,
  IUserSubject,
  IBlockAssignmentBody,
  IBlockAssignment
} from 'types/interfaces/requests/ISchoolTeacher'
import { apiClient } from 'utils/ApiClient'

type TBaseParams = {
  periodId: TGenericId
  userId: TGenericId
}

type TTeacherSubjectParams = TBaseParams & { schoolId: TGenericId }

type TSubjectCoursesParams = TBaseParams & { schoolTeachingTypeId: TGenericId }

const endpoints = {
  headTeachers: (schoolId: TGenericId, periodId: TGenericId) => `/schools/${schoolId}/${periodId}/head-teachers`,
  addHeadTeacher: (courseId: TGenericId) => `/schools/head-teacher/${courseId}`,
  schoolTeachers: (schoolId: TGenericId, periodId: TGenericId) => `/blocks_assignmen/${schoolId}/${periodId}/workers/count`,
  teacherSubjects: (schoolId: TGenericId, periodId: TGenericId, userId: TGenericId) =>
    `/users_subjects/types_teachings/${schoolId}/${periodId}/${userId}`,
  teacherCourses: (schoolId: TGenericId, periodId: TGenericId, userId: TGenericId) => `/users_subjects_courses/${schoolId}/${periodId}/${userId}`,
  toggleCurricular: '/users_subjects/subject',
  toggleExtracurricular: '/users_subjects/extracurricular',
  addCourseToUserSubject: (schoolId: TGenericId) => `/users_subjects_courses/${schoolId}`,
  deleteCourseToUserSubject: (courseId: TGenericId) => `/users_subjects_courses/${courseId}`,
  teacherSchedules: (schoolId: TGenericId, periodId: TGenericId, userId: TGenericId) =>
    `/blocks_assignmen/schedules/${schoolId}/${periodId}/${userId}`,
  teacherSubjectCourses: (periodId: TGenericId, userId: TGenericId, schoolTeachingTypeId: TGenericId) =>
    `/blocks_assignmen/teachers/${periodId}/${userId}/${schoolTeachingTypeId}`,
  blockAssignment: '/blocks_assignmen'
}

export const useHeadTeacherQueries = (schoolId: TGenericId, periodId: TGenericId, queryParams?: TQueryParams) => {
  const endpoint = endpoints.headTeachers(schoolId, periodId)
  const list = useQuery([endpoint], () => apiClient.get<IHeadTeacher[]>({ endpoint, queryParams }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useSchoolTeacherQueries = (schoolId: TGenericId, periodId: TGenericId, queryParams?: TQueryParams) => {
  const endpoint = endpoints.schoolTeachers(schoolId, periodId)
  const list = useQuery([endpoint], () => apiClient.get<TPaginatedResponse<ISchoolTeacher>>({ endpoint, queryParams }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useTeacherSubjectQueries = ({ schoolId, periodId, userId }: TTeacherSubjectParams) => {
  const endpoint = endpoints.teacherSubjects(schoolId, periodId, userId)
  const list = useQuery([endpoint], () => apiClient.get<ISchoolTeacherSubject[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useTeacherCourseQueries = ({ schoolId, periodId, userId }: TTeacherSubjectParams) => {
  const endpoint = endpoints.teacherCourses(schoolId, periodId, userId)
  const list = useQuery([endpoint], () => apiClient.get<ITeacherCourse[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useTeacherScheduleQueries = ({ schoolId, periodId, userId }: TTeacherSubjectParams) => {
  const endpoint = endpoints.teacherSchedules(schoolId, periodId, userId)
  const list = useQuery([endpoint], () => apiClient.get<IPeriodTeachingType[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useSubjectCoursesQueries = ({ periodId, userId, schoolTeachingTypeId }: TSubjectCoursesParams) => {
  const endpoint = endpoints.teacherSubjectCourses(periodId, userId, schoolTeachingTypeId)
  const list = useQuery([endpoint], () => apiClient.get<IUserSubject[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useAddHeadTeacherMutation = () => {
  return useMutation(({ id, body, method }: TParams<IHeadTeacherCourseBody>) => {
    const endpoint = endpoints.addHeadTeacher(id as string)
    return apiClient.mutation<IHeadTeacher, IHeadTeacherCourseBody>({
      endpoint,
      body,
      method
    })
  })
}

export const useToggleCurricularMutation = () => {
  return useMutation(({ body, method }: TParams<IToggleCurricularBody>) => {
    const endpoint = endpoints.toggleCurricular
    return apiClient.mutation<IUserCurricular, IToggleCurricularBody>({
      endpoint,
      body,
      method
    })
  })
}

export const useToggleExtracurricularMutation = () => {
  return useMutation(({ body, method }: TParams<IToggleExtracurricularBody>) => {
    const endpoint = endpoints.toggleExtracurricular
    return apiClient.mutation<IUserExtracurricular, IToggleExtracurricularBody>({
      endpoint,
      body,
      method
    })
  })
}

export const useAddCourseSubjectMutation = (schoolId: TGenericId) => {
  return useMutation(({ body, method }: TParams<IAddCourseSubjectBody>) => {
    const endpoint = endpoints.addCourseToUserSubject(schoolId)
    return apiClient.mutation<Partial<IUserSubjectCourse>, IAddCourseSubjectBody>({
      endpoint,
      body,
      method
    })
  })
}

export const useDeleteCourseSubjectMutation = () => {
  return useMutation(({ id }: IDelete) => {
    const endpoint = endpoints.deleteCourseToUserSubject(id)
    return apiClient.delete({ endpoint })
  })
}

export const useBlockAssigmentMutation = () => {
  return useMutation(({ body }: IPost<IBlockAssignmentBody>) => {
    const endpoint = endpoints.blockAssignment
    return apiClient.post<IBlockAssignment, IBlockAssignmentBody>({
      endpoint,
      body
    })
  })
}
