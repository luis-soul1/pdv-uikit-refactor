import { TColors } from '@Uikit/colors'

type TPdvPillBox = {
  className?: string
  borderType?: 'rounded' | 'rounded-md' | 'rounded-full'
  bgColor?: TColors
  titleColor?: TColors
  size?: 'micro' | 'small' | 'medium' | 'large'
  onClick?: () => void
}
const PdvPillBox: React.FC<TPdvPillBox> = (props) => {
  const setSize = () => {
    if (props.size === 'micro') return 'py-px'
    if (props.size === 'small') return 'py-0.5'
    if (props.size === 'large') return 'py-2.5'
    return 'py-1.5'
  }

  return (
    <div
      className={`${props.borderType ?? 'rounded'} ${setSize()} ${props.className} ${props.bgColor === 'white' ? 'text-black' : 'text-white'} `}
      style={{ display: 'inline-block', backgroundColor: `var(--${props.bgColor ?? 'indigo-700'})`, paddingLeft: '1rem', paddingRight: '1rem' }}
      onClick={props.onClick}
    >
      {typeof props.children === 'string' ? (
        <p className="subtitle2" style={{ color: `var(--${props.titleColor ?? 'white'})` }}>
          {props.children}
        </p>
      ) : (
        props.children
      )}
    </div>
  )
}

export default PdvPillBox
