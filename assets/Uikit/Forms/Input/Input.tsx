import { TColors } from "@Uikit/colors";
import { PdvIcons, TIconNames } from "@Uikit/PdvIcons";
import { ReactElement } from "react";
import { ControllerRenderProps } from "react-hook-form";

import MuiInput from "@mui/material/Input";
import { InputBaseComponentProps } from "@mui/material/InputBase";

export type TVariant = "default" | "outlined" | "transparent";
export type TInput = {
 name: string;
 id?: string;
 variant?: TVariant;
 theme?: TColors;
 icon?: TIconNames | ReactElement;
 iconColor?: TColors;
 iconPosition?: "left" | "right";
 inputProps?: InputBaseComponentProps;
 controlFields?: ControllerRenderProps<Record<string, string>, string>;
 value?: string;
};

export const inputVariants: Record<TVariant, string> = {
 default: "rounded-md border border-gray-300 hover:border-blue-500 focus:border-blue-500 bg-white",
 outlined: "border-gray-300 border-b-2",
 transparent: "border-0",
};
export const disabledStyles = "disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-not-allowed";
let icon: string | ReactElement | undefined;

const Input = (props: TInput) => {
 const inputProps = props?.inputProps ? { ...props.inputProps } : {};
 const selectedVariant = props.variant ? inputVariants[props.variant] : inputVariants.default;

 if (props.icon && typeof props.icon !== "string") icon = props.icon;
 if (typeof props.icon === "string") icon = <PdvIcons className='mt-2' name={props.icon} color={props.iconColor ?? "blue-500"} />;
 if (icon)
  return (
   <div className={`subtitle2 flex w-full items-center overflow-hidden text-gray-500 transition ease-in-out ${selectedVariant}`}>
    {props?.iconPosition !== "right" && <span className='mx-4'>{icon}</span>}
    <MuiInput
     disableUnderline
     {...props?.controlFields}
     inputProps={inputProps}
     id={props.id}
     className={`focus:outline-none ${disabledStyles} ${props.iconPosition === "right" ? "px-4" : "pr-4"} ${
      props.inputProps?.className ?? ""
     }`}
     sx={{ height: 44 }}
    />
    {props?.iconPosition === "right" && <span className='mr-4'>{icon}</span>}
   </div>
  );

 return (
  <>
   <MuiInput
    disableUnderline
    {...props?.controlFields}
    id={props?.id}
    inputProps={inputProps}
    className={`px-4 focus:outline-none ${selectedVariant} ${disabledStyles} ${props.inputProps?.className ?? ""}`}
    sx={{ height: 44, paddingLeft: 16, paddingRight: 16 }}
   />
  </>
 );
};

export default Input;
