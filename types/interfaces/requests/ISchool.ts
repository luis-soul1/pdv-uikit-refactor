import { TGenericId } from 'types/commons/types'

import { ICommune, IProvince, IRegion } from './ICommons'
import { ISchoolTeachingType } from './ISchoolTeachingType'

export interface ISchoolStructure {
  address: string
  commune_id: TGenericId
  email: string
  id: TGenericId
  mobile: string
  name: string
  province_id: TGenericId
  rbd: string
  region_id: TGenericId
  rut: string
  telephone: string
  type_establishment_id: TGenericId
  web: string
}

export interface ISchool extends ISchoolStructure {
  active: boolean
  badge: string
  createdAt: string
  createdBy: string
  description: string
  dgv_rbd: string
  logo: string
  photo: string
  updatedAt: string
  updatedBy: string
  Commune: ICommune
  Region: IRegion
  Province: IProvince
  SchoolsTypesTeachings: ISchoolTeachingType[]
  TypesEstablishments: ITypesEstablishments
}

export interface ISchoolBody extends Partial<ISchoolStructure> {
  SchoolsTypesTeachings?: Partial<ISchoolTeachingType>[]
}

export interface ITypesEstablishments {
  id: TGenericId
  name: string
  decription: string
  active: boolean
  createdBy: string
  updatedBy: string
  createdAt: string
  updatedAt: string
}

export interface ISchoolCourseBody {
  letter: string
  grade_id: TGenericId
  period_id: TGenericId
  type_teaching_id: TGenericId
}
