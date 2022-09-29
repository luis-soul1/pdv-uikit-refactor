import { IModule } from './IModule'

export interface IPlatform {
  id: string
  name: string
  link: string
  color: string
  icon: string
  description: string | null
  active: boolean
  Modules?: IModule[]
}
