import { twMerge } from "tailwind-merge";

interface ILabel {
  className?: string;
  labelTop: string;
  labelUnder: string;
}

const Label = ({ className, labelTop, labelUnder }: ILabel) => {
  return (
    <div className={twMerge("font-orbitron text-primary font-bold", className)}>
      <h1 className="text-primaryDark text-2xl sm:text-4xl">{labelTop}</h1>
      <h1 className="text-5xl sm:text-7xl leading-none">{labelUnder}</h1>
    </div>
  );
};

export default Label;
