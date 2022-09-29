import { useMutation, useQuery, useQueryClient } from 'react-query'

import useLoader from 'hooks/useLoader'
import { TGenericId } from 'types/commons/types'
import { IPost, TParams } from 'types/interfaces/requests/IRequest'
import { ISchoolCourse, IStudentsBySubject, IUserSubject } from 'types/interfaces/requests/ISchoolCourse'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  courses: (schoolId: TGenericId, periodId: TGenericId) => `/schools/${schoolId}/${periodId}/courses`,
  courseStudents: (courseId: TGenericId) => `/schools/course/${courseId}/students`,
  studentsBySubjects: (courseId: TGenericId) => `/courses/${courseId}/students-by-subjects`,
  courseStudentActivate: (courseId: TGenericId) => `/schools/course/${courseId}/activate`,
  courseStudentDeactivate: (studentId: TGenericId) => `/schools/course/${studentId}/deactivate`,
  studentSubjectActivate: `/courses/students-by-subjects`,
  studentSubjectDeactivate: `/courses/students-by-subjects`,
  uploadCourses: (schoolId: TGenericId) => `/excel-reader/${schoolId}/template-studenst`,
  courseImportTemplate: `/excel-reader/template-studenst`,
  uploadSchedule: (schoolId: TGenericId) => `/excel-reader/${schoolId}/template-schedule`,
  scheduleImportTemplate: `/excel-reader/template-schedule`
}

export const useSchoolCourseQueries = (schoolId: TGenericId, periodId: TGenericId) => {
  const endpoint = endpoints.courses(schoolId, periodId)
  const list = useQuery([endpoint], () => apiClient.get<ISchoolCourse[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useCourseStudentsQueries = (courseId: TGenericId) => {
  const endpoint = endpoints.courseStudents(courseId)
  const list = useQuery([endpoint], () => apiClient.get<ISchoolCourse[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useStudentsBySubjectQueries = (courseId: TGenericId) => {
  const endpoint = endpoints.studentsBySubjects(courseId)
  const list = useQuery([endpoint], () => apiClient.get<IStudentsBySubject>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useCourseStudentActivate = () => {
  return useMutation(({ id, method }: TParams<ISchoolCourse>) =>
    apiClient.mutation<ISchoolCourse, ISchoolCourse>({ endpoint: endpoints.courseStudentActivate(id as string), method })
  )
}

export const useCourseStudentDeactivate = () => {
  return useMutation(({ id, method }: TParams<ISchoolCourse>) =>
    apiClient.mutation<ISchoolCourse, ISchoolCourse>({ endpoint: endpoints.courseStudentDeactivate(id as string), method })
  )
}

export const useStudentSubjectActivate = () => {
  return useMutation(({ body }: IPost<IUserSubject>) =>
    apiClient.post<IUserSubject, IUserSubject>({ endpoint: endpoints.studentSubjectActivate, body })
  )
}

export const useStudentSubjectDeactivate = () => {
  return useMutation(({ body }: IPost<IUserSubject>) =>
    apiClient.post<IUserSubject, IUserSubject>({ endpoint: endpoints.studentSubjectDeactivate, body })
  )
}

export const useSchoolCourseImportMutation = (schoolId: string) => {
  return useMutation(({ body }: IPost<FormData>) => {
    return apiClient.postFile({ endpoint: endpoints.uploadCourses(schoolId), body })
  })
}

export const useSchoolCourseTemplateQuery = () => {
  const query = useQueryClient()
  const downloadFile = async () => {
    const endpoint = endpoints.courseImportTemplate
    const response = await query.fetchQuery(endpoint, () => apiClient.queryFile({ endpoint }))
    return response
  }
  return downloadFile
}

export const useScheduleImportMutation = (schoolId: string) => {
  return useMutation(({ body }: IPost<FormData>) => {
    return apiClient.postFile({ endpoint: endpoints.uploadSchedule(schoolId), body })
  })
}

export const useScheduleTemplateQuery = () => {
  const query = useQueryClient()
  const downloadFile = async () => {
    const endpoint = endpoints.scheduleImportTemplate
    const response = await query.fetchQuery(endpoint, () => apiClient.queryFile({ endpoint }))
    return response
  }
  return downloadFile
}
