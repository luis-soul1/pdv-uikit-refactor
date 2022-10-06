import {
  UseFormReturn,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";

import FormError from "../FormError";
import LabelField, { TLabelField } from "../LabelField";
import Input, { TInput } from "./Input";

export type TInputField<TFormValues extends FieldValues> =
  TInput<TFormValues> & {
    errorClassName?: string;
    labelPosition?: "left" | "top";
    className?: string;
  } & TLabelField;

const InputField = <TFormValues extends FieldValues>(
  props: TInputField<TFormValues>
) => {
  return (
    <div className={`${props.className}`}>
      <div
        className={`flex gap-2 ${
          props?.labelPosition === "left" ? "flex-row" : "flex-col"
        }`}
      >
        <LabelField {...props} />

        <Input {...props} inputProps={{ ...props.inputProps }} />
      </div>
      {props?.form && (
        <FormError
          errorClassName={props.errorClassName}
          name={props.name}
          errors={props.form?.formState?.errors}
        />
      )}
    </div>
  );
};

export default InputField;
