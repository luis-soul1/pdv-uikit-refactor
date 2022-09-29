import { TGenericId } from 'types/commons/types'

export interface ISubscriptions {
  active: true
  id: TGenericId
  name: string
  SchoolSubscription: ISchoolSubscription | null
}

export interface ISchoolSubscription {
  active: boolean
  id: TGenericId
  start: Date
  end: Date
}

export interface ISchoolSubscriptionBody {
  id?: TGenericId
  platform_id: TGenericId
  start: Date
  end: Date
}
