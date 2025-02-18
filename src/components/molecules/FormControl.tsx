import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IFormControl {
  label: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  children: ReactNode;
}

const FormControl = ({ label, labelProps, children }: IFormControl) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        {...labelProps}
        className={twMerge("text-sm font-medium", labelProps?.className)}
      >
        {label}
      </label>

      {children}
    </div>
  );
};

export default FormControl;
