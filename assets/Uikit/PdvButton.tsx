import Link from "next/link";
import { ElementType, ReactElement } from "react";

import LoadingButton from "@mui/lab/LoadingButton";
import { Button, CircularProgress } from "@mui/material";

import { TColors } from "./colors";
import { PdvIcons, TIconNames } from "./PdvIcons";

export type TButtonVariant = "contained" | "outlined" | "default";
export type TButtonTheme =
  | "indigo-700"
  | "indigo-500"
  | "teal-500"
  | "green-600"
  | "blue-500"
  | "blue-400"
  | "blue-100"
  | "orange-400"
  | "orange-600"
  | "orange-700"
  | "rose-400"
  | "rose-500"
  | "yellow-600"
  | "yellow-700"
  | "gray-500"
  | "gray-300"
  | "black"
  | "white";
export type TButtonSize = "small" | "medium" | "large";

type TPdvButton = {
  className?: string;
  variant?: TButtonVariant;
  theme?: TButtonTheme;
  color?: TColors;
  textColor?: TColors;
  size?: TButtonSize;
  asLink?: boolean;
  href?: string;
  noShadow?: boolean;
  type?: "submit" | "button" | "reset";
  icon?: TIconNames | ReactElement;
  iconPosition?: "left" | "right";
  pdvIconSize?: "small" | "medium" | "large" | "xlarge" | number;
  disabled?: boolean;
  loading?: boolean;
  component?: ElementType;
  onClick?: () => void;
};

const PdvButton: React.FC<TPdvButton> = (props) => {
  const {
    children,
    className,
    variant = "contained",
    theme,
    asLink,
    pdvIconSize,
    loading,
    noShadow,
    iconPosition = "left",
    disabled = false,
    color = "default-color",
    textColor,
    ...rest
  } = props;

  const disabledStyles =
    "cursor-not-allowed opacity-50 bg-gray-200 text-gray-600 border-none";

  const structure = `normal-case transition duration-200 ${
    !props?.disabled ? "hover:opacity-70" : ""
  }`;

  const buttonStyles = () => {
    let backgroundColor;
    let selectedTextColor;
    let borderColor;
    let border;

    if (variant === "contained") {
      backgroundColor = `var(--${color})`;
      selectedTextColor = textColor ? `var(--${textColor})` : "var(--white)";
      border = "none";
    }

    if (variant === "outlined") {
      backgroundColor = "var(--transparent)";
      selectedTextColor = textColor
        ? `var(--${textColor})`
        : `var(--${props.color})`;
      border = "1px solid var(--${color})";
    }

    if (variant === "default") {
      backgroundColor = "var(--transparent)";
      selectedTextColor = textColor
        ? `var(--${textColor})`
        : `var(--${props.color})`;
      border = `none`;
    }

    return {
      backgroundColor,
      color: selectedTextColor,
      border,
    };
  };

  const setIcon = () => {
    if (!props.icon) return;
    if (typeof props.icon === "string") {
      return (
        <PdvIcons
          name={props.icon}
          color={variant !== "contained" ? props.color : "white"}
          className="mr-1"
          size={props.pdvIconSize ?? "medium"}
        />
      );
    }
    return props.icon;
  };

  if (props.asLink)
    return (
      <Link href={props.href ?? ""} passHref>
        <Button
          className={`${className ?? ""} ${structure} ${
            disabled ? disabledStyles : ""
          }`}
          {...rest}
          sx={{
            borderStyle: "solid",
            borderRadius: "8px",
            paddingLeft: 2,
            paddingRight: 2,
          }}
          style={{ ...buttonStyles() }}
          disabled={disabled}
        >
          <div className="total-center gap-1">
            {iconPosition === "left" && setIcon()}
            <h6
              className={`flex items-center ${
                props.size?.includes("small") ? "subtitle2" : "subtitle1"
              }`}
            >
              {children}
            </h6>
            {iconPosition === "right" && setIcon()}
          </div>
        </Button>
      </Link>
    );

  if (loading)
    return (
      <LoadingButton
        loading={loading}
        className={`${className ?? ""} ${structure} ${
          disabled ? disabledStyles : ""
        }`}
        {...rest}
        loadingIndicator={<CircularProgress className="text-white" size={14} />}
        sx={{
          borderStyle: "solid",
          borderRadius: "8px",
          paddingLeft: 2,
          paddingRight: 2,
        }}
        style={{ ...buttonStyles() }}
        disabled={disabled}
      >
        <span className="invisible">{children}</span>
      </LoadingButton>
    );

  return (
    <span className={`${props?.disabled ? "cursor-not-allowed" : ""}`}>
      <Button
        className={`${className ?? ""} ${structure} ${
          disabled ? disabledStyles : ""
        }`}
        {...rest}
        sx={{
          borderStyle: "solid",
          borderRadius: "8px",
          paddingLeft: 2,
          paddingRight: 2,
        }}
        style={{ ...buttonStyles() }}
        disabled={disabled}
      >
        <div className="total-center gap-1">
          {iconPosition === "left" && setIcon()}
          <h6
            className={`flex items-center ${
              props.size?.includes("small") ? "subtitle2" : "subtitle1"
            }`}
          >
            {children}
          </h6>
          {iconPosition === "right" && setIcon()}
        </div>
      </Button>
    </span>
  );
};

export default PdvButton;
