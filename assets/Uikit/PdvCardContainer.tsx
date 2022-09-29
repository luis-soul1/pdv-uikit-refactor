import { FC } from 'react'

type TPdvCardContainer = {
  theme?: 'light' | 'dark'
  className?: string
}

const PdvCardContainer: FC<TPdvCardContainer> = (props) => {
  return (
    <div
      className={`${props.className} rounded-xl`}
      style={{ backgroundColor: props.theme?.includes('dark') ? 'var(--gray-25)' : 'var(--white)', boxShadow: 'var(--shadow-gray--006)' }}
    >
      {props.children}
    </div>
  )
}

export default PdvCardContainer
