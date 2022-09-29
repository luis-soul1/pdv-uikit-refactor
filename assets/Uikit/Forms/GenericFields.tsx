import { DetailedHTMLProps, ReactElement, TextareaHTMLAttributes, forwardRef } from 'react'

import { UseFormReturn, RegisterOptions, FieldError } from 'react-hook-form'

import { TColors } from '@Uikit/colors'
import { PdvIcons, TIconNames, TIconSizes } from '@Uikit/PdvIcons'

export interface IGenericField {
  name: string
  label?: string | TIconNames
  labelPosition?: 'left' | 'top'
  id?: string
  variant?: 'default' | 'outlined'
  icon?: TIconNames | ReactElement
  iconColor?: TColors
  iconPosition?: 'left' | 'right'
  form?: UseFormReturn<Record<string, string>>
  options?: RegisterOptions
  className?: string
  labelClassName?: string
  labelIcon?: TIconNames
  labelIconSize?: TIconSizes
  errorClassName?: string
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  textarea?: boolean
  textareaProps?: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
  withoutDefaultValue?: boolean
  datepickerAdornment?: React.ReactNode
  autocomplete?: boolean
}

export interface IGenericSelect<T> extends IGenericField {
  selectOptions: T[]
  selectProps?: React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
  optionLabel: keyof T
  optionValue: keyof T
  defaultOption?: boolean
}

interface TFormError {
  name: string
  errorClassName?: string
  errors: {
    [x: string]: FieldError
  }
}

export const LabelField: React.FC<IGenericField> = (props) => {
  return (
    <>
      {props.label && (
        <div className="flex items-center">
          <PdvIcons name={props?.labelIcon ?? 'KeyArrowRight'} color="blue-500" size={props?.labelIconSize} />

          <label className={`body1 block font-semibold text-gray-500 ${props.labelClassName ? props.labelClassName : ''}`} htmlFor={props.id}>
            {props.label}
          </label>
        </div>
      )}
    </>
  )
}

export const GenericInput: React.ForwardRefRenderFunction<HTMLInputElement, IGenericField> = (props, ref) => {
  const registerOpts = props.form ? { ...props.form.register(props.name, props.options) } : {}
  const inputProps = props?.inputProps ? { ...props.inputProps } : {}

  const selectedVariant =
    props?.variant === 'outlined'
      ? 'rounded-xl shadow-md'
      : 'subtitle2 text-gray-500 rounded-md w-full transition ease-in-out focus:outline-none border-gray-300 hover:border-blue-500 focus:border-blue-500'

  const disabledStyles = 'disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed'

  if (props.textarea) return <GenericTextArea {...props} />

  let icon: string | ReactElement | undefined

  if (props.icon && typeof props.icon !== 'string') icon = props.icon
  if (typeof props.icon === 'string') icon = <PdvIcons className="mt-2" name={props.icon} color={props.iconColor ?? 'blue-500'} />

  if (icon)
    return (
      <div className={`flex items-center ${selectedVariant} overflow-hidden border`}>
        {props?.iconPosition !== 'right' && <span className="mx-4">{icon}</span>}
        <input
          id={props.id}
          {...props.inputProps}
          className={`focus:outline-none ${disabledStyles} ${props.iconPosition === 'right' ? 'px-4' : 'pr-4'} ${props.inputProps?.className ?? ''}`}
          style={{ height: 44 }}
        />
        {props?.iconPosition === 'right' && <span className="mr-4">{icon}</span>}
      </div>
    )

  if (props.datepickerAdornment)
    return (
      <div
        className={`flex items-center overflow-hidden rounded-md border border-gray-300 pr-2 hover:border-blue-500 focus:border-blue-500 ${disabledStyles} ${
          props.className ?? ''
        }`}
      >
        <div className="mr-4">{props.datepickerAdornment}</div>

        <input
          {...registerOpts}
          ref={ref}
          id={props.id}
          {...props.inputProps}
          className={`${selectedVariant} ${disabledStyles} ${props.inputProps?.className ?? ''}`}
          style={{ height: 44 }}
        />
      </div>
    )

  return (
    <>
      <input
        {...registerOpts}
        id={props?.id}
        {...inputProps}
        className={`border px-4 ${selectedVariant} ${disabledStyles} ${props.inputProps?.className ?? ''}`}
        style={{ height: 44 }}
      />
    </>
  )
}

export const ForwardedGenericInput = forwardRef(GenericInput)

export const GenericSelect = <T,>(props: IGenericSelect<T>) => {
  const { defaultOption = true } = props
  const registerOpts = props.form ? { ...props.form.register(props.name, props.options) } : {}

  const selectedVariant =
    props?.variant === 'outlined'
      ? 'rounded-xl bg-white shadow-sm'
      : 'rounded-md border transition ease-in-out focus:outline-none border-gray-300 hover:border-blue-500 focus:border-blue-500 text-gray-500'
  return (
    <select
      {...registerOpts}
      className={`inline-block h-9 appearance-none pl-4 pr-8 align-middle focus:outline-none md:h-11 ${selectedVariant} 
  ${props.selectProps?.className ?? ''}`}
      style={{
        background:
          'url(\'data:image/svg+xml,<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="%23bdbdbd" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>\') no-repeat right 0.5rem center/15px 15px',
        border: '1px solid red'
      }}
      disabled={props?.selectProps?.disabled}
    >
      {defaultOption && <option value="0">Selecciona una opción</option>}
      {props.selectOptions?.map((option) => (
        <option key={`select-key-${String(option[props.optionValue])}`} value={String(option[props.optionValue])}>
          {option[props.optionLabel]}
        </option>
      ))}
    </select>
  )
}

export const GenericTextArea = (props: IGenericField) => {
  const registerOpts = props.form ? { ...props.form.register(props.name, props.options) } : {}

  const selectedVariant =
    props?.variant === 'outlined'
      ? 'rounded-xl shadow-md'
      : 'subtitle2 text-gray-500 rounded-md w-full transition ease-in-out focus:outline-none border-gray-300 hover:border-blue-500 focus:border-blue-500'

  return (
    <textarea
      {...props.textareaProps}
      {...registerOpts}
      className={`border ${selectedVariant} p-4 ${props.textareaProps?.className ?? ''}`}
      id={props.id}
    />
  )
}

export const FormError: React.FC<TFormError> = (props) => {
  const errors = props?.errors[props.name]
  return <p className={`body1 text-red-600 ${props.errorClassName}`}>{errors?.message}</p>
}
