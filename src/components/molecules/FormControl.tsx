import { twMerge } from 'tailwind-merge';
import Input, { IInput } from '../atoms/Input';
import Select, { ISelect } from '../atoms/Select';

interface IFormControl {
  label: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: IInput;
  selectProps?: ISelect;
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
        className={twMerge('text-sm font-medium', labelProps?.className)}
      >
        {label}
      </label>
      {!select ? <Input {...inputProps} /> : <Select {...selectProps} />}
    </div>
  );
};

export default FormControl;

