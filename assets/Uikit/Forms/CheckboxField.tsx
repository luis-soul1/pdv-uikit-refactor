import { ChangeEvent } from 'react'

import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import { styled } from '@mui/system'
import { Controller, ControllerRenderProps, UseFormReturn } from 'react-hook-form'

import { IGenericField } from './GenericFields'

interface ICheckboxProps extends IGenericField {
  name: string
  checkboxVariant?: 'default' | 'weekDay'
  muiCheckboxProps?: CheckboxProps
  form?: UseFormReturn<Record<string, string>>
  field?: Partial<ControllerRenderProps<Record<string, string>, string>>
}

const CheckboxField = (props: ICheckboxProps) => {
  const { checkboxVariant = 'default' } = props

  if (props.form) {
    return (
      <Controller
        name={props.name}
        control={props.form.control}
        render={({ field }) => {
          const { onChange: controllerOnChange, ...restField } = field

          const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            controllerOnChange(e)
            if (props.muiCheckboxProps?.onChange) props.muiCheckboxProps.onChange(e, e.target.checked)
          }

          if (checkboxVariant === 'weekDay') return <WeekDayCheckbox {...props} muiCheckboxProps={{ onChange }} field={restField} />
          return <DefaultCheckbox {...props} field={restField} />
        }}
      />
    )
  }

  if (checkboxVariant === 'weekDay') return <WeekDayCheckbox {...props} />
  return <DefaultCheckbox {...props} />
}

const DefaultCheckbox = (props: ICheckboxProps) => (
  <div className={props.className}>
    <div className={`flex items-center`}>
      <Checkbox
        {...props.muiCheckboxProps}
        {...props?.field}
        checked={!!props?.field?.value}
        inputProps={{ ...props.inputProps }}
        sx={{
          '&:hover': { bgcolor: 'transparent' }
        }}
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
      />
      {props.label && (
        <label className={`body1 block font-semibold text-gray-500 ${props.labelClassName ? props.labelClassName : ''}`} htmlFor={props?.id}>
          {props.label}
        </label>
      )}
    </div>
  </div>
)

const WeekDayCheckbox = (props: ICheckboxProps) => {
  return (
    <Checkbox
      {...props.muiCheckboxProps}
      {...props?.field}
      checked={!!props?.field?.value}
      inputProps={{ ...props.inputProps }}
      sx={{
        '&:hover': { bgcolor: 'transparent' },
        padding: 0
      }}
      checkedIcon={<WeekdayCheckedStyles label={props.label} />}
      icon={<WeekdayCheckboxStyles label={props.label} />}
    />
  )
}

const BpIcon = styled('span')(() => ({
  borderRadius: 5,
  width: 19,
  height: 19,
  boxShadow: 'inset 0 0 0 1px var(--gray-500)',
  backgroundColor: 'var(--white)',
  backgroundImage: 'var(--gray-500)',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2
  },
  'input:hover ~ &': {
    backgroundColor: 'var(--gray-100)'
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'var(--gray-200)'
  }
}))

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: 'var(--teal-500)',
  backgroundImage: 'var(--teal-500)',
  boxShadow: 'inset 0 0 0 1px var(--teal-500)',
  '&:before': {
    display: 'block',
    width: 19,
    height: 19,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""'
  },
  'input:hover ~ &': {
    backgroundColor: 'var(--teal-500)'
  }
})

type TWeekDayLabelProps = {
  className?: string
  label?: string
}

const WeekdayLabel = (props: TWeekDayLabelProps) => {
  return <span {...props}>{props.label}</span>
}

const WeekdayCheckboxStyles = styled(WeekdayLabel)<TWeekDayLabelProps>(() => ({
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--gray-600)',
  fontWeight: '600',
  width: 32,
  height: 32,
  boxShadow: 'inset 0 0 0 1px var(--gray-200)',
  backgroundColor: 'var(--gray-200)',
  backgroundImage: 'var(--gray-200)',
  transition: '0.3s ease',
  'input:hover ~ &': {
    backgroundColor: 'var(--indigo-600)',
    color: 'var(--white)'
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'var(--gray-200)'
  }
}))

const WeekdayCheckedStyles = styled(WeekdayCheckboxStyles)({
  backgroundColor: 'var(--indigo-600)',
  backgroundImage: 'var(--indigo-600)',
  boxShadow: 'inset 0 0 0 1px var(--indigo-600)',
  color: 'var(--white)'
})

export default CheckboxField
