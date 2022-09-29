import { TGenericId } from 'types/commons/types'

import { IUser } from './IUser'

export interface ITeachingType {
  name: string
  description: string
  code: string
}

export interface IHeadTeacher {
  id: TGenericId
  active: boolean
  TypesTeachings: ITeachingType & {
    Courses: ITeachingTypeCourse[]
  }
}

export interface ITeachingTypeCourse extends ICourse {
  HeadTeacher: IUser
}

export interface ICourse {
  id: TGenericId
  name: string
  letter: string
  year: string
}

export interface IHeadTeacherCourseBody {
  user_id: TGenericId
}

export interface ISchoolTeacher {
  id: TGenericId
  names: string
  maternal_surnames: string
  paternal_surnames: string
  UserSchool: {
    id: TGenericId
  }
  count_courses: number
  count_subjects: number
}

export interface ISchoolTeacherSubject {
  id: TGenericId
  active: boolean
  TypesTeachings: {
    name: string
    code: string
  }
  Subjects: ITeacherCurricular[]
  Extracurricular: ITeacherExtracurricular[]
}

export interface ISubject {
  id: TGenericId
  code: string | null
  name: string
}

export interface ITeacherCurricular extends ISubject {
  UserSubject: IUserCurricular | null
}

export interface ITeacherExtracurricular extends ISubject {
  UserSubject: IUserExtracurricular | null
}

export interface IUserSubjectStructure {
  type_teaching_id: TGenericId
  user_id: TGenericId
  active: boolean
  period_id: TGenericId
}

export interface IUserCurricular extends IUserSubjectStructure {
  subject_id: TGenericId
}

export interface IUserExtracurricular extends IUserSubjectStructure {
  extracurricular_id: TGenericId
}

export interface IToggleCommonBody {
  period_id: TGenericId
  type_teaching_id: TGenericId
  user_id: TGenericId
}

export interface IToggleCurricularBody extends IToggleCommonBody {
  subject_id: TGenericId
}

export interface IToggleExtracurricularBody extends IToggleCommonBody {
  extracurricular_id: TGenericId
}

export interface ITeacherCourse {
  Courses: ICourse[]
  TypesTeachings: ITeachingType
  UsersSubjects: IUserSubject[]
  id: TGenericId
  active: boolean
}

export interface IUserSubject {
  id: TGenericId
  active: boolean
  Subjects: ISubject | null
  ExtracurricularSubjects: ISubject | null
  UsersSubjectsCourses: IUserSubjectCourse[]
}

export interface IUserSubjectCourse {
  id: TGenericId
  user_subject_id: TGenericId
  course_id: TGenericId
  Courses: ICourse
}

export interface IAddCourseSubjectBody {
  course_id: TGenericId
  user_subject_id: TGenericId
}

export interface IBlockAssignment {
  id: TGenericId
  subject_id: TGenericId | null
  extracurricular_id: TGenericId | null
  user_id: TGenericId
  user_subject_course_id: TGenericId
  schedule_day_block_id: TGenericId
  active: boolean
  colour: string
  Subjects: ISubject | null
  ExtracurricularSubjects: ISubject | null
  UsersSubjectsCourses: {
    id: TGenericId
    Courses: ICourse
  }
}

export interface IBlockAssignmentBody {
  user_id: TGenericId
  user_subject_course_id: TGenericId
  colour: string
  subject_id: TGenericId
  schedule_day_block_id: TGenericId
  active: boolean
}
