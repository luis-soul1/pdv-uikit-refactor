import React from 'react'

import { PdvIcons } from '@Uikit/PdvIcons'

type TPageTitle = {
  title: string
  asHeader?: boolean
}

const PageTitle: React.FC<TPageTitle> = (props) => {
  if (props?.asHeader)
    return (
      <div className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-75 p-4">
        <PdvIcons name="KeyArrowRight" color="blue-500" />
        <h5 className="text-blue-500">{props.title}</h5>
      </div>
    )

  return (
    <>
      <h5 className="text-gray-500">{props.title}</h5>
      <span className="my-2 inline-block h-1 w-8 bg-gray-300 " />{' '}
    </>
  )
}

export default PageTitle
