import React from "react";
import classNames from "classnames";
import { ESize } from "@/types/global.ts";

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  size?: ESize;
}

const Button = ({ disabled = false, size = ESize.Large, className,onClick, type, children, ...props }: Props) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames("whitespace-nowrap border border-black shadow-1xl disabled:cursor-not-allowed disabled:border-opacity-50 disabled:opacity-50", {
        ["py-1 px-3 text-md opacity-60"]: size === ESize.Small,
        ["py-2.5 px-4 text-xl"]: size === ESize.Medium,
        ["py-4 px-5 text-sm"]: size === ESize.Large,
      }, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;