import { useState } from 'react'

import { Pagination, PaginationItem } from '@mui/material'

type TPdvPagination = {
  count: number
  page: number
  className?: string
  onChange?: (event: React<unknown>, value: number) => void
}

export const usePdvPagination = () => {
  const [page, setPage] = useState(1)

  const onChange = (event: React<unknown>, value: number) => {
    setPage(value)
  }

  return { page, onChange }
}

const PdvPagination: React.FC<TPdvPagination> = (props) => {
  return (
    <div className={`${props.className}`}>
      {props.count > 1 && (
        <Pagination
          count={props?.count}
          page={props?.page}
          shape="rounded"
          onChange={props?.onChange}
          renderItem={(item) => {
            const notSelectedStyle = ['previous', 'next', 'end-ellipsis'].includes(item.type) ? '' : 'hover:bg-gray-50'
            const selectedStyle = item.selected ? 'bg-blue-500 text-white hover:bg-blue-500' : ''
            return (
              <PaginationItem className={`${notSelectedStyle} ${selectedStyle}`} sx={{ fontFamily: 'var(--primary-font)', fontSize: 14 }} {...item} />
            )
          }}
        />
      )}
    </div>
  )
}

export default PdvPagination
