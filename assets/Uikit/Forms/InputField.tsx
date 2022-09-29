import { ReactElement } from 'react'

import MuiInput from '@mui/material/Input'
import { InputBaseComponentProps } from '@mui/material/InputBase'
import { UseFormReturn, RegisterOptions, ControllerRenderProps, Controller, FieldValues, Path } from 'react-hook-form'

import { TColors } from '@Uikit/colors'
import { PdvIcons, TIconNames } from '@Uikit/PdvIcons'

import FormError from './FormError'
import LabelField, { TLabelField } from './LabelField'

export type TInputFieldProps<TFormValues extends FieldValues> = Omit<TInputProps, 'name'> &
  TLabelField & {
    name: Path<TFormValues>
    errorClassName?: string
    labelPosition?: 'left' | 'top'
    className?: string
    form?: UseFormReturn<TFormValues>
    options?: RegisterOptions
  }

const InputField = <TFormValues extends FieldValues>(props: TInputFieldProps<TFormValues>) => {
  return (
    <div className={props.className}>
      <div className={`flex gap-2 ${props?.labelPosition === 'left' ? 'flex-row' : 'flex-col'}`}>
        <LabelField label={props.label} />
        {props?.form ? <ControlledInput form={props.form} {...props} /> : <Input {...props} inputProps={{ ...props.inputProps }} />}
      </div>
      {props?.form && <FormError errorClassName={props.errorClassName} name={props.name} errors={props.form?.formState?.errors} />}
    </div>
  )
}

export type TInputProps = {
  name: string
  id?: string
  variant?: 'default' | 'outlined' | 'transparent'
  theme?: TColors
  icon?: TIconNames | ReactElement
  iconColor?: TColors
  iconPosition?: 'left' | 'right'
  inputProps?: InputBaseComponentProps
  controlFields?: ControllerRenderProps<Record<string, string>, string>
  value?: string
}

export const Input = (props: TInputProps) => {
  const { variant = 'default' } = props
  const inputProps = props?.inputProps ? { ...props.inputProps } : {}

  const inputVariants = {
    default:
      'subtitle2 text-gray-500 rounded-md w-full transition ease-in-out focus:outline-none border border-gray-300 hover:border-blue-500 focus:border-blue-500 bg-white',
    outlined: 'border-gray-300 border-b-2',
    transparent: 'subtitle2 text-gray-500 w-full transition ease-in-out focus:outline-none border-0'
  }

  const selectedVariant = inputVariants[variant]

  const disabledStyles = 'disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed'

  let icon: string | ReactElement | undefined

  if (props.icon && typeof props.icon !== 'string') icon = props.icon
  if (typeof props.icon === 'string') icon = <PdvIcons className="mt-2" name={props.icon} color={props.iconColor ?? 'blue-500'} />

  if (icon)
    return (
      <div className={`flex items-center ${selectedVariant} overflow-hidden`}>
        {props?.iconPosition !== 'right' && <span className="mx-4">{icon}</span>}
        <MuiInput
          disableUnderline
          {...props?.controlFields}
          inputProps={inputProps}
          id={props.id}
          className={`focus:outline-none ${disabledStyles} ${props.iconPosition === 'right' ? 'px-4' : 'pr-4'} ${props.inputProps?.className ?? ''}`}
          sx={{ height: 44 }}
        />
        {props?.iconPosition === 'right' && <span className="mr-4">{icon}</span>}
      </div>
    )

  return (
    <>
      <MuiInput
        disableUnderline
        {...props?.controlFields}
        id={props?.id}
        inputProps={inputProps}
        className={`px-4 ${selectedVariant} ${disabledStyles} ${props.inputProps?.className ?? ''}`}
        sx={{ height: 44, paddingLeft: 16, paddingRight: 16 }}
      />
    </>
  )
}

type TControlledInputProps<TFormValues extends FieldValues> = Omit<TInputProps, 'name'> & {
  name: Path<TFormValues>
  form: UseFormReturn<TFormValues>
  options?: RegisterOptions
}
export const ControlledInput = <TFormValues extends FieldValues>(props: TControlledInputProps<TFormValues>) => {
  const { form, options, ...restProps } = props

  return (
    <Controller
      name={props.name}
      control={props.form.control}
      rules={props.options}
      render={({ field: { value, ...restField } }) => {
        const inputValue = value
        const controlFields = { value: inputValue, ...restField }

        return <Input {...restProps} controlFields={controlFields} />
      }}
    />
  )
}

export default InputField
