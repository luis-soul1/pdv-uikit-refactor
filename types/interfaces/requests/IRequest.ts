type TMutationMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type TMethod = 'GET' | TMutationMethod
export type TCustomHeader = Record<string, string> | undefined

export type TFetchParam<K = void> = {
  endpoint: string
  method?: TMethod
  customHeader?: TCustomHeader
  body?: Partial<K> | BodyInit | Blob | ArrayBuffer
  queryParams?: TQueryParams
  responseType?: 'json' | 'arrayBuffer'
}

export type TGet = {
  endpoint: string
  customHeader?: TCustomHeader
  queryParams?: TQueryParams
}

export type TMutation<K> = TFetchParam<K>

export interface TParams<T> {
  body?: T
  id?: string
  method: TMutationMethod
}

export interface IRequestError {
  error: string
  message: string
  statusCode: number
}

export type TPaginatedResponse<T> = {
  count: number
  rows: T[]
}

export type TQueryParams = {
  pagination?: boolean
  page?: number
  limit?: number
  filter?: {
    [K: string]: string | number | boolean
  }
  sort?: [string, 'asc' | 'desc'][]
}

export interface IFetchParams<T> extends TGet {
  method?: TMethod
  body?: Partial<T> | BodyInit
}
export interface IPost<T> {
  body: T
}
export interface IPut<T = void> {
  body?: T
  id: string
}
export interface IDelete {
  id: string
}

export type TRequestMethods<T> = TParams<T> | IPost<T> | IPut<T> | IDelete
