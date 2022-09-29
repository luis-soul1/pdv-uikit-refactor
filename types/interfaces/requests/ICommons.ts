import { TGenericId } from 'types/commons/types'

export interface ITypeTeachingLevel {
  id: number
  name: string
  active: boolean
}

export interface ITypeTeachingCategorie {
  id: number
  code: string
  name: string
  active: boolean
}

interface ICommonAddress {
  code: string
  createdAt: string
  id: TGenericId
  name: string
  updatedAt: string
}

export interface IRegion extends ICommonAddress {
  alias: string
}

export interface IProvince extends ICommonAddress {
  region_id: TGenericId
}

export interface ICommune extends ICommonAddress {
  province_id: TGenericId
}

export interface ICommonBlockConfig {
  active: boolean
  createdAt: Date | null
  createdBy: number | null
  id: TGenericId
  updatedAt: Date | null
  updatedBy: number | null
}

export interface IBlockConfig extends ICommonBlockConfig {
  block: number
}

export interface IBlockDurationConfig extends ICommonBlockConfig {
  time: number
}
