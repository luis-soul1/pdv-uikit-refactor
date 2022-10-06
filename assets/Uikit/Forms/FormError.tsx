import { FieldError, FieldValues } from "react-hook-form";

export type TFormError = {
  name: string;
  errorClassName?: string;
  errors: FieldValues;
};

export const FormError: React.FC<TFormError> = (props) => {
  const errors = () => {
    if (props.name.includes(".")) {
      const name = props.name.split(".");
      return props.errors[name[0]]?.[name[1]];
    }
    return props?.errors[props.name];
  };

  return (
    <p className={`body1 text-red-600 ${props.errorClassName}`}>
      {errors()?.message}
    </p>
  );
};

export default FormError;
