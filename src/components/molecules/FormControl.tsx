import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Input from "../atoms/Input";
import Select from "../atoms/Select";

interface IFormControl {
  label: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  selectProps?: SelectHTMLAttributes<HTMLSelectElement>;
  select?: boolean;
}

const FormControl = ({
  label,
  labelProps,
  inputProps,
  selectProps,
  select = false,
}: IFormControl) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        {...labelProps}
        className={twMerge("text-sm font-medium", labelProps?.className)}
      >
        {label}
      </label>
      {!select ? <Input {...inputProps} /> : <Select {...selectProps} />}
    </div>
  );
};

export default FormControl;
