import { Controller, FieldValues, Path, RegisterOptions, UseFormReturn } from "react-hook-form";
import Input, { TInput } from "./Input";

export type TControlledInput<TFormValues extends FieldValues> = Omit<TInput, "name"> & {
 name: Path<TFormValues>;
 form: UseFormReturn<TFormValues>;
 options?: RegisterOptions;
};

export const ControlledInput = <TFormValues extends FieldValues>(props: TControlledInput<TFormValues>) => {
 const { form, options, ...restProps } = props;

 return (
  <Controller
   name={props.name}
   control={form.control}
   rules={options}
   render={({ field: { value, ...restField } }) => {
    const inputValue = value;
    const controlFields = { value: inputValue, ...restField };

    return <Input {...restProps} controlFields={controlFields} />;
   }}
  />
 );
};
