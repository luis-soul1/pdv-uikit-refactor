import autoBind from 'auto-bind'
import { getSession } from 'next-auth/react'

import { IPost, IPut, TFetchParam, TGet, TMutation } from 'types/interfaces/requests/IRequest'

import { buildQuery } from './helpers'

const defaultHeader = async () => {
  const session = await getSession()
  const token = session ? `Bearer ${session?.accessToken}` : ''
  return { Authorization: token ?? '', 'Content-Type': 'application/json' }
}

export class APIClient {
  server: string

  constructor(SERVER: string) {
    this.server = SERVER
    autoBind(this)
  }

  async fetch<T, K>(params: TFetchParam<K>): Promise<T> {
    const { endpoint, method = 'GET', customHeader = undefined, queryParams, responseType = 'json' } = params
    let { body = undefined } = params
    const defaults = await defaultHeader()

    const headers = customHeader ? { ...defaults, ...customHeader } : defaults
    body = JSON.stringify(body)
    const request = await fetch(`${this.server}${endpoint}${queryParams ? buildQuery(queryParams) : ''}`, { method, body, headers })
    if (request.ok && responseType === 'json') return await request.json()

    const error = await this.tryJson(request)
    throw error
  }

  async fetchFile<T = void>(params: TFetchParam<T>): Promise<Blob> {
    let options = {}
    const { endpoint, method = 'GET', customHeader = undefined, body = undefined } = params
    const defaults = await defaultHeader()
    const headers = customHeader ? { ...defaults, ...customHeader } : defaults
    options = { method, headers }
    if (body) options = { ...options, body }
    const request = await fetch(`${this.server}${endpoint}`, options)
    if (request.ok) return await request.blob()
    const error = await this.tryJson(request)
    throw error
  }

  async tryJson(res: Response) {
    try {
      return await res.json()
    } catch (e) {
      return null
    }
  }

  mutation<T, K>({ endpoint, method, body, customHeader = undefined }: TMutation<K>): Promise<T> {
    return this.fetch({ endpoint, method, body, customHeader })
  }
  get<T>({ endpoint, customHeader, queryParams }: TGet): Promise<T> {
    return this.fetch({ endpoint, customHeader, queryParams })
  }
  post<P, B>({ endpoint, body, customHeader }: IPost<B> & TGet): Promise<P> {
    return this.fetch<P, B>({ endpoint, method: 'POST', body, customHeader })
  }
  put<P, B>({ endpoint, body, customHeader }: Omit<IPut<B>, 'id'> & TGet): Promise<P> {
    return this.fetch<P, B>({ endpoint, method: 'PUT', body, customHeader })
  }
  patch<P, B>({ endpoint, body, customHeader }: Omit<IPut<B>, 'id'> & TGet): Promise<P> {
    return this.fetch<P, B>({ endpoint, method: 'PATCH', body, customHeader })
  }
  delete<P>({ endpoint, customHeader }: TGet): Promise<P> {
    return this.fetch<P, null>({ endpoint, method: 'DELETE', customHeader })
  }
  queryFile({ endpoint }: TGet): Promise<Blob> {
    return this.fetchFile({ endpoint })
  }
  postFile<P>({ endpoint, body, customHeader }: IPost<P> & TGet): Promise<Blob> {
    return this.fetchFile<P>({ endpoint, method: 'POST', body, customHeader })
  }
}

export const apiClient = new APIClient(process.env.NEXT_PUBLIC_BACKEND_API_URL ?? '')
