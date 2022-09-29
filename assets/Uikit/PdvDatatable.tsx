import Image from 'next/image'
import { useState, useEffect, ThHTMLAttributes, TdHTMLAttributes, Fragment } from 'react'

import { useForm } from 'react-hook-form'

import { TColors } from '@Uikit/colors'
import InputField from '@Uikit/Forms/InputField'
import PdvPagination, { usePdvPagination } from '@Uikit/PdvPagination'
import EmptyImg from 'assets/images/backgrounds/empty-table.png'
import { useDebouncedCallback } from 'hooks/useDebounce'
import { cleanString } from 'utils/helpers'

import { PdvIcons } from './PdvIcons'

type TPdvDatatable<T> = {
  columns: IColumns<T>[]
  dataSource: T[]
  defaultPagination?: boolean
  pagination?: {
    count: number
    page: number
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void
  }
  expandedRows?: TExpandedRows<T>
  headerColor?: TColors
  className?: string
}

export interface IColumns<T> {
  name: string
  dataIndex: keyof T
  sortable?: boolean
  filterable?: boolean
  align?: ThHTMLAttributes<T>['align'] | TdHTMLAttributes<T>['align']
  width?: string | number
  render: (value: T[keyof T], record: T, array: T[]) => React.ReactNode
  customFilter?: () => React.ReactNode
}

export interface TExpandedRows<T> {
  autoCollapse: boolean
  expandedRowRender: (record: T) => React.ReactNode
  rowExpandable: (record: T) => boolean
}

