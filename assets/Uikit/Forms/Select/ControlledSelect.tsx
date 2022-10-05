import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import { Controller, FieldValues } from "react-hook-form";

import { baseStyle, inlineStyles, MenuProps, TSelectProps } from "./Select";
import { TDefaultFormProps } from "./SelectField";

type TControlledSelectProps<TFormValues extends FieldValues, TSelectOptions> = Omit<TSelectProps<TSelectOptions>, "name"> &
 TDefaultFormProps<TFormValues>;

const ControlledSelect = <TFormValues extends FieldValues, TSelectOptions>(
 props: TControlledSelectProps<TFormValues, TSelectOptions>
) => {
 const selectedPillStyle = props.disabled ? "bg-gray-300 text-white border-none cursor-not-allowed" : "bg-teal-500 text-white";

 return (
  <Controller
   control={props.form?.control}
   name={props.name}
   rules={props?.options}
   render={({ field }) => {
    const { value, onChange: controllerOnChange, ...restFields } = field;

    const onChange = (event: SelectChangeEvent<unknown>, child: React.ReactNode) => {
     if (props.selectOptions.length) controllerOnChange(event);
     if (props?.onChange) props?.onChange(event, child);
    };

    return (
     <MuiSelect
      {...restFields}
      value={value ?? ""}
      onChange={onChange}
      disabled={!!props.disabled}
      sx={{ width: "100%", height: 44 }}
      renderValue={(selected) =>
       props?.multiple ? (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
         {(selected as string[])
          .sort((a, b) => a.localeCompare(b))
          .map((value: string) => (
           <span key={value} className={`${baseStyle} ${selectedPillStyle}`}>
            {props.selectOptions.find((option) => String(option[props.optionValue]) === value)?.[props.optionLabel]}
           </span>
          ))}
        </Box>
       ) : (
        <span className='text-gray-500'>
         {props.selectOptions.find((option) => String(option[props.optionValue]) === value)?.[props.optionLabel]}
        </span>
       )
      }
      MenuProps={MenuProps}
     >
      <MenuItem value='' style={inlineStyles}>
       Seleccione una opción
      </MenuItem>
      {props.selectOptions?.map((option) => (
       <MenuItem
        key={`select-key-${String(option[props.optionValue])}`}
        value={String(option[props.optionValue])}
        style={inlineStyles}
       >
        {option[props.optionLabel]}
       </MenuItem>
      ))}
     </MuiSelect>
    );
   }}
  />
 );
};

export default ControlledSelect;

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
