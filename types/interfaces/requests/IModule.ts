import { TGenericId } from 'types/commons/types'
import { IAction } from 'types/interfaces/requests/IAction'
import { IPage } from 'types/interfaces/requests/IPage'
import { IPlatform } from 'types/interfaces/requests/IPlatform'

export interface IModule {
  active: boolean
  description: string
  icon: string
  id: TGenericId
  name: string
  platform_id: TGenericId
  url: string
  Platforms?: IPlatform[]
  Pages?: IPage[]
  ModulesHasActions?: IModuleHasActions[]
  SchoolRolesModuleAccess?: ISchoolRolesModuleAccess
}

export interface IModuleHasActions {
  action_id: TGenericId
  createdAt: string
  module_id: TGenericId
  updatedAt: string
  SchoolRolesModuleActionAccess?: ISchoolRolesModuleActionAccess
  Actions: IAction
}

export interface ISchoolRolesModuleAccess {
  active: boolean
  id: number
  module_id: number
  school_rol_id: number
}

export interface ISchoolRoleModuleAccess {
  id?: TGenericId
  active: boolean
}

export interface ISchoolRolesModuleActionAccess {
  school_rol_id: TGenericId
  module_id: TGenericId
  action_id: TGenericId
  active: boolean
}
