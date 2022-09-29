import { TGenericId } from 'types/commons/types'

import { ISubject } from './ISubject'
import { ITeachingType } from './ITeachingType'
import { IUser } from './IUser'

export interface ISchoolCourse {
  Users: IUser
  TypeTeaching: ITeachingType
  id: TGenericId
  name: string
  letter: string
  year: string
  school_id: TGenericId
  user_id: TGenericId
  active: boolean
  createdBy: Date | null
  updatedBy: Date | null
  createdAt: Date
  updatedAt: Date
  period_id: TGenericId
  type_teaching_id: TGenericId
  grade_id: TGenericId
  count_students: TGenericId
}

export interface ICourseStudents {
  id: TGenericId
  active: boolean
  Users: Partial<IUser>
}

export interface IStudentsBySubject {
  subjects: ISubject[]
  users: IStudentSubject[]
}

export interface IStudentSubject {
  id: TGenericId
  names: string
  paternal_surnames: string
  maternal_surnames: string
  Subjects: IUserSubject[]
}

export interface IUserSubject {
  course_id: TGenericId
  active: boolean
  subject_id: TGenericId
  user_id: TGenericId
}
