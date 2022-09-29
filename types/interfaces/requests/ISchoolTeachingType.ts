import { TGenericId } from 'types/commons/types'

import { ITeachingType } from './ITeachingType'

export interface ISchoolTeachingType {
  active: boolean
  id: TGenericId
  school_id: TGenericId
  type_teaching_id: TGenericId
  TypesTeachings: ITeachingType
}

export interface ISchoolTeachingTypeHoliday {
  id: TGenericId
  date_start: Date
  date_end: Date
  name: string
}

export interface ISchoolTeachingTypeHolidayBody {
  date_start: Date
  date_end: Date
  name: string
  school_type_teaching_id: TGenericId
  period_id: TGenericId
}
