import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const NominatedItem = ({
  nominated,
  showCategory,
  isVoting,
  isSelected,
  onSelect,
}: {
  nominated: Nominated;
  showVotes?: boolean;
  showCategory?: string;
  isVoting?: boolean;
  isSelected?: boolean;
  onSelect?: (item: Nominated) => void;
}) => {
  const showVotes = useAppSelector((item) => item.nominateds.showVotes);

  const validateClassname = () => {
    if (isVoting) {
      return isSelected ? "opacity-100" : "opacity-50 grayscale";
    }
    return "";
  };

  return (
    <div
      className={twMerge(
        "border border-primary flex flex-col hover:shadow-md",
        isVoting ? "cursor-pointer" : "",
        validateClassname()
      )}
      onClick={() => onSelect?.(nominated)}
    >
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
