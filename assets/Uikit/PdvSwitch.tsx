import { styled } from '@mui/material/styles'
import MUISwitch, { SwitchProps } from '@mui/material/Switch'

import { TColors } from './colors'

type TSwitchProps = {
  suffixText?: {
    checkedText?: string
    checkedColor?: TColors
    uncheckedText?: string
    uncheckedColor?: TColors
  }
} & SwitchProps

const Switch: React.FC<TSwitchProps> = (props) => {
  const { suffixText, ...muiSwitchProps } = props

  const switchText = {
    checked: {
      text: suffixText?.checkedText || 'Activado',
      color: suffixText?.checkedColor || 'teal-600'
    },
    unchecked: {
      text: suffixText?.uncheckedText || 'Desactivado',
      color: suffixText?.uncheckedColor || 'gray-400'
    }
  }

  return (
    <div className="flex items-center gap-4">
      <MUISwitch focusVisibleClassName=".Mui-focusVisible" disableRipple {...muiSwitchProps} />

      <span
        className={`subtitle1 font-semibold`}
        style={{ color: `var(--${props.checked || props.defaultChecked ? switchText.checked.color : switchText.unchecked.color})` }}
      >
        {props.checked || props.defaultChecked ? switchText.checked.text : switchText.unchecked.text}
      </span>
    </div>
  )
}

const PdvSwitch = styled((props: TSwitchProps) => <Switch {...props} />)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--teal-600)',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: 'var(--gray-300)'
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: 'var(--gray-300)',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}))

export default PdvSwitch
