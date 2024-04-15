import classNames from "classnames";
import type { ChangeEvent, FocusEvent, KeyboardEvent, LegacyRef } from "react";
import type { RegisterOptions, UseFormRegister } from "react-hook-form";
import { forwardRef, useMemo, useState } from "react";

import { ESize } from "@/types/global.ts";
import { EInputType } from "@/types/input.ts";

import HideEye from "@/assets/HideEye.svg?react";
import Eye from "@/assets/Eye.svg?react";

interface Props {
  className?: string;
  name: string;
  type?: EInputType;
  size?: ESize;
  error: string | undefined;
  containerClassName?: string;
  value?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent, value: string) => void;
  disabled?: boolean;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
  register: UseFormRegister<any>;
  rules: RegisterOptions;
  placeholder?: string;
}

const Input = forwardRef(
  (
    {
      type = EInputType.Text,
      size = ESize.Large,
      disabled = false,
      autoComplete = "off",
      containerClassName,
      name,
      error,
      value,
      onBlur,
      onFocus,
      onChange,
      onKeyDown,
      maxLength,
      minLength,
      placeholder,
      className,
      rules,
      register,
      ...props
    }: Props,
    ref: LegacyRef<HTMLInputElement>,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const isPassword = useMemo(() => type === EInputType.Password, [type]);

    const onChangeValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      onChange?.(event, value);
    };

    const onBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
    };

    const onFocusHandler = (event: FocusEvent<HTMLInputElement>) => {
      onFocus?.(event);
    };

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
    };

    return (
      <div className='flex flex-col space-y-1'>
        <label className={classNames("relative", containerClassName)}>
          <input
            ref={ref}
            name={name}
            value={value}
            disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            onFocus={onFocusHandler}
            className={classNames("transition-all border border-black shadow-1xl pl-4 placeholder:pr-4 placeholder:text-center focus:border-gray100 focus:border-b-gray100 focus:shadow-2xl", {
              ['py-4 text-sm']: size === ESize.Large,
              ['py-1 text-md max-w-[200px]']: size === ESize.Small,
              ['!border-error100']: Boolean(error)
            }, className)}
            autoComplete={autoComplete}
            onKeyDown={onKeyDownHandler}
            onChange={onChangeValueHandler}
            placeholder={placeholder}
            onBlur={onBlurHandler}
            type={isOpen ? EInputType.Text : type}
            {...(register ? register(name, {
              onChange: onChangeValueHandler,
              onBlur: onBlurHandler,
              ...rules,
            }) : null)}
            {...props}
          />
          {isPassword && (
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {isOpen ? <Eye /> : <HideEye />}
            </div>
          )}
        </label>
        <p className={classNames("transition-all text-error100 opacity-0 text-xs min-h-0", {
          ["opacity-100 min-h-[18px]"]: Boolean(error),
        })}
        >
          {error}
        </p>
      </div>
    );
  });

export default Input;