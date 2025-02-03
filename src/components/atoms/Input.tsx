import { twMerge } from 'tailwind-merge';

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = ({ className, children, disabled, ...rest }: IInput) => {
  return (
    <input
      disabled={disabled}
      className={twMerge(
        'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm outline-none focus:ring-primary focus:border-primary block w-full p-2.5',
        `${disabled && 'opacity-50'}`,
        className
      )}
      {...rest}
    />
  );
};

export default Input;

