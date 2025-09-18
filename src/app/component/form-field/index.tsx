"use client";
/* eslint-disable react/display-name */
import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  InputHTMLAttributes,
  useCallback,
  ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import { CloseIcon, LoadingIcon } from "../../../../assets/icons";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  prefixIcon?: any;
  customClass?: string;
  placeholder?: string;
  inputWidth?: number;
  checkErrors?: any;
  selectOnFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  isTextarea?: boolean;
  refInput?: any;
  showRemove?: boolean;
  loading?: boolean;
  description?: string;
  wrapperClass?: string;
  labelClass?: string;
  rows?: number;
  prefixClassName?: string;
  min?: number;
  max?: number;
  rightIcon?: ReactNode;
  isTransparent?: boolean;
  haveParentColor?: boolean;
  onKeyPress?: () => void;
  onChange?: (e: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onRemoveText?: () => void;
}

const FormField = forwardRef(
  (
    {
      label = "",
      type = "text",
      prefixIcon,
      customClass = "",
      onKeyPress,
      placeholder,
      inputWidth,
      name,
      onChange,
      value,
      checkErrors = [],
      id,
      onFocus,
      onBlur,
      selectOnFocus = false,
      disabled,
      readOnly = false,
      min,
      maxLength,
      autoComplete,
      required,
      refInput = null,
      isTextarea = false,
      onRemoveText,
      showRemove = false,
      loading = false,
      description = "",
      wrapperClass = "",
      labelClass = "",
      rows = 1,
      prefixClassName,
      max,
      rightIcon,
      isTransparent = false,
      haveParentColor,
      ...rest
    }: Props,
    ref
  ) => {
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState("");

    const onFocusHandler = (e: any) => {
      if (selectOnFocus) e.target.select();
      if (onFocus) onFocus();
    };

    const onBlurHandler = () => {
      if (onBlur) {
        setTouched(true);
        onBlur();
      }
    };

    useImperativeHandle(ref, () => ({
      validate: () => {
        setTouched(true);
        return validateForm();
      },
    }));

    const onKeyUp = (event: any) => {
      if (event.charCode === 13) {
        onKeyPress && onKeyPress();
      }
    };

    const validateForm = useCallback(() => {
      if (checkErrors.length > 0) {
        for (let idx = 0; idx < checkErrors.length; idx++) {
          const checkErrorFn = checkErrors[idx];
          if (typeof checkErrorFn === "function") {
            const error = checkErrorFn(value);
            if (error) {
              setError(error);
              return error;
            }
          }
        }
        setError("");
      }
      return "";
    }, [checkErrors, value]);

    useEffect(() => {
      validateForm();
    }, [value, validateForm]);

    return (
      <div
        className={twMerge(`flex flex-col gap-y-[5px] w-full`, wrapperClass)}
        style={rest.style}
      >
        {label && (
          <label
            className={twMerge(
              "text-[15px]",
              !haveParentColor && "text-white",
              labelClass
            )}
          >
            {label}
          </label>
        )}

        {description && (
          <p className="text-gray-400 text-xs font-Mont">{description}</p>
        )}
        {isTextarea ? (
          <textarea
            className={twMerge(
              `border border-signs_grey-7 bg-white focus:!bg-white w-full rounded text-xs px-3 py-2`,
              customClass
            )}
            id={id}
            autoComplete={autoComplete}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            readOnly={readOnly}
            required={required}
            onKeyPress={onKeyUp}
            onChange={onChange}
            onBlur={() => onBlurHandler()}
            onFocus={(e: any) => onFocusHandler(e)}
            maxLength={maxLength}
            rows={rows}
          />
        ) : (
          <div className="relative w-full">
            {prefixIcon && (
              <div
                className={twMerge(
                  `flex items-center absolute left-2 top-1/2 -translate-y-1/2`,
                  prefixClassName
                )}
              >
                {prefixIcon}
              </div>
            )}
            <input
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
              onKeyPress={onKeyUp}
              onFocus={(e: any) => onFocusHandler(e)}
              onBlur={() => onBlurHandler()}
              onWheel={(e) => e.currentTarget.blur()}
              required={required}
              ref={refInput}
              disabled={disabled}
              readOnly={readOnly}
              autoComplete={autoComplete}
              id={id}
              type={type}
              className={twMerge(
                "flex items-center w-full text-sm text-ellipsis leading-6 outline-none input-shadow py-3 pl-[15px] pr-10 border border-white/20  font-Mont bg-[#F1E4D0] text-[#452F0B] placeholder-[#7A551C]/60 rounded-full",
                isTransparent ? "bg-transparent" : "form-field-bg",
                !haveParentColor && "text-talent_beige-1",
                customClass
              )}
              min={min}
              max={max}
              maxLength={maxLength}
              {...rest}
            />
            {!!value && showRemove && !loading && (
              <div
                onClick={onRemoveText}
                className="flex items-center justify-center absolute right-3 px-1 top-3 z-20 cursor-pointer"
              >
                <CloseIcon width={8} height={8} className="text-white" />
              </div>
            )}
            {(loading || rightIcon) && (
              <div className="flex items-center absolute right-3 px-1 top-1/2 -translate-y-1/2 z-20 cursor-pointer">
                {loading ? <LoadingIcon className="fill-white" /> : rightIcon}
              </div>
            )}
          </div>
        )}
        {touched && error && (
          <p className="text-xs mt-1 text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

export default FormField;
