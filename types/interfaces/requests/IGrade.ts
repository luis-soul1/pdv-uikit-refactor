import { ITypeTeachingLevel } from './ICommons'

export interface IGrade {
  id: string
  level: number
  description: string | null
  active: boolean
  type_teaching_level_id: number
  code: string
  TypeTeachingLevel: ITypeTeachingLevel
}
