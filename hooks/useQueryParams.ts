import { useState } from 'react'

import { TQueryParams } from 'types/interfaces/requests/IRequest'

const useQueryParams = ({ pagination = true, limit = 10, page = 1, filter = {} }: TQueryParams) => {
  const [queryParams, setQueryParams] = useState({ pagination, limit, page, filter })

  const onChangeQueryParams = ({ limit, page, filter = {} }: TQueryParams) => {
    let updatedParams = { ...queryParams }

    if (page) updatedParams = { ...updatedParams, page }

    if (limit) updatedParams = { ...updatedParams, limit }

    setQueryParams({ ...updatedParams, filter })
  }

  return {
    onChangeQueryParams,
    queryParams
  }
}

export default useQueryParams
