import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";

import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { disabledStyles, inputVariants, TInput } from "../Input/Input";

type TDefaultTextAreaProps<TFormValues extends FieldValues> = {
  textareaProps: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  name: Path<TFormValues>;
  form?: UseFormReturn<TFormValues>;
  options?: RegisterOptions;
};

export type TTextArea<TFormValues extends FieldValues> = Omit<
  TInput<TFormValues>,
  "inputProps"
> &
  TDefaultTextAreaProps<TFormValues>;

const TextArea = <TFormValues extends FieldValues>(
  props: TTextArea<TFormValues>
) => {
  const registerOpts = props.form
    ? { ...props.form.register(props.name, props.options) }
    : {};

  const selectedVariant = props.variant
    ? inputVariants[props.variant]
    : inputVariants.default;

  return (
    <textarea
      {...registerOpts}
      {...props.textareaProps}
      className={`p-4 focus:outline-none ${selectedVariant} ${disabledStyles}`}
      id={props.id}
    />
  );
};

export default TextArea;
