import { twMerge } from 'tailwind-merge';

const BUTTON_VARIANTS = {
  primary: 'bg-primary text-white',
  secondary: 'bg-black text-white',
  text: 'bg-white text-black',
  gradient:
    'bg-gradient-to-r from-purple-500 to-pink-500 focus:ring-4 focus:outline-none focus:ring-purple-300',
  white: 'bg-white text-black',
  flat: 'bg-transparent text-black border border-black hover:bg-black hover:text-white ease-in transition',
  'flat-white':
    'bg-transparent text-white border border-white hover:bg-white hover:text-black ease-in transition',
  special:
    'border border-black w-40 h-10 xl:w-60 xl:h-14 relative after:block after:w-40 after:h-10 after:xl:w-60 after:xl:h-14 after:absolute after:-bottom-3 after:-right-3 after:bg-primary after:-z-10 rounded-none p-0',
};

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  label: string;
}

const Button = ({
  label,
  className,
  disabled,
  variant = 'primary',
  ...rest
}: IButton) => {
  return (
    <button
      className={twMerge(
        'px-5 py-2.5 rounded-full font-bold text-xs',
        BUTTON_VARIANTS[variant as 'primary'],
        disabled ? 'opacity-50' : '',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {label}
    </button>
  );
};

export default Button;

