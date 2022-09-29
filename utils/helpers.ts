import dayjs, { ManipulateType } from 'dayjs'

export const cleanString = (string: string) => {
  return string === null || string === undefined
    ? ''
    : string
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
}

export const cleanRut = (rut: string) => {
  return typeof rut === 'string' ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : ''
}

export const validateRut = (rut: string) => {
  if (typeof rut !== 'string') {
    return false
  }
  if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
    return false
  }

  rut = cleanRut(rut)

  let t = parseInt(rut.slice(0, -1), 10)
  let m = 0
  let s = 1

  while (t > 0) {
    s = (s + (t % 10) * (9 - (m++ % 6))) % 11
    t = Math.floor(t / 10)
  }

  const v = s > 0 ? '' + (s - 1) : 'K'
  return v === rut.slice(-1)
}

export const formatRut = (rut: string) => {
  rut = cleanRut(rut)
  let result = rut ? rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1) : ''
  for (let i = 4; i < rut.length; i += 3) {
    result = rut.slice(-3 - i, -i) + '.' + result
  }

  return result
}

export const stringTimeToUnix = (string = '1h') => {
  const TIME_TYPE: Record<string, ManipulateType> = {
    y: 'year',
    M: 'month',
    w: 'week',
    d: 'day',
    h: 'hour',
    m: 'minute',
    s: 'second',
    ms: 'millisecond'
  }

  const type: string = string.replace(/[0-9]/g, '')
  const time: string = string.replace(/[a-z]/g, '')

  if (time && TIME_TYPE[type]) {
    const then = dayjs().add(parseInt(time), TIME_TYPE[type])
    const now = dayjs()

    const formatedTime = {
      value: then.unix(),
      inSeconds: (+then - +now) / 1000
    }

    return formatedTime
  }
}

export const buildQuery = (query: Record<string, unknown>): string => {
  const cleanQuery = removeEmptyValues(query)

  const params = Object.entries(cleanQuery).map(([key, value]) => `${key}=${JSON.stringify(value)}`)

  return `?${params.join('&')}`
}

type ExpandRecursively<T> = T extends object ? (T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never) : T
type RemoveNull<T> = ExpandRecursively<{ [K in keyof T]: Exclude<RemoveNull<T[K]>, null> }>

export function removeEmptyValues<T>(obj: T): RemoveNull<T> {
  return Object.fromEntries(
    Object.entries(obj)
      .filter((v) => v[1] !== null && v[1] !== '')
      .map(([k, v]) => [k, v === Object(v) ? removeEmptyValues(v) : v])
  ) as RemoveNull<T>
}

export const downloadFile = (buffer: Blob, filename: string) => {
  const url = window.URL.createObjectURL(new Blob([buffer]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
