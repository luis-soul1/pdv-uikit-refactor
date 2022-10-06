import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import {
  Controller,
  FieldValues,
  ControllerRenderProps,
  UseFormReturn,
} from "react-hook-form";

import { PdvIcons } from "@Uikit/PdvIcons";

import FormError from "../FormError";
import LabelField, { TLabelField } from "../LabelField";
import Input, { TInput } from "../Input/Input";

type TDatepicker<TFormValues extends FieldValues> = {
  className?: string;
  viewType?: "day" | "month" | "year";
  labelPosition?: "left" | "top";
  errorClassName?: string;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  disabled?: boolean;
  shouldDisableYear?: (date: Dayjs) => boolean;
  shouldDisableMonth?: (date: Dayjs) => boolean;
  shouldDisableDate?: (date: Dayjs) => boolean;
} & TInput<TFormValues> &
  TLabelField;

const DateField = <TDate, TFormValues extends FieldValues>(
  props: TDatepicker<TFormValues>
) => {
  const { icon, viewType = "day", iconColor } = props;
  let dateIcon = <PdvIcons name="Calendar" color="blue-500" />;

  if (icon && typeof icon !== "string") dateIcon = icon;
  if (typeof icon === "string")
    dateIcon = <PdvIcons name={icon} color={iconColor ?? "blue-500"} />;

  return (
    <Controller
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        return (
          <DatePicker
            {...field}
            views={[viewType]}
            shouldDisableYear={props?.shouldDisableYear}
            shouldDisableMonth={props?.shouldDisableMonth}
            shouldDisableDate={props?.shouldDisableDate}
            disabled={props.disabled}
            minDate={props?.minDate}
            maxDate={props?.maxDate}
            components={{
              OpenPickerIcon: () => dateIcon,
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

export default DateField;
