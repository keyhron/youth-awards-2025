import Image from "next/image";
import { twMerge } from "tailwind-merge";

const NominatedItem = ({
  nominated,
  showCategory,
  showVotes,
  isVoting,
  isSelected,
  onSelect,
  withCrowns,
}: {
  nominated: Nominated;
  showCategory?: string;
  showVotes?: boolean;
  isVoting?: boolean;
  isSelected?: boolean;
  onSelect?: (item: Nominated) => void;
  withCrowns?: boolean;
}) => {
  const validateClassname = () => {
    if (isVoting) {
      return isSelected ? "opacity-100" : "opacity-50 grayscale";
    }
    return "";
  };

  return (
    <div
      className={twMerge(
        "border border-primary flex flex-col hover:shadow-md relative",
        isVoting ? "cursor-pointer" : "",
        validateClassname()
      )}
      onClick={() => onSelect?.(nominated)}
    >
      {nominated.winner && withCrowns && (
        <div className="absolute -top-10 -right-5 rotate-12">
          <Image src="/images/crown.png" alt="crown" width={80} height={50} />
        </div>
      )}

      <Image
        src={nominated.image}
        alt="Nominated image"
        width={400}
        height={600}
        className="h-[25rem] w-full object-center object-cover"
      />

      <div className="p-5 flex flex-col items-center justify-center gap-2 text-sm capitalize font-light">
        {showCategory && <p className="capitalize">{showCategory}</p>}
        <p className="font-bold text-primary text-xl font-orbitron">
          {nominated.name}
        </p>

        {showVotes && <p>Con {nominated.votes} votos</p>}
      </div>
    </div>
  );
};

export default NominatedItem;