const PdvDatatable = <T,>(props: TPdvDatatable<T>) => {
  const { defaultPagination = true } = props
  const pagination = usePdvPagination()

  const { inputControl, filteredData } = useTableFilters(props.dataSource)
  const { currentPageRecords, totalPages, calculateTotalPages } = useTablePagination(filteredData, pagination.page)

  const { isRecordExpanded, toggleExpand } = useExpandableRows({
    dataSource: props.dataSource,
    key: props.columns[0].dataIndex,
    autoCollapse: !!props.expandedRows?.autoCollapse
  })

  const isFilterableColumns = props.columns.some((column) => column.filterable || column.customFilter !== undefined)

  const headerColor: string = props.headerColor ? `${props.headerColor}` : 'purple-250'
  const setBgColor = (index: number) => ((index + 1) % 2 === 0 ? 'bg-gray-25 border-y border-gray-100 ' : '')

  const onChangePage = props?.pagination?.onChange !== undefined ? props.pagination.onChange : pagination.onChange

  return (
    <>
      <div className={`overflow-x-auto ${props?.className ?? ''}`}>
        <table className="w-full table-auto">
          <thead>
            <tr>
              {props?.expandedRows && <th className="px-4 py-6" style={{ backgroundColor: `var(--${headerColor})` }} />}

              {props.columns.map((column) => (
                <th
                  key={column.name}
                  align={column.align || 'left'}
                  className="break-words"
                  style={{ backgroundColor: `var(--${headerColor})`, width: column.width ?? 'auto' }}
                >
                  <div className={`${headerColor} py-4 px-6`}>
                    <p className={`subtitle1 font-bold text-white`}>{column.name}</p>
                  </div>
                </th>
              ))}
            </tr>

            <tr>
              {isFilterableColumns &&
                props.columns.map((column) => (
                  <th key={`filter-${column.name}`} className="bg-gray-50">
                    <div className="py-4 px-6">
                      {column.filterable && column.customFilter === undefined && (
                        <InputField
                          name={`${String(column.dataIndex)}`}
                          form={inputControl}
                          inputProps={{ placeholder: 'Buscar..', className: 'text-gray-500 h-9' }}
                        />
                      )}

                      {column.customFilter && column.customFilter()}
                    </div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {!props.dataSource.length ? (
              <tr>
                <td colSpan={props.columns.length}>
                  <EmptyTable />
                </td>
              </tr>
            ) : (
              currentPageRecords.map((record, index: number) => {
                return (
                  <Fragment key={index}>
                    <tr className={`w-full  ${setBgColor(index)}`}>
                      {props?.expandedRows && (
                        <td className="px-4 py-6" width={30}>
                          {props?.expandedRows?.rowExpandable(record) && (
                            <PdvIcons
                              className="cursor-pointer"
                              name={`${isRecordExpanded(record, index) ? 'KeyArrowUp' : 'KeyArrowDown'}`}
                              color="blue-400"
                              onClick={() => toggleExpand(record, index)}
                            />
                          )}
                        </td>
                      )}
                      {props.columns.map((column, index) => (
                        <td
                          key={`${record[column.dataIndex]}-${column.name}-${index}`}
                          align={column.align || 'left'}
                          className={`subtitle2 break-words py-4 px-6 font-normal text-gray-500`}
                          style={{ width: column.width ?? 'auto' }}
                        >
                          {column.render(record[column.dataIndex], record, props.dataSource)}
                        </td>
                      ))}
                    </tr>
                    <tr className="w-full">
                      {props?.expandedRows && props?.expandedRows?.rowExpandable(record) && isRecordExpanded(record, index) && (
                        <td colSpan={props.columns.length + 1} className={`w-full border-y border-gray-100 p-4`}>
                          {props?.expandedRows?.expandedRowRender(record)}
                        </td>
                      )}
                    </tr>
                  </Fragment>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {!props.pagination && defaultPagination && !!currentPageRecords.length && (
        <PdvPagination className="my-6 flex justify-end" count={totalPages} page={pagination.page} onChange={pagination.onChange} />
      )}

      {props.pagination && !!currentPageRecords.length && (
        <>
          <PdvPagination
            className="my-6 flex justify-end"
            count={calculateTotalPages(props.pagination.count)}
            page={props.pagination.page}
            onChange={(_, page: number) => onChangePage(_, page)}
          />
        </>
      )}
    </>
  )
}

const EmptyTable = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 overflow-hidden bg-sky-50 py-5">
      <div className="pr-32">
        <Image src={EmptyImg} alt="Tabla sin datos" width={1045} height={348} quality={100} />
      </div>

      <span className="rounded-md bg-rose-350 p-2 text-center text-white">¡Ups! No se encontraron datos</span>
    </div>
  )
}

const useExpandableRows = <T,>({ dataSource, key, autoCollapse = false }: { dataSource: T[]; key: keyof T; autoCollapse: boolean }) => {
  const [expandedRows, setExpandedRows] = useState<{ key: string; expanded: boolean }[]>([])

  const isRecordExpanded = (record: T, index: number) => !!expandedRows.find((row) => row.key === `${record[key]}-${index}`)?.expanded

  const toggleExpand = (record: T, index: number) => {
    setExpandedRows(
      expandedRows.map((row) => {
        let updatedRow = autoCollapse ? { ...row, expanded: false } : { ...row }

        if (row.key === `${record[key]}-${index}`) updatedRow = { ...row, expanded: !row.expanded }

        return updatedRow
      })
    )
  }

  const createKeys = (data: T[]) => setExpandedRows(data.map((item, index) => ({ key: `${item[key]}-${index}`, expanded: false })))

  useEffect(() => {
    createKeys(dataSource)
  }, [])

  return { isRecordExpanded, toggleExpand }
}

const useTableFilters = <T,>(dataSource: T[]) => {
  const filtersControl = useForm()
  const [filteredData, setFilteredData] = useState(dataSource)

  useEffect(() => {
    const subscription = filtersControl.watch((value, { name }) => {
      const arrayDataKey = name as keyof T
      handleFilter(arrayDataKey, name !== undefined ? value[name] : '')
    })

    return () => subscription.unsubscribe()
  }, [filtersControl.watch])

  useEffect(() => setFilteredData(dataSource), [dataSource])

  const handleFilter = useDebouncedCallback((key: keyof T, value: string) => {
    if (key) {
      if (!value && filteredData.length !== dataSource.length) setFilteredData(dataSource)
      const matchFilter = dataSource.filter((record) => cleanString(record[key] as unknown as string).includes(cleanString(value)))
      setFilteredData(matchFilter)
    }
  }, 500)

  return { inputControl: filtersControl, filteredData }
}

export const useDynamicTableFilters = (values = {}, onChangeCallback?: (inputs: Record<string, string>) => void) => {
  const filtersControl = useForm()

  const filterValues = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: '' }), {})

  const [filters, setFilters] = useState(filterValues)

  const [parsedFilters, setParsedFilters] = useState({})

  useEffect(() => {
    setParsedFilters(transformValues(values, filters))
  }, [filters])

  const handleFilters = useDebouncedCallback((inputs: Record<string, string>) => {
    if (onChangeCallback) onChangeCallback(inputs)

    setFilters({
      ...filters,
      ...inputs
    })
  }, 500)

  const transformValues = (object: Record<string, unknown>, values: Record<string, unknown>) => {
    return Object.entries(object).reduce((acc, [value, key]) => ({ ...acc, [key as string]: values[value] }), {})
  }

  useEffect(() => {
    const subscription = filtersControl.watch((inputValues) => handleFilters(inputValues))

    return () => subscription.unsubscribe()
  }, [filtersControl.watch])

  return {
    inputFilterControl: filtersControl,
    filters: parsedFilters,
    handleFilters
  }
}

const useTablePagination = <T,>(dataSource: T[], currentPage: number) => {
  const recordsPerPage = 10

  const paginatedData = (data: T[], page: number, pageSize = 10) => {
    const paginated = data.slice((page - 1) * pageSize, page * pageSize)
    return paginated.length ? paginated : data
  }

  const calculateTotalPages = (totalRecords: number) => Math.ceil(totalRecords / recordsPerPage)

  const currentPageRecords = paginatedData(dataSource, currentPage)

  return { currentPageRecords, totalPages: calculateTotalPages(dataSource.length), calculateTotalPages }
}

export default PdvDatatable
