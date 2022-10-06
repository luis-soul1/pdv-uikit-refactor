import { TimePickerProps, TimePicker } from "@mui/x-date-pickers";
import { Controller, FieldValues } from "react-hook-form";

import { PdvIcons } from "@Uikit/PdvIcons";

import FormError from "../FormError";
import LabelField, { TLabelField } from "../LabelField";
import Input, { TInput } from "../Input/Input";

type TTimepicker<TInputPropsDate, TDate, TFormValues extends FieldValues> = {
  muiTimePickerProps?: Partial<TimePickerProps<TInputPropsDate, TDate>>;
  disabled?: boolean;
  errorClassName?: string;
  labelPosition?: "left" | "top";
  className?: string;
} & TInput<TFormValues> &
  TLabelField;

const TimeField = <TInputPropsDate, TDate, TFormValues extends FieldValues>(
  props: TTimepicker<TInputPropsDate, TDate, TFormValues>
) => {
  const { icon, iconColor } = props;
  let pickerIcon = <PdvIcons name="TimeCircle" color="blue-500" />;

  if (icon && typeof icon !== "string") pickerIcon = icon;
  if (typeof icon === "string")
    pickerIcon = <PdvIcons name={icon} color={iconColor ?? "blue-500"} />;

  return (
    <Controller
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        const { onChange: controllerOnChange, ...restField } = field;
        const onChange = (
          value: TDate | null,
          keyboardInputValue?: string | undefined
        ) => {
          controllerOnChange(value);
          if (props.muiTimePickerProps?.onChange)
            props.muiTimePickerProps.onChange(value, keyboardInputValue);
        };

        return (
          <TimePicker
            {...restField}
            {...props?.muiTimePickerProps}
            disabled={props.disabled}
            onChange={onChange}
            components={{
              OpenPickerIcon: () => pickerIcon,
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => {
              const disabledStyles = props?.disabled
                ? "bg-gray-50 text-gray-400 border-gray-300 cursor-not-allowed"
                : "";

              return (
                <div className={props.className}>
                  <div
                    className={`flex gap-2 ${
                      props?.labelPosition === "left" ? "flex-row" : "flex-col"
                    }`}
                  >
                    {props?.label && <LabelField {...props} />}
                    <div className={`${disabledStyles}`}>
                      <div
                        className={`flex items-center overflow-hidden rounded-md border border-gray-300 hover:border-blue-500 focus:border-blue-500 ${disabledStyles} ${
                          props.className ?? ""
                        }`}
                        ref={inputRef}
                      >
                        <div className="mr-4">{InputProps?.endAdornment}</div>
                        <Input
                          name={props.name}
                          form={props.form}
                          id={props.id}
                          inputProps={{ ...inputProps, className: "pl-0" }}
                          variant="transparent"
                        />
                      </div>
                    </div>
                  </div>
                  <FormError
                    errorClassName={props.errorClassName}
                    name={props.name}
                    errors={props.form?.formState?.errors}
                  />
                </div>
              );
            }}
          />
        );
      }}
    />
  );
};

export default TimeField;
