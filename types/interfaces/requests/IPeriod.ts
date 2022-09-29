import { TGenericId } from 'types/commons/types'

import { IBlockAssignment } from './ISchoolTeacher'
import { ITeachingType } from './ITeachingType'

export interface IPeriod {
  active: boolean
  createdAt: Date
  id: TGenericId
  school_id: TGenericId
  updatedAt: Date | null
  year: number
}

export interface IPeriodTeachingType {
  TypesTeachings: ITeachingType
  SchoolTypeTeachingPeriod: IPeriodTypeRelation | null
  SchoolTypeTeachingSchedule: ITeachingTypeSchedule
  SemestersPeriodsDates?: IPeriodDates[]
  active: boolean
  id: TGenericId
  school_id: TGenericId
}

export interface IPeriodTypeRelation {
  active: boolean
  id: TGenericId
  type_period_id: TGenericId
  TypesPeriods: IPeriodType
}

export interface IPeriodType {
  id: TGenericId
  months: 6 | 3
  name: 'Semestre' | 'Trimestre'
}

export interface ITeachingTypeSchedule {
  SchedulesBlocksConfigs: IScheduleBlockConfig
  SchedulesDurationsConfigs: IScheduleTimeConfig
  SchedulesDays: IScheduleDays[]
  active: boolean
  id: TGenericId
  schedule_block_id: TGenericId
  schedule_duration_id: TGenericId
}

export interface IScheduleBlockConfig {
  block: number
}

export interface IScheduleTimeConfig {
  time: number
}

export interface IScheduleDays {
  SchedulesDaysConfigs: IScheduleDayConfig
  SchedulesDaysBlocks: IScheduleDayBlock[]
  id: TGenericId
  active: boolean
}

export interface IScheduleDayConfig {
  alias: string
  name: string
}

export interface IScheduleDayBlock {
  active: boolean
  block: number
  id: TGenericId
  schedule_day_id: TGenericId
  time_end: string
  time_start: string
  BlockAssignment?: IBlockAssignment
}

export interface IPeriodDates {
  date_end: Date | null
  date_start: Date | null
  SemestersPeriods: { name: string }
  id: TGenericId
}

export interface ICreatePeriodTypeBody {
  school_type_teaching_id: TGenericId
  type_period_id: TGenericId
  period_id: TGenericId
}

export interface IScheduleDaysBlockBody {
  ScheduleDayBlocks: IScheduleDayBlock[]
}

export interface IScheduleDayBlockBody {
  SchedulesDays: ScheduleDaysReplicateBody[]
  block: Partial<IScheduleDayBlock>
}

export interface ScheduleDaysReplicateBody {
  schedule_day_id: TGenericId
}

export interface ScheduleCloneBody {
  from_school_type_teaching_id: TGenericId
  for_school_type_teaching_id: TGenericId
  period_id: TGenericId
}
