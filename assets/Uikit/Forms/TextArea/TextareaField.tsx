import { FieldValues } from "react-hook-form";

import FormError from "../FormError";
import { LabelField, TLabelField } from "../LabelField";
import Textarea, { TTextArea } from "./TextArea";

export type TTextAreaField<TFormValues extends FieldValues> =
  TTextArea<TFormValues> &
    TLabelField & {
      errorClassName?: string;
      labelPosition?: "left" | "top";
      className?: string;
    };

const TextAreaField = <TFormValues extends FieldValues>(
  props: TTextAreaField<TFormValues>
) => {
  return (
    <div className={props.className}>
      <div
        className={`flex gap-2 ${
          props?.labelPosition === "left" ? "flex-row" : "flex-col"
        }`}
      >
        {props?.label && <LabelField label={props.label} {...props} />}
        <Textarea {...props} textareaProps={{ ...props.textareaProps }} />
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

export default TextAreaField;
