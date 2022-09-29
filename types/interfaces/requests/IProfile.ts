import { TGenericId } from 'types/commons/types'
import { IPlatform } from 'types/interfaces/requests/IPlatform'

export interface IProfile {
  active: boolean
  description?: string
  id: TGenericId
  name: string
}

export interface IProfileAccess {
  platforms: IPlatform[]
  schoolRole: IProfile & {
    SchoolsRolesAccess: ISchoolsRolesAccess[]
  }
}

export interface ISchoolsRolesAccess {
  id: TGenericId
  active: boolean
  platform_id: TGenericId
  Platforms: IPlatform
}

export interface IProfileBody extends IProfile {
  SchoolsRolesAccess?: ISchoolsRolesAccessCreate[]
}

export interface ISchoolsRolesAccessCreate {
  platform_id: number
  school_rol_id: number
}
