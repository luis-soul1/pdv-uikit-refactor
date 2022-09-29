import React from 'react'

import { TColors } from '@Uikit/colors'
import { PdvIcons, TIconNames } from '@Uikit/PdvIcons'

type TImportCardProps = {
  bg: TColors
  icon: TIconNames
  text: string
  onClick?: () => void
}

const ImportCard = (props: TImportCardProps) => {
  return (
    <div className={`flex w-56 flex-col overflow-hidden rounded-md shadow-md ${props.onClick ? 'cursor-pointer' : ''}`} onClick={props.onClick}>
      <div className="flex items-center justify-center p-4" style={{ backgroundColor: `var(--${props.bg})` }}>
        <PdvIcons name={props.icon} size={50} color="white" />
      </div>

      <div className="flex items-center justify-center py-8 px-4">
        <h6 className="text-gray-500">{props.text}</h6>
      </div>
    </div>
  )
}

export default ImportCard
