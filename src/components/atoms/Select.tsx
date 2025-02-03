import { twMerge } from 'tailwind-merge';

export interface ISelect
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = ({ className, children, disabled, ...rest }: ISelect) => {
  return (
    <select
      disabled={disabled}
      className={twMerge(
        'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm outline-none focus:ring-primary focus:border-primary block w-full p-2.5',
        `${disabled && 'opacity-50'}`,
        className
      )}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;

