import { useQuery } from 'react-query'

import useLoader from 'hooks/useLoader'
import {
  IBlockConfig,
  IBlockDurationConfig,
  ICommune,
  IProvince,
  IRegion,
  ITypeTeachingCategorie,
  ITypeTeachingLevel
} from 'types/interfaces/requests/ICommons'
import { TQueryParams } from 'types/interfaces/requests/IRequest'
import { apiClient } from 'utils/ApiClient'

const endpoints = {
  teachingTypeLevels: '/types_teachings_levels',
  teachingTypeCategories: '/types_teachings_categories',
  regions: '/regions',
  provinces: '/provinces',
  communes: '/communes',
  blocksConfig: '/schedules_blocks_configs',
  blocksDurationConfig: '/schedules_durations_configs'
}

export const useTeachingTypeLevelsQueries = (queryParam?: string) => {
  const endpoint = endpoints.teachingTypeLevels
  const list = useQuery([endpoint, queryParam], () => apiClient.get<ITypeTeachingLevel[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useTeachingTypeCategoriesQueries = (queryParam?: string) => {
  const endpoint = endpoints.teachingTypeCategories
  const list = useQuery([endpoint, queryParam], () => apiClient.get<ITypeTeachingCategorie[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useRegionQueries = ({ queryParams = {}, enabled = true }: { queryParams?: TQueryParams; enabled?: boolean }) => {
  const endpoint = endpoints.regions
  const list = useQuery([endpoint, queryParams], () => apiClient.get<IRegion[]>({ endpoint, queryParams }), {
    select: (data) => data,
    enabled
  })
  useLoader(list)

  return list
}

export const useProvinceQueries = ({ queryParams = {}, enabled = true }: { queryParams?: TQueryParams; enabled?: boolean }) => {
  const endpoint = endpoints.provinces
  const list = useQuery([endpoint, queryParams], () => apiClient.get<IProvince[]>({ endpoint, queryParams }), {
    select: (data) => data,
    enabled
  })
  useLoader(list)

  return list
}

export const useCommuneQueries = ({ queryParams = {}, enabled = true }: { queryParams?: TQueryParams; enabled?: boolean }) => {
  const endpoint = endpoints.communes
  const list = useQuery([endpoint, queryParams], () => apiClient.get<ICommune[]>({ endpoint, queryParams }), {
    select: (data) => data,
    enabled
  })
  useLoader(list)

  return list
}

export const useBlockConfigQueries = () => {
  const endpoint = endpoints.blocksConfig
  const list = useQuery([endpoint], () => apiClient.get<IBlockConfig[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}

export const useBlockDurationConfigQueries = () => {
  const endpoint = endpoints.blocksDurationConfig
  const list = useQuery([endpoint], () => apiClient.get<IBlockDurationConfig[]>({ endpoint }), { select: (data) => data })
  useLoader(list)

  return list
}
