import { TColors } from '@Uikit/colors'

type TarrowPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

type TTalkCard = {
  arrowPosition: TarrowPosition
  className?: string
  width?: number
  bgColor?: TColors
}

const BorderYRadius = '10px 0 10px 0'
const BorderXRadius = '0 10px 0 10px'

const dispatch = {
  'top-left': { top: -15, left: 9, borderRadius: BorderYRadius },
  'top-center': { top: -15, left: 'calc(50% - 20px)', borderRadius: BorderYRadius },
  'top-right': { top: -15, right: 9, borderRadius: BorderYRadius },

  'left-top': { left: -15, top: 9, borderRadius: BorderXRadius },
  'left-center': { left: -15, top: 'calc(50% - 20px)', borderRadius: BorderXRadius },
  'left-bottom': { left: -15, bottom: 9, borderRadius: BorderXRadius },

  'right-top': { right: -15, top: 9, borderRadius: BorderXRadius },
  'right-center': { right: -15, top: 'calc(50% - 20px)', borderRadius: BorderXRadius },
  'right-bottom': { right: -15, bottom: 9, borderRadius: BorderXRadius },

  'bottom-left': { bottom: -15, left: 9, borderRadius: BorderYRadius },
  'bottom-center': { bottom: -15, left: 'calc(50% - 20px)', borderRadius: BorderYRadius },
  'bottom-right': { bottom: -15, right: 9, borderRadius: BorderYRadius }
}

const TalkCard: React.FC<TTalkCard> = (props) => {
  const cardStructure = { minHeight: 50, maxWidth: props.width ?? 220, backgroundColor: `var(--${props.bgColor ?? 'indigo-700'})` }

  const setArrowPosition = () => {
    if (!props.arrowPosition) return { bottom: -15, left: 'calc(50% - 20px)', borderRadius: BorderYRadius }

    return dispatch[props.arrowPosition]
  }

  return (
    <div className={`absolute rounded-md p-5 ${props.className}`} style={cardStructure}>
      {props.children}
      <div className="absolute h-8 w-8 rotate-45" style={{ ...setArrowPosition(), backgroundColor: `var(--${props.bgColor ?? 'indigo-700'})` }} />
    </div>
  )
}

export default TalkCard
