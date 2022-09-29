import { ITypeTeachingCategorie, ITypeTeachingLevel } from './ICommons'

export interface ITeachingType {
  id: string
  code: string
  name: string
  description: string | null
  type_teaching_level_id?: number
  TypeTeachingLevel: ITypeTeachingLevel
  TypesTeachingsCategories: ITypeTeachingCategorie | null
  active: boolean
}
