import Link from 'next/link'
import { ElementType, ReactElement } from 'react'

import LoadingButton from '@mui/lab/LoadingButton'
import { Button, CircularProgress } from '@mui/material'

import { TColors } from './colors'
import { PdvIcons, TIconNames } from './PdvIcons'

export type TButtonVariant = 'contained' | 'outlined' | 'default'
export type TButtonTheme =
  | 'indigo-700'
  | 'indigo-500'
  | 'teal-500'
  | 'green-600'
  | 'blue-500'
  | 'blue-400'
  | 'blue-100'
  | 'orange-400'
  | 'orange-600'
  | 'orange-700'
  | 'rose-400'
  | 'rose-500'
  | 'yellow-600'
  | 'yellow-700'
  | 'gray-500'
  | 'gray-300'
  | 'black'
  | 'white'
export type TButtonSize = 'small' | 'medium' | 'large'

type TPdvButton = {
  className?: string
  variant?: TButtonVariant
  theme?: TButtonTheme
  size?: TButtonSize
  asLink?: boolean
  href?: string
  textColor?: TColors
  noShadow?: boolean
  type?: 'submit' | 'button' | 'reset'
  icon?: TIconNames | ReactElement
  iconPosition?: 'left' | 'right'
  pdvIconSize?: 'small' | 'medium' | 'large' | 'xlarge' | number
  disabled?: boolean
  loading?: boolean
  component?: ElementType
  onClick?: () => void
}
const defaultShadows = 'shadow-md hover:shadow-lg'
const outlinedStructure = `border hover:bg-gray-25 bg-transparent ${defaultShadows}`
const defaultStructure = `bg-transparent border-none hover:bg-gray-50 ${defaultShadows}`
const disabledStyles = 'bg-transparent border-none cursor-not-allowed opacity-50'
const structure = `normal-case transition duration-200`

const root: Record<string, string> = {
  // Themes
  'indigo-700_contained': `bg-indigo-700 text-white hover:bg-indigo-600 ${defaultShadows}`,
  'indigo-700_outlined': `text-indigo-700 border-indigo-700 ${outlinedStructure}`,
  'indigo-700_default': `text-indigo-700 ${defaultStructure}`,

  'indigo-500_contained': `bg-indigo-500 text-white hover:bg-indigo-600 ${defaultShadows}`,
  'indigo-500_outlined': `text-indigo-500 border-indigo-500 ${outlinedStructure}`,
  'indigo-500_default': `text-indigo-500 ${defaultStructure}`,

  'teal-500_contained': `bg-teal-500 text-white hover:bg-teal-300 ${defaultShadows}`,
  'teal-500_outlined': `text-teal-500 border-teal-500 ${outlinedStructure}`,
  'teal-500_default': `text-teal-500 ${defaultStructure}`,

  'green-600_contained': `bg-green-600 text-white hover:bg-green-300 ${defaultShadows}`,
  'green-600_outlined': `text-green-800 border-green-600 ${outlinedStructure}`,
  'green-600_default': `text-green-600 ${defaultStructure}`,

  'blue-500_contained': `bg-blue-500 text-white hover:bg-blue-200 ${defaultShadows}`,
  'blue-500_outlined': `text-blue-500 border-blue-400 ${outlinedStructure}`,
  'blue-500_default': `text-blue-500 ${defaultStructure}`,

  'blue-400_contained': `bg-blue-400 text-white hover:bg-blue-200 ${defaultShadows}`,
  'blue-400_outlined': `text-blue-400 border-blue-400 ${outlinedStructure}`,
  'blue-400_default': `text-blue-400 ${defaultStructure}`,

  'blue-100_contained': `bg-blue-100 text-blue-400 hover:bg-blue-50 ${defaultShadows}`,
  'blue-100_outlined': `text-blue-100 border-blue-100 ${outlinedStructure}`,
  'blue-100_default': `text-blue-100 ${defaultStructure}`,

  'orange-400_contained': `bg-orange-400 text-white hover:bg-orange-200 ${defaultShadows}`,
  'orange-400_outlined': `text-orange-400 border-orange-400 ${outlinedStructure}`,
  'orange-400_default': `text-orange-400 ${defaultStructure}`,

  'orange-700_contained': `bg-orange-700 text-white hover:bg-orange-400 ${defaultShadows}`,
  'orange-700_outlined': `text-orange-700 border-orange-700 ${outlinedStructure}`,
  'orange-700_default': `text-orange-700 ${defaultStructure}`,

  'orange-600_contained': `bg-orange-600 text-white hover:bg-orange-400 ${defaultShadows}`,
  'orange-600_outlined': `text-orange-600 border-orange-600 ${outlinedStructure}`,
  'orange-600_default': `text-orange-600 ${defaultStructure}`,

  'rose-400_contained': `bg-rose-400 text-white hover:bg-rose-200 ${defaultShadows}`,
  'rose-400_outlined': `text-rose-400 border-rose-400 ${outlinedStructure}`,
  'rose-400_default': `text-rose-400 ${defaultStructure}`,

  'rose-500_contained': `bg-rose-500 text-white hover:bg-rose-300 ${defaultShadows}`,
  'rose-500_outlined': `text-rose-500 border-rose-500 ${outlinedStructure}`,
  'rose-500_default': `text-rose-500 ${defaultStructure}`,

  'yellow-600_contained': `bg-yellow-600 text-white hover:bg-yellow-400 ${defaultShadows}`,
  'yellow-600_outlined': `text-yellow-600 border-yellow-600 ${outlinedStructure}`,
  'yellow-600_default': `text-yellow-600 ${defaultStructure}`,

  'yellow-700_contained': `bg-yellow-700 text-white hover:bg-yellow-500 ${defaultShadows}`,
  'yellow-700_outlined': `text-yellow-700 border-yellow-700 ${outlinedStructure}`,
  'yellow-700_default': `text-yellow-700 ${defaultStructure}`,

  'gray-500_contained': `bg-gray-500 text-white hover:bg-gray-50 ${defaultShadows}`,
  'gray-500_outlined': `text-gray-500 border-gray-500 ${outlinedStructure}`,
  'gray-500_default': `text-gray-500 ${defaultStructure}`,

  black_contained: `bg-black text-white hover:bg-gray-700 ${defaultStructure}`,
  black_outlined: `text-black border-black ${outlinedStructure}`,
  black_default: `text-black ${defaultStructure}`,

  white_contained: `bg-white text-gray-500 hover:bg-gray-2 ${defaultShadows}`
}

