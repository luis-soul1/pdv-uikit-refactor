import { FieldValues } from "react-hook-form";

import FormError from "../FormError";
import { TDefaultFormProps } from "../Input/InputField";
import { LabelField, TLabelField } from "../LabelField";
import Textarea, { TTextarea } from "./TextArea";

export type TTextareaField<TFormValues extends FieldValues> = TTextarea<TFormValues> &
 TLabelField &
 TDefaultFormProps<TFormValues>;

const TextareaField = <TFormValues extends FieldValues>(props: TTextareaField<TFormValues>) => {
 return (
  <div className={props.className}>
   <div className={`flex gap-2 ${props?.labelPosition === "left" ? "flex-row" : "flex-col"}`}>
    {props?.label && <LabelField label={props.label} {...props} />}
    <Textarea {...props} textareaProps={{ ...props.textareaProps }} />
   </div>
   {props?.form && <FormError errorClassName={props.errorClassName} name={props.name} errors={props.form?.formState?.errors} />}
  </div>
 );
};

export default TextareaField;
