import { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Select = ({
  className,
  children,
  disabled,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select
      disabled={disabled}
      className={twMerge(
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm outline-none focus:ring-primary focus:border-primary block w-full p-2.5",
        `${disabled && "opacity-50"}`,
        className
      )}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
