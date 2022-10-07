import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import { PdvIcons } from "@Uikit/PdvIcons";
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

export type TSelectProps<TSelectOptions, TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  form: UseFormReturn<TFormValues>;
  options?: RegisterOptions;
  id?: string;
  className?: string;
  errorClassName?: string;
  labelPosition?: "left" | "top";
  variant?: "default" | "outlined";
  selectOptions: TSelectOptions[];
  optionLabel: keyof TSelectOptions;
  optionValue: keyof TSelectOptions;
  value?: string[] | string;
  multiple?: boolean;
  disabled?: boolean;
};

const MenuProps = {
  disablePortal: true,
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const baseStyle = `rounded-md px-4 py-1 font-medium shadow-16`;
const inlineStyles = {
  borderBottom: "1px solid var(--gray-300)",
  padding: "0.5rem 1rem",
  fontSize: 14,
  fontWeight: 600,
  color: "var(--gray-500)",
};

const sxSelectStyles = {
  width: "100%",
  height: 44,
  ".MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root": {
    "&:hover": {
      borderColor: "var(--blue-500)",
    },
    "&:focus-within": {
      borderColor: "var(--blue-500)",
    },
    border: "1px solid var(--gray-300)",
    outline: "none",
  },
};

const Select = <TSelectOptions, TFormValues extends FieldValues>(
  props: TSelectProps<TSelectOptions, TFormValues>
) => {
  const selectedPillStyle = props.disabled
    ? "bg-gray-300 text-white border-none cursor-not-allowed"
    : "bg-teal-500 text-white";

  return (
    <Controller
      control={props.form?.control}
      name={props.name}
      rules={props?.options}
      render={({ field }) => {
        const { value, onChange: controllerOnChange, ...restFields } = field;
        const onChange = (event: SelectChangeEvent<unknown>) => {
          controllerOnChange(event);
          if (props?.options?.onChange) props.options.onChange(event);
        };

        return (
          <MuiSelect
            {...restFields}
            displayEmpty
            multiple={props?.multiple}
            value={props.selectOptions.length ? value : ""}
            onChange={onChange}
            disabled={!!props.disabled}
            sx={sxSelectStyles}
            renderValue={(selected: string | string[]) => {
              if (!props?.selectOptions.length)
                return (
                  <span className="text-gray-500">Selecione una opción</span>
                );

              if (props?.multiple && Array.isArray(selected)) {
                if (!selected.length)
                  return (
                    <span className="text-gray-500">Selecione una opción</span>
                  );

                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[])
                      .sort((a, b) => a.localeCompare(b))
                      .map((value: string) => (
                        <span
                          key={value}
                          className={`${baseStyle} ${selectedPillStyle}`}
                        >
                          {
                            props.selectOptions.find(
                              (option) =>
                                String(option[props.optionValue]) === value
                            )?.[props.optionLabel]
                          }
                        </span>
                      ))}
                  </Box>
                );
              }

              const selectedValue = props.selectOptions.find(
                (option) =>
                  String(option[props.optionValue]) === String(selected)
              )?.[props.optionLabel];

              return (
                <span className="text-gray-500">
                  {selectedValue ?? "Selecione una opción"}
                </span>
              );
            }}
            MenuProps={MenuProps}
          >
            <MenuItem value="" disabled={props.multiple} style={inlineStyles}>
              Seleccione una opción
            </MenuItem>
            {props.selectOptions?.map((option) => (
              <MenuItem
                key={`select-key-${String(option[props.optionValue])}`}
                value={String(option[props.optionValue])}
                style={inlineStyles}
              >
                {option[props.optionLabel]}
                {value &&
                  value.indexOf(String(option[props.optionValue])) !== -1 && (
                    <PdvIcons
                      className="ml-4"
                      name="TickSquare"
                      color="blue-500"
                    />
                  )}
              </MenuItem>
            ))}
          </MuiSelect>
        );
      }}
    />
  );
};

export default Select;
