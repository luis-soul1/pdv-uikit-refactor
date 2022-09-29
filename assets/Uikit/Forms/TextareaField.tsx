import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react'

import FormError from './FormError'
import { TInputProps } from './InputField'
import { LabelField, TLabelField } from './LabelField'

export type TTextareaFieldProps = TextareaProps &
  Omit<TLabelField, 'label'> & { errorClassName?: string; labelPosition?: 'left' | 'top'; className?: string; label?: string }

const TextareaField = (props: TTextareaFieldProps) => {
  return (
    <div className={props.className}>
      <div className={`flex gap-2 ${props?.labelPosition === 'left' ? 'flex-row' : 'flex-col'}`}>
        {props?.label && <LabelField label={props.label} {...props} />}
        <Textarea {...props} textareaProps={{ ...props.textareaProps }} />
      </div>
      {props?.form && <FormError errorClassName={props.errorClassName} name={props.name} errors={props.form?.formState?.errors} />}
    </div>
  )
}

type TextareaProps = Omit<TInputProps, 'inputProps'> & {
  textareaProps: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
}

const Textarea = (props: TextareaProps) => {
  const { variant = 'default' } = props
  const registerOpts = props.form ? { ...props.form.register(props.name, props.options) } : {}
  const textareaProps = props?.textareaProps ? { ...props.textareaProps } : {}

  const inputVariants = {
    default:
      'subtitle2 text-gray-500 rounded-md w-full transition ease-in-out focus:outline-none border border-gray-300 hover:border-blue-500 focus:border-blue-500 bg-white',
    outlined: 'border-gray-300 border-b-2',
    transparent: 'subtitle2 text-gray-500 w-full transition ease-in-out focus:outline-none border-0'
  }

  const selectedVariant = inputVariants[variant]

  const disabledStyles = 'disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed'
  return <textarea {...registerOpts} {...textareaProps} className={`border ${selectedVariant} ${disabledStyles} p-4`} id={props.id} />
}

export default TextareaField
