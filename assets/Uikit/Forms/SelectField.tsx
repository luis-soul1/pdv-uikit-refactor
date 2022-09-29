import { forwardRef, useEffect } from 'react'

import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select'
import { Controller, ControllerRenderProps, FieldValues, Path, RegisterOptions, UseFormReturn } from 'react-hook-form'

import { FormError } from './FormError'
import LabelField, { TLabelField } from './LabelField'

type TSelectFieldProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  form: UseFormReturn<TFormValues>
  options?: RegisterOptions
  label?: string
  className?: string
  errorClassName?: string
} & Omit<TSelectProps<TFormValues>, 'name'> &
  Omit<TLabelField, 'label'>

const SelectField = <TFormValues extends FieldValues>(props: TSelectFieldProps<TFormValues>) => {
  const { className, errorClassName, ...restProps } = props
  return (
    <div className={props.className}>
      <div className={`flex gap-2 ${props?.labelPosition === 'left' ? 'flex-row' : 'flex-col'}`}>
        {props?.label && <LabelField label={props.label} />}
        {props?.form ? <ControlledSelect {...restProps} form={props.form} /> : <Select {...restProps} />}
      </div>
      {props?.form && <FormError name={props.name} errors={props.form?.formState?.errors} />}
    </div>
  )
}

export type TSelectProps<T> = {
  name: string
  id?: string
  labelPosition?: 'left' | 'top'
  variant?: 'default' | 'outlined'
  selectOptions: T[]
  optionLabel: keyof T
  optionValue: keyof T
  value?: string[]
  multiple?: boolean
  disabled?: boolean
  onChange?: ((event: SelectChangeEvent<unknown>, child: React.ReactNode) => void) | undefined
  formControllerFields?: ControllerRenderProps<FieldValues, string>
}

export const Select = <T,>(props: TSelectProps<T>, ref: React.ForwardedRef<HTMLSelectElement>) => {
  const baseStyle = `rounded-md px-4 py-1 font-medium shadow-16`
  const selectedPillStyle = props.disabled ? 'bg-gray-300 text-white border-none cursor-not-allowed' : 'bg-teal-500 text-white'

  return (
    <MuiSelect
      {...props.formControllerFields}
      ref={ref}
      displayEmpty
      onChange={props?.onChange}
      disabled={!!props.disabled}
      sx={{ width: '100%', height: 44 }}
      renderValue={(selected: string[]) =>
        props?.multiple ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected
              .sort((a, b) => a.localeCompare(b))
              .map((value: string) => (
                <span key={value} className={`${baseStyle} ${selectedPillStyle}`}>
                  {props.selectOptions.find((option) => String(option[props.optionValue]) === value)?.[props.optionLabel]}
                </span>
              ))}
          </Box>
        ) : (
          <span className="text-gray-500">{selected}</span>
        )
      }
      MenuProps={MenuProps}
    >
      <MenuItem value="" style={getStyles()}>
        Seleccione una opción
      </MenuItem>
      {props.selectOptions?.map((option) => (
        <MenuItem key={`select-key-${String(option[props.optionValue])}`} value={String(option[props.optionValue])} style={getStyles()}>
          {option[props.optionLabel]}
        </MenuItem>
      ))}
    </MuiSelect>
  )
}

export const ForwardedSelect = forwardRef(Select)

type TControlledSelectProps<TFormValues extends FieldValues> = Omit<TSelectProps<TFormValues>, 'name'> & {
  name: Path<TFormValues>
  form: UseFormReturn<TFormValues>
  options?: RegisterOptions
}

