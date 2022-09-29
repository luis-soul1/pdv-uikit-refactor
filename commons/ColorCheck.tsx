import { ChangeEvent } from 'react'

import { Controller, UseFormReturn } from 'react-hook-form'

type TCircleCheck = {
  disabled?: boolean
  name: string
  value: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  form: UseFormReturn<Record<string, string>>
}

const CircleCheck = (props: TCircleCheck) => {
  const checkedStyles = `after:content-[' '] 
  after:absolute 
  after:table 
  after:border-[3px] after:border-white 
  after:w-[7px] after:h-4
  after:rounded-full 
  after:top-[6px] after:left-[10px] 
  after:rotate-45 after:translate-2/4 after:scale-100	
  after:border-t-0 after:border-l-0`

  const disabledStyles = 'bg-gray-100 border-gray-300 cursor-not-allowed'
  return (
    <Controller
      name={props.name}
      control={props.form.control}
      render={({ field }) => {
        const { onChange: controllerOnChange, ...restField } = field
        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
          controllerOnChange(e)
          if (props?.onChange) props.onChange(e)
        }
        return (
          <div className="flex items-center justify-center">
            <span
              className={`relative block h-[32px] w-[32px]  rounded-full transition ${field.value === props.value ? checkedStyles : ''} ${
                props?.disabled ? disabledStyles : 'cursor-pointer'
              }`}
              style={{ backgroundColor: props.value, border: `2px solid ${props.value}` }}
            >
              <input
                type="radio"
                className={`absolute h-full w-full opacity-0 ${props.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onChange={onChange}
                {...restField}
                value={props.value}
                disabled={!!props.disabled}
              />
            </span>
          </div>
        )
      }}
    />
  )
}

export default CircleCheck
