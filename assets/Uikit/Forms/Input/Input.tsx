import { TColors } from "@Uikit/colors";
import { PdvIcons, TIconNames } from "@Uikit/PdvIcons";
import { forwardRef, ReactElement, RefObject } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

import MuiInput from "@mui/material/Input";
import { InputBaseComponentProps } from "@mui/material/InputBase";

export type TVariant = "default" | "outlined" | "transparent";
export type TBaseInput = {
  id?: string;
  variant?: TVariant;
  theme?: TColors;
  icon?: TIconNames;
  iconColor?: TColors;
  iconPosition?: "left" | "right";
  inputProps?: InputBaseComponentProps;
  controlFields?: ControllerRenderProps<Record<string, string>, string>;
  value?: string;
};

export const inputVariants: Record<TVariant, string> = {
  default:
    "rounded-md border border-gray-300 hover:border-blue-500 focus-within:border-blue-500 bg-white",
  outlined: "border-gray-300 border-b-2",
  transparent: "border-0",
};
export const disabledStyles =
  "disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed";

const BaseInput = forwardRef<HTMLInputElement, TBaseInput>((props, ref) => {
  const inputProps = props?.inputProps ? { ...props.inputProps } : {};
  const selectedVariant = props.variant
    ? inputVariants[props.variant]
    : inputVariants.default;

  if (props?.icon) {
    const icon =
      typeof props.icon === "string" ? (
        <PdvIcons
          className="mt-2"
          name={props.icon}
          color={props.iconColor ?? "blue-500"}
        />
      ) : (
        props.icon
      );

    return (
      <div
        className={`subtitle2 flex w-full items-center overflow-hidden text-gray-500 transition ease-in-out ${selectedVariant}`}
      >
        {props?.iconPosition !== "right" && (
          <span className="mx-4">{icon}</span>
        )}
        <MuiInput
          disableUnderline
          {...props?.controlFields}
          ref={ref}
          inputProps={inputProps}
          id={props?.id}
          className={`subtitle2 text-gray-500 focus:outline-none ${disabledStyles} ${
            props.iconPosition === "right" ? "px-4" : "pr-4"
          } ${props.inputProps?.className ?? ""}`}
          sx={{
            height: 44,
            "&.Mui-focused": { border: "2px solid var(--blue-500)" },
          }}
        />
        {props?.iconPosition === "right" && (
          <span className="mr-4">{icon}</span>
        )}
      </div>
    );
  }

  return (
    <>
      <MuiInput
        disableUnderline
        {...props?.controlFields}
        ref={ref}
        inputProps={inputProps}
        id={props?.id}
        className={`subtitle2 px-4 text-gray-500 focus:outline-none ${selectedVariant} ${disabledStyles} ${
          props.inputProps?.className ?? ""
        }`}
        sx={{ height: 44, paddingLeft: 16, paddingRight: 16 }}
      />
    </>
  );
});

export type TInput<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  form: UseFormReturn<TFormValues>;
  options?: RegisterOptions;
} & TBaseInput;
export const Input = <TFormValues extends FieldValues>(
  props: TInput<TFormValues>
) => {
  const { form, options, ...restProps } = props;

  return (
    <Controller
      name={props.name}
      control={form.control}
      rules={options}
      render={({ field: { value, ...restField } }) => {
        const inputValue = value;
        const controlFields = { value: inputValue, ...restField };

        return <BaseInput {...restProps} controlFields={controlFields} />;
      }}
    />
  );
};

export const ForwardedInput = forwardRef<HTMLInputElement, TBaseInput>(
  (props, ref) => <BaseInput ref={ref} {...props} />
);

export default Input;
