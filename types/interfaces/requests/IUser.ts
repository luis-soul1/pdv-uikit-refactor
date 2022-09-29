import { TGenericId } from 'types/commons/types'
import { UserCourse } from 'types/interfaces/requests/ICourse'
import { IProfile } from 'types/interfaces/requests/IProfile'

export interface IUserStructure {
  names: string
  maternal_surnames: string
  paternal_surnames: string
  rut: string
}

export interface iUserSession extends IUserStructure {
  Rol: {
    id: number
    name: string
  }
  UsersSchools: []
}

export interface IUser extends IUserStructure {
  active: boolean
  address: string
  commune_id: TGenericId
  createdAt: string
  createdBy: string | null
  date_of_birth: Date | null
  digital_signature: string | null
  email: string
  gender_id: TGenericId | null
  id: TGenericId
  is_empowered: boolean
  mobile: string
  profession: string | null
  profile_picture: string | null
  province_id: TGenericId | null
  region_id: TGenericId | null
  rol_id: TGenericId
  study_house: string | null
  telephone: string | null
  updatedAt: string
  updatedBy: string | null
}

export interface IUserSchoolAccess {
  access_to_system: boolean
  active: boolean
  id: TGenericId
  school_id: TGenericId
  user_id: TGenericId
  UsersSchoolsRoles: IUsersSchoolsRoles[]
}

export interface IUsersSchoolsRoles {
  active: boolean
  id: TGenericId
  SchoolRol: Partial<IProfile>
}

export interface IImportUsersBody {
  file: FormDataEntryValue
  system_access: FormDataEntryValue
}

export interface ISchoolUser extends IUser {
  UserSchool: IUserSchoolAccess
}

export interface ISchoolUserBody extends IUser {
  SchoolRoles: { school_rol_id: TGenericId }[]
}

export interface IStudentUser extends ISchoolUser {
  UserCouser: UserCourse | null
  Empowereds: IStudentGuardians[]
}

export interface IGuardianStudents {
  id: TGenericId
  active: boolean
  User: IStudentUser
}

export interface IStudentGuardians {
  id: TGenericId
  active: boolean
  Empowered: ISchoolUser
}
