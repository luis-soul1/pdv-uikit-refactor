import { ReactElement } from 'react'

import { TColors } from '@Uikit/colors'

type TTopHeaderCard = {
  borderType?: 'rounded-t-none' | 'rounded-t-xl'
  className?: string
  headerColor?: TColors
  title: string | ReactElement
  titleColor?: TColors
  onClick?: () => void
}

const TopHeaderCard: React.FC<TTopHeaderCard> = (props) => {
  const bosderStyle = !props.borderType || props.borderType === 'rounded-t-xl' ? 'rounded-t-xl py-2' : 'rounded-t-none py-1'
  return (
    <div
      className={`shadow-gray-01 width-104 inline-block rounded-b-xl ${props.borderType ?? 'rounded-t-xl'} ${props.className ?? ''}`}
      onClick={props.onClick}
    >
      <div
        className={`flex w-full items-center justify-center text-white ${bosderStyle}`}
        style={{ backgroundColor: `var(--${props.headerColor ?? 'indigo-700'})` }}
      >
        {typeof props.title === 'string' ? (
          <p className="subtitle1 text-center" style={{ color: `var(--${props.titleColor ?? 'white'})` }}>
            {props.title}
          </p>
        ) : (
          props.title
        )}
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default TopHeaderCard
