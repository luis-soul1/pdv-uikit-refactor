import { TGenericId } from 'types/commons/types'
import { IAction } from 'types/interfaces/requests/IAction'
import { IModule } from 'types/interfaces/requests/IModule'

export interface IPage {
  description?: string
  id: TGenericId
  name: string
  url: string
  active?: boolean
  module_id?: TGenericId
  Modules?: IModule
  PagesHasActions?: IPageHasActions[]
  SchoolRolesPageAccess?: ISchoolRolesPageAccess
}

export interface IPageHasActions {
  action_id: TGenericId
  createdAt: string
  page_id: TGenericId
  updatedAt: string
  SchoolRolesPageActionAccess?: ISchoolRolesPageActionAccess
  Actions: IAction
}

export interface ISchoolRolesPageActionAccess {
  school_rol_id: TGenericId
  page_id: TGenericId
  action_id: TGenericId
  active: boolean
}

export interface ISchoolRolesPageAccess {
  accessType: string
  id?: TGenericId
  page_id: TGenericId
  school_rol_id: TGenericId
}
