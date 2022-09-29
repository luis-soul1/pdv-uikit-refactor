import { FunctionComponent, ReactElement, useState } from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Collapse } from '@mui/material'

import { TColors } from './colors'
import { PdvIcons, TIconNames } from './PdvIcons'

type TPdvSimpleAccordion = {
  className?: string
  header?: string | ReactElement
  icon?: TIconNames | ReactElement
  iconColor?: TColors
  size?: 'small' | 'large'
  color?: TColors
  isOpen?: boolean
}

const PdvSimpleAccordion: FunctionComponent<TPdvSimpleAccordion> = (props) => {
  const [openAccordion, setOpenAccordion] = useState<boolean>(props.isOpen ?? false)
  const iconStyle = 'col-span-1 text-white justify-self-end self-center'
  const collapsedStyle = ` ${openAccordion ? 'rounded-t-md' : 'rounded-md'} ${props.size?.includes('large') ? 'h-14' : 'h-12'}`

  const setIcon = () => {
    if (!props.icon) return null
    if (typeof props.icon === 'string') return <PdvIcons name={props.icon ?? 'Document'} color={props.iconColor ?? 'white'} className="mr-2" />
    return props.icon
  }

  return (
    <div className={`w-full ${props.className}`}>
      <div
        className={`grid cursor-pointer grid-cols-12 px-2 md:px-4 ${collapsedStyle}`}
        style={{ backgroundColor: `var(--${props.color ?? 'indigo-700'})` }}
        onClick={() => setOpenAccordion((prev: boolean) => !prev)}
      >
        <div className="col-span-11 flex items-center text-white">
          {typeof props.header === 'string' ? (
            <div className="flex h-full items-center">
              {setIcon()}
              <p className="subtitle1 text-white">{props.header}</p>
            </div>
          ) : (
            <>{props.header}</>
          )}
        </div>

        {openAccordion ? <ArrowDropUpIcon className={iconStyle} /> : <ArrowDropDownIcon className={iconStyle} />}
      </div>
      <Collapse in={openAccordion}>{props.children}</Collapse>
    </div>
  )
}

export default PdvSimpleAccordion
