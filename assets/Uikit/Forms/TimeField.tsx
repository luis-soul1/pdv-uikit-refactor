import { TimePickerProps, TimePicker } from '@mui/x-date-pickers'
import { Controller, FieldValues, ControllerRenderProps, UseFormReturn } from 'react-hook-form'

import { PdvIcons } from '@Uikit/PdvIcons'

import FormError from './FormError'
import { Input, TInputProps } from './InputField'
import LabelField, { TLabelField } from './LabelField'

type TTimepicker<TInputPropsDate, TDate> = {
  form: UseFormReturn
  muiTimePickerProps?: Partial<TimePickerProps<TInputPropsDate, TDate>>
  disabled?: boolean
  className?: string
  errorClassName?: string
  labelPosition: 'left' | 'top'
} & TInputProps &
  TLabelField

type UseControllerReturn<TFieldValues extends FieldValues = FieldValues> = {
  field: ControllerRenderProps<TFieldValues>
}

const TimeField = <TInputPropsDate, TDate>(props: TTimepicker<TInputPropsDate, TDate>) => {
  const { icon, iconColor } = props
  let pickerIcon = <PdvIcons name="TimeCircle" color="blue-500" />

  if (icon && typeof icon !== 'string') pickerIcon = icon
  if (typeof icon === 'string') pickerIcon = <PdvIcons name={icon} color={iconColor ?? 'blue-500'} />

  return (
    <Controller
      control={props.form.control}
      name={props.name}
      render={({ field }: UseControllerReturn) => {
        const { onChange: controllerOnChange, ...restField } = field
        const onChange = (value: TDate | null, keyboardInputValue?: string | undefined) => {
          controllerOnChange(value)
          if (props.muiTimePickerProps?.onChange) props.muiTimePickerProps.onChange(value, keyboardInputValue)
        }

        return (
          <TimePicker
            {...restField}
            {...props?.muiTimePickerProps}
            disabled={props.disabled}
            onChange={onChange}
            components={{
              OpenPickerIcon: () => pickerIcon
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => {
              const disabledStyles = props?.disabled ? 'bg-gray-50 text-gray-400 border-gray-300 cursor-not-allowed' : ''

              return (
                <div className={props.className}>
                  <div className={`flex gap-2 ${props?.labelPosition === 'left' ? 'flex-row' : 'flex-col'}`}>
                    {props?.label && <LabelField {...props} />}
                    <div className={`${disabledStyles}`}>
                      <div
                        className={`flex items-center overflow-hidden rounded-md border border-gray-300 hover:border-blue-500 focus:border-blue-500 ${disabledStyles} ${
                          props.className ?? ''
                        }`}
                        ref={inputRef}
                      >
                        <div className="mr-4">{InputProps?.endAdornment}</div>
                        <Input
                          name={props.name}
                          form={props.form}
                          id={props.id}
                          inputProps={{ ...inputProps, className: 'pl-0' }}
                          variant="transparent"
                        />
                      </div>
                    </div>
                  </div>
                  <FormError errorClassName={props.errorClassName} name={props.name} errors={props.form?.formState?.errors} />
                </div>
              )
            }}
          />
        )
      }}
    />
  )
}

export default TimeField
