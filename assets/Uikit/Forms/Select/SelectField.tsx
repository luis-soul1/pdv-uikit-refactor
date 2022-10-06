import { FieldValues } from "react-hook-form";

import { FormError } from "../FormError";
import LabelField, { TLabelField } from "../LabelField";
import Select, { TSelectProps } from "./Select";

type TSelectFieldProps<
  TSelectOptions,
  TFormValues extends FieldValues
> = TSelectProps<TSelectOptions, TFormValues> & TLabelField;

const SelectField = <TSelectOptions, TFormValues extends FieldValues>(
  props: TSelectFieldProps<TSelectOptions, TFormValues>
) => {
  const { className, errorClassName, form, options, ...restProps } = props;

  return (
    <div className={props.className}>
      <div
        className={`flex gap-2 ${
          props?.labelPosition === "left" ? "flex-row" : "flex-col"
        }`}
      >
        <LabelField {...props} />

        <Select {...restProps} form={props.form} options={options} />
      </div>
      <FormError name={props.name} errors={props.form.formState?.errors} />
    </div>
  );
};

export default SelectField;
