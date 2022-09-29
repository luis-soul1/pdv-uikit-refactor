export interface IAction {
  active: boolean
  page_id?: number | string
  module_id?: number | string
  code: string
  description?: string
  id: number | string
  name: string
}
