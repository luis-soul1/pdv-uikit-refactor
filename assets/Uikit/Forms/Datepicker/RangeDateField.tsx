import { PdvIcons } from "@Uikit/PdvIcons";
import DateField from "./DateField";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type TRangeDateField<TFormValues extends FieldValues> = {
  nameFrom: Path<TFormValues>;
  nameTo: Path<TFormValues>;
  form: UseFormReturn<TFormValues>;
};

const RangeDateField = <TFormValues extends FieldValues>(
  props: TRangeDateField<TFormValues>
) => {
  return (
    <div className="flex items-center gap-2 rounded-md border bg-white">
      <DateField
        name={props.nameFrom}
        form={props.form}
        viewType="day"
        variant="transparent"
      />

      <PdvIcons
        name="KeyArrowRight"
        color="blue-500"
        className="text-gray-400"
      />

      <DateField
        name={props.nameTo}
        form={props.form}
        viewType="day"
        variant="transparent"
      />
    </div>
  );
};

export default RangeDateField;
