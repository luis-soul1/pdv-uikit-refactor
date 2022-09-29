import { TGenericId } from 'types/commons/types'
import { IGrade } from 'types/interfaces/requests/IGrade'
import { ITeachingType } from 'types/interfaces/requests/ITeachingType'

export interface ISchoolSubjectStructure {
  Grades: IGrade[]
  TypesTeachings: ITeachingType
  active: boolean
  id: TGenericId
}

export interface ICurricularList extends ISchoolSubjectStructure {
  Subjects: ICurricularTeachingType[]
}

export interface ICurricularTeachingType {
  SchoolsTypesTeachingsSubjects: ICurricularSubject[]
  code: string
  id: TGenericId
  name: string
}

export interface ISchoolSubject {
  active: boolean
  grade_id: TGenericId
  school_id: TGenericId
  school_type_teaching_id: TGenericId
  Grades: Partial<IGrade>
}

export interface ICurricularSubject extends ISchoolSubject {
  subject_id: TGenericId
}

export interface ICurricularMutationStructure {
  school_type_teaching_id: TGenericId
  subject_id: TGenericId
}

export interface ICurricularToggleBody extends ICurricularMutationStructure {
  grade_id: TGenericId
  period_id: TGenericId
}

export interface IAddCurricularBody extends ICurricularMutationStructure {
  subject_id: number
  period_id: TGenericId
}

export interface IExtracurricularList extends ISchoolSubjectStructure {
  Extracurricular: ICurricularTeachingType[]
}

export interface IExtracurricularTeachingType {
  SchoolsTypesTeachingsSubjects: IExtracurricularSubject[]
  code: string
  id: TGenericId
  name: string
}

export interface IExtracurricularSubject extends ISchoolSubject {
  extracurricular_subject_id: TGenericId
}

export interface IExtracurricularMutationStructure {
  school_type_teaching_id: TGenericId
  extracurricular_subject_id: TGenericId
}

export interface IExtracurricularToggleBody extends IExtracurricularMutationStructure {
  grade_id: TGenericId
  period_id: TGenericId
}

export interface IAddExtracurricularBody {
  period_id: TGenericId
  school_type_teaching_id: TGenericId
  name: string
}
