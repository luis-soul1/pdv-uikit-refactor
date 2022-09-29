import { ChangeEvent, Fragment } from 'react'

import { Divider, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Controller, UseFormReturn } from 'react-hook-form'

type TRadioGroupProps = {
  name: string
  form: UseFormReturn<Record<string, string>>
  defaultValue: string
  options: TRadio[]
  divider?: boolean
  alignment?: 'horizontal' | 'vertical'
  onChange?: (event: ChangeEvent<HTMLInputElement>, value: string) => void
}

export type TRadio = {
  label: string
  value: string
}

export const RadioGroupField = (props: TRadioGroupProps) => {
  const { alignment = 'vertical' } = props
  const customRadioStyle = {
    color: 'var(--teal-600)',
    '&.Mui-checked': {
      color: 'var(--teal-600)'
    }
  }

  return (
    <Controller
      name={props.name}
      control={props.form.control}
      defaultValue={props.defaultValue}
      render={({ field: { onChange, value } }) => {
        return (
          <RadioGroup
            row={alignment === 'horizontal'}
            value={value}
            onChange={(e, value) => {
              onChange(e, value)
              props?.onChange && props.onChange(e, value)
            }}
          >
            {props.options?.map((option) => (
              <Fragment key={option.value}>
                <FormControlLabel
                  value={option.value}
                  label={<label className="subtitle1 text-gray-500">{option.label}</label>}
                  name={props.name}
                  control={<Radio sx={customRadioStyle} />}
                />

                {props.divider && <Divider className="b-gray-100 my-1.5" />}
              </Fragment>
            ))}
          </RadioGroup>
        )
      }}
    />
  )
}

export default RadioGroupField
