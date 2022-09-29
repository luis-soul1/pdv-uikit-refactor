import React from 'react'

import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'

import { TColors } from './colors'

type PdvTooltipPlacements =
  | 'bottom-end'
  | 'bottom-start'
  | 'bottom'
  | 'left-end'
  | 'left-start'
  | 'left'
  | 'right-end'
  | 'right-start'
  | 'right'
  | 'top-end'
  | 'top-start'
  | 'top'

type PdvTooltipProps = {
  children: React.ReactElement
  title: string
  placement: PdvTooltipPlacements
  textColor?: TColors
  bgColor?: TColors
  arrow?: boolean
  onOpen?: (event: Event | React.SyntheticEvent<Element, Event>) => void
  onClose?: (event: Event | React.SyntheticEvent<Element, Event>) => void
  open?: boolean
}
const PdvTooltip = (props: PdvTooltipProps) => {
  const { textColor = 'indigo-500', bgColor = 'indigo-25', ...rest } = props
  return <CustomTooltip {...rest} textColor={textColor} bgColor={bgColor} />
}

const CustomTooltip = styled(({ className, ...props }: TooltipProps & PdvTooltipProps) => <Tooltip {...props} classes={{ popper: className }} />, {
  shouldForwardProp: (prop) => prop !== 'textColor' && prop !== 'bgColor'
})(({ textColor, bgColor }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: `var(--${bgColor})`,
    color: `var(--${textColor})`,
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) !important;',
    fontSize: 12,
    fontWeight: 400,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10
  }
}))

export default PdvTooltip
