import Autocomplete from "@mui/material/Autocomplete";
import { PdvIcons } from "@Uikit/PdvIcons";
import Input, { TInput, ForwardedInput } from "../Input/Input";

import {
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import { SyntheticEvent } from "react";
import { AutocompleteValue } from "@mui/material/useAutocomplete";

export type TAutocomplete<TFormValues extends FieldValues, TOptions> = {
  name: Path<TFormValues>;
  form: UseFormReturn<TFormValues>;
  options?: RegisterOptions /* & {
    onChange: (
      event: SyntheticEvent<Element, Event>,
      value: AutocompleteValue<
        TOption,
        PathValue<TFormValues, Path<TFormValues>>,
        undefined,
        true
      >
    ) => void;
  }; */;
  autocompleteOptions: TOption[];
};

export type TOption = {
  label: string;
  value: string;
};

const AutocompleteField = <TFormValues extends FieldValues, TOptions>(
  props: TAutocomplete<TFormValues, TOptions>
) => {
  return (
    <Controller
      name={props.name}
      control={props.form.control}
      rules={props.options}
      render={({ field }) => {
        const { value, onChange: controllerOnChange, ...restFields } = field;

        const onChange = (
          event: SyntheticEvent<Element, Event>,
          value: AutocompleteValue<
            TOption,
            PathValue<TFormValues, Path<TFormValues>>,
            undefined,
            true
          >
        ) => {
          console.log("entra en onchange, event, value");
          controllerOnChange(value);
          if (props?.options?.onChange) props.options.onChange(value);
        };

        return (
          <Autocomplete
            id={props.name}
            value={value}
            onChange={(e, value) => onChange(e, value)}
            {...restFields}
            freeSolo
            clearOnBlur
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            noOptionsText="No se encontraron resultados"
            getOptionLabel={(option) => option.label}
            options={props.autocompleteOptions}
            sx={{ "&.Mui-focused .MuiInput-root": { border: 0 } }}
            renderInput={({
              InputProps: { ref: anchorListRef },
              inputProps: muiInputProps,
            }) => (
              <div ref={anchorListRef} className="mt-4 max-w-xs shadow-16">
                <ForwardedInput
                  id={props.name}
                  icon="Search"
                  iconColor="teal-500"
                  inputProps={muiInputProps}
                />
              </div>
            )}
          />
        );
      }}
    />
  );
};

export default AutocompleteField;
