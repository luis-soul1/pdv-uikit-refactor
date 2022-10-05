import { UseFormReturn, RegisterOptions, FieldValues, Path } from "react-hook-form";

import FormError from "../FormError";
import LabelField, { TLabelField } from "../LabelField";
import Input, { TInput } from "./Input";
import { ControlledInput } from "./ControlledInput";

export type TDefaultFormProps<TFormValues extends FieldValues> = {
 name: Path<TFormValues>;
 errorClassName?: string;
 labelPosition?: "left" | "top";
 className?: string;
 form?: UseFormReturn<TFormValues>;
 options?: RegisterOptions;
};

export type TInputField<TFormValues extends FieldValues> = Omit<TInput, "name"> & TLabelField & TDefaultFormProps<TFormValues>;

const InputField = <TFormValues extends FieldValues>(props: TInputField<TFormValues>) => {
 return (
  <div className={props.className}>
   <div className={`flex gap-2 ${props?.labelPosition === "left" ? "flex-row" : "flex-col"}`}>
    <LabelField label={props.label} />
    {props?.form ? <ControlledInput form={props.form} {...props} /> : <Input {...props} inputProps={{ ...props.inputProps }} />}
   </div>
   {props?.form && <FormError errorClassName={props.errorClassName} name={props.name} errors={props.form?.formState?.errors} />}
  </div>
 );
};

export default InputField;
