import { forwardRef } from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

export type TSelectProps<T> = {
 name: string;
 id?: string;
 className?: string;
 errorClassName?: string;
 labelPosition?: "left" | "top";
 variant?: "default" | "outlined";
 selectOptions: T[];
 optionLabel: keyof T;
 optionValue: keyof T;
 value?: string[];
 multiple?: boolean;
 disabled?: boolean;
 onChange?: ((event: SelectChangeEvent<unknown>, child: React.ReactNode) => void) | undefined;
 formControllerFields?: ControllerRenderProps<FieldValues, string>;
};

export const MenuProps = {
 PaperProps: {
  style: {
   maxHeight: 48 * 4.5 + 8,
   width: 250,
  },
 },
};

export const baseStyle = `rounded-md px-4 py-1 font-medium shadow-16`;
export const inlineStyles = {
 borderBottom: "1px solid var(--gray-300)",
 padding: "0.5rem 1rem",
 fontSize: 14,
 fontWeight: 600,
 color: "var(--gray-500)",
};

export const Select = <T,>(props: TSelectProps<T>) => {
 const selectedPillStyle = props.disabled ? "bg-gray-300 text-white border-none cursor-not-allowed" : "bg-teal-500 text-white";

 return (
  <MuiSelect
   {...props.formControllerFields}
   displayEmpty
   onChange={props?.onChange}
   disabled={!!props.disabled}
   sx={{ width: "100%", height: 44 }}
   renderValue={(selected: string[]) =>
    props?.multiple ? (
     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
      {selected
       .sort((a, b) => a.localeCompare(b))
       .map((value: string) => (
        <span key={value} className={`${baseStyle} ${selectedPillStyle}`}>
         {props.selectOptions.find((option) => String(option[props.optionValue]) === value)?.[props.optionLabel]}
        </span>
       ))}
     </Box>
    ) : (
     <span className='text-gray-500'>
      {props.selectOptions.find((option) => String(option[props.optionValue]) === String(selected))?.[props.optionLabel]}
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
};

export default Select;

export const ForwardedSelect = forwardRef(Select);