const PdvButton: React.FC<TPdvButton> = (props) => {
  const {
    children,
    className,
    variant,
    theme,
    asLink,
    pdvIconSize,
    loading,
    noShadow,
    textColor,
    iconPosition = 'left',
    disabled = false,
    ...rest
  } = props

  const buttonStyles = () => {
    const selectedVariant: TButtonVariant = variant ? variant : 'contained'
    const selectedTheme: TButtonTheme = theme ? theme : 'indigo-700'
    let buttonStyles = root[`${selectedTheme}_${selectedVariant}`]

    if (textColor) buttonStyles = buttonStyles.replace(/text-[a-z-0-9]+/g, `text-${props.textColor}`)
    if (noShadow) {
      buttonStyles = buttonStyles.replace(/hover:shadow-[a-z-0-9]+/g, '')
      buttonStyles = buttonStyles.replace(/shadow-[a-z-0-9]+/g, '')
    }

    return buttonStyles
  }

  const setIcon = () => {
    if (!props.icon) return
    if (typeof props.icon === 'string')
      return (
        <PdvIcons
          name={props.icon}
          color={props.variant === 'outlined' ? (props.theme as TColors) : 'white'}
          className="mr-1"
          size={props.pdvIconSize ?? 'medium'}
        />
      )
    return props.icon
  }

  return (
    <>
      {props.asLink ? (
        <Link href={props.href ?? ''} passHref>
          <Button
            className={`${className ?? ''} ${structure} ${disabled ? disabledStyles : ''} ${buttonStyles()}`}
            {...rest}
            sx={{ borderStyle: 'solid', borderRadius: '8px', paddingLeft: 2, paddingRight: 2 }}
            disabled={disabled}
          >
            <div className="total-center gap-1">
              {iconPosition === 'left' && setIcon()}
              <h6 className={`flex items-center ${props.size?.includes('small') ? 'subtitle2' : 'subtitle1'}`}>{children}</h6>
              {iconPosition === 'right' && setIcon()}
            </div>
          </Button>
        </Link>
      ) : loading ? (
        <LoadingButton
          loading={loading}
          className={`${className ?? ''} ${structure} ${disabled ? disabledStyles : ''} ${buttonStyles()}`}
          {...rest}
          loadingIndicator={<CircularProgress className="text-white" size={14} />}
          sx={{ borderStyle: 'solid', borderRadius: '8px', paddingLeft: 2, paddingRight: 2 }}
          disabled={disabled}
        >
          <span className="invisible">{children}</span>
        </LoadingButton>
      ) : (
        <Button
          className={`${className ?? ''} ${structure} ${disabled ? disabledStyles : ''} ${buttonStyles()}`}
          {...rest}
          sx={{ borderStyle: 'solid', borderRadius: '8px', paddingLeft: 2, paddingRight: 2 }}
          disabled={disabled}
        >
          <div className="total-center gap-1">
            {iconPosition === 'left' && setIcon()}
            <h6 className={`flex items-center ${props.size?.includes('small') ? 'subtitle2' : 'subtitle1'}`}>{children}</h6>
            {iconPosition === 'right' && setIcon()}
          </div>
        </Button>
      )}
    </>
  )
}

export default PdvButton
