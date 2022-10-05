import { FieldValues, Path, RegisterOptions, UseFormReturn } from "react-hook-form";

import { FormError } from "../FormError";
import LabelField, { TLabelField } from "../LabelField";
import Select, { TSelectProps } from "./Select";
import ControlledSelect from "./ControlledSelect";

export type TDefaultFormProps<TFormValues extends FieldValues> = {
 name: Path<TFormValues>;
 form?: UseFormReturn<TFormValues>;
 options?: RegisterOptions;
};

type TSelectFieldProps<TFormValues extends FieldValues, TSelectOptions> = TDefaultFormProps<TFormValues> &
 Omit<TSelectProps<TSelectOptions>, "name"> &
 TLabelField;

const SelectField = <TFormValues extends FieldValues, TSelectOptions>(props: TSelectFieldProps<TFormValues, TSelectOptions>) => {
 const { className, errorClassName, form, options, ...restProps } = props;

 return (
  <div className={props.className}>
   <div className={`flex gap-2 ${props?.labelPosition === "left" ? "flex-row" : "flex-col"}`}>
    <LabelField {...props} />
    {props?.form && props.selectOptions.length > 0 ? (
     <ControlledSelect {...restProps} form={props.form} />
    ) : (
     <Select {...restProps} />
    )}
   </div>
   {props?.form && <FormError name={props.name} errors={props.form?.formState?.errors} />}
  </div>
 );
};

export default SelectField;
