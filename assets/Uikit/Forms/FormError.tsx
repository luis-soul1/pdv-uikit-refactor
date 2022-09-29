import { FieldError } from 'react-hook-form'

export type TFormError = {
  name: string
  errorClassName?: string
  errors: {
    [x: string]: FieldError
  }
}

export const FormError: React.FC<TFormError> = (props) => {
  const errors = props?.errors[props.name]
  return <p className={`body1 text-red-600 ${props.errorClassName}`}>{errors?.message}</p>
}

export default FormError
