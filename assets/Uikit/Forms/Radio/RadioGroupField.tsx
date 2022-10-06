import { ReactElement, Fragment } from "react";

import { Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import {
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import { TColors } from "@Uikit/colors";

type TRadioGroupProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  form: UseFormReturn<TFormValues>;
  defaultValue: string;
  options?: RegisterOptions;
  radioOptions: TRadio[];
  divider?: boolean;
  alignment?: "horizontal" | "vertical";
  color?: TColors;
  textColor?: TColors;
};

export type TRadio = {
  label: string | ReactElement;
  value: string;
};

export const RadioGroupField = <TFormValues extends FieldValues>(
  props: TRadioGroupProps<TFormValues>
) => {
  const { alignment = "vertical" } = props;
  const customRadioStyle = {
    color: `var(--${props?.color ?? "teal-600"})`,
    "&.Mui-checked": {
      color: `var(--${props?.color ?? "teal-600"})`,
    },
  };

  return (
    <Controller
      name={props.name}
      control={props.form.control}
      render={({ field: { onChange, value } }) => {
        return (
          <RadioGroup
            row={alignment === "horizontal"}
            value={value}
            onChange={(e, value) => {
              onChange(e, value);
              if (props?.options?.onChange) props.options.onChange(e);
            }}
          >
            {props.radioOptions?.map((option) => (
              <Fragment key={option.value}>
                <FormControlLabel
                  value={option.value}
                  label={
                    typeof option.label === "string" ? (
                      <label
                        className={`subtitle1 pointer-events-none`}
                        style={{
                          color: `var(--${props?.textColor ?? "gray-500"})`,
                        }}
                      >
                        {option.label}
                      </label>
                    ) : (
                      <span className="pointer-events-none">
                        {option.label}
                      </span>
                    )
                  }
                  name={props.name}
                  control={<Radio sx={customRadioStyle} />}
                />

                {props.divider && <Divider className="b-gray-100 my-1.5" />}
              </Fragment>
            ))}
          </RadioGroup>
        );
      }}
    />
  );
};

export default RadioGroupField;
