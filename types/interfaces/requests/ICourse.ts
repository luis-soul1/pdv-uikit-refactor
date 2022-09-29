import { TGenericId } from 'types/commons/types'

import { ITeachingType } from './ITeachingType'

export interface ICourse {
  name: string
  letter: string
  active: true
  count_students: 4
  createdAt: Date
  updatedAt: Date
  createdBy: Date | null
  updatedBy: Date | null
  grade_id: TGenericId
  id: TGenericId
  period_id: TGenericId
  school_id: TGenericId
  type_teaching_id: TGenericId
  user_id: TGenericId
  year: string
  TypeTeaching: Partial<ITeachingType>
}

export interface UserCourse {
  active: boolean
  id: TGenericId
  Courses: ICourse | null
}