const ControlledSelect = <TFormValues extends FieldValues>(props: TControlledSelectProps<TFormValues>) => {
  const baseStyle = `rounded-md px-4 py-1 font-medium shadow-16`
  const selectedPillStyle = props.disabled ? 'bg-gray-300 text-white border-none cursor-not-allowed' : 'bg-teal-500 text-white'

  return (
    <Controller
      control={props.form.control}
      name={props.name}
      rules={props?.options}
      render={({ field }) => {
        const { value, onChange: controllerOnChange, ...restFields } = field

        const onChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
          if (props.selectOptions.length) controllerOnChange(event)
          if (props?.onChange) props?.onChange(event, child)
        }

        useEffect(() => {
          if (props?.value && props?.selectOptions.length) {
            controllerOnChange(props.value)
          }
        }, [props.form.watch(props?.name), props.selectOptions])

        return (
          <MuiSelect
            {...restFields}
            value={value ?? ''}
            onChange={onChange}
            disabled={!!props.disabled}
            sx={{ width: '100%', height: 44 }}
            renderValue={(selected) =>
              props?.multiple ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected
                    .sort((a, b) => a.localeCompare(b))
                    .map((value: string) => (
                      <span key={value} className={`${baseStyle} ${selectedPillStyle}`}>
                        {props.selectOptions.find((option) => String(option[props.optionValue]) === value)?.[props.optionLabel]}
                      </span>
                    ))}
                </Box>
              ) : (
                <span className="text-gray-500">
                  {props.selectOptions.find((option) => String(option[props.optionValue]) === value)?.[props.optionLabel]}
                </span>
              )
            }
            MenuProps={MenuProps}
          >
            <MenuItem value="" style={getStyles()}>
              Seleccione una opción
            </MenuItem>
            {props.selectOptions?.map((option) => (
              <MenuItem key={`select-key-${String(option[props.optionValue])}`} value={String(option[props.optionValue])} style={getStyles()}>
                {option[props.optionLabel]}
              </MenuItem>
            ))}
          </MuiSelect>
        )
      }}
    />
  )
}

// interface IMultiSelect<T> extends IGenericSelect<T> {
//   form: UseFormReturn
//   disabled?: boolean
//   selectedColor?: string
//   onChange?: ((event: SelectChangeEvent<unknown>, child: React.ReactNode) => void) | undefined
// }

// export const MultiSelect = <T,>(props: IMultiSelect<T>) => {
//   return (
//     <Controller
//       control={props.form.control}
//       name={props.name}
//       render={({ field }) => {
//         const { value, onChange: controllerOnChange, ...restFields } = field

//         const onChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
//           controllerOnChange(event)
//           if (props?.onChange) props?.onChange(event, child)
//         }

//         const baseStyle = `rounded-md px-4 py-1 font-medium shadow-16`
//         const selectedPillStyle = props.disabled ? 'bg-gray-300 text-white border-none cursor-not-allowed' : 'bg-teal-500 text-white'

//         return (
//           <Select
//             multiple
//             {...restFields}
//             onChange={(e, child) => onChange(e, child)}
//             value={value ?? []}
//             disabled={!!props.disabled}
//             sx={{ width: '100%' }}
//             input={<Input name="select-input" />}
//             renderValue={(selected: string[]) => (
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                 {selected
//                   .sort((a, b) => a.localeCompare(b))
//                   .map((value: string) => (
//                     <span key={value} className={`${baseStyle} ${selectedPillStyle}`} style={{ backgroundColor: props.selectedColor }}>
//                       {props.selectOptions.find((option) => String(option[props.optionValue]) === value)?.[props.optionLabel]}
//                     </span>
//                   ))}
//               </Box>
//             )}
//             MenuProps={MenuProps}
//           >
//             {props.selectOptions?.map((option) => (
//               <MenuItem key={String(option[props.optionValue])} value={String(option[props.optionValue])} style={getStyles()}>
//                 {option[props.optionLabel]}
//                 {value && value.indexOf(String(option[props.optionValue])) !== -1 && <PdvIcons className="ml-4" name="TickSquare" color="blue-500" />}
//               </MenuItem>
//             ))}
//           </Select>
//         )
//       }}
//     />
//   )
// }

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250
    }
  }
}

function getStyles() {
  return {
    borderBottom: '1px solid var(--gray-300)',
    padding: '0.5rem 1rem',
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--gray-500)'
  }
}

export default SelectField
