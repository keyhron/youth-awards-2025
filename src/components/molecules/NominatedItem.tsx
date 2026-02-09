"use client";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "@/lib/hooks";

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
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const validateClassname = () => {
    if (isVoting) {
      return isSelected ? "opacity-100" : "opacity-50 grayscale";
    }
    return "";
  };

  return (
    <div
      className={twMerge(
        "border border-primary bg-[#FFE08A] flex flex-col hover:shadow-xl transition-shadow relative",
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
        {showCategory && <p className="capitalize text-neutral-500">{showCategory}</p>}
        <p className="font-bold text-black text-xl font-orbitron">
          {nominated.name}
        </p>

        {showVotes && (nominated.winner || isAuthenticated) && (
          <p className="text-secondary">Con {nominated.votes} votos</p>
        )}
      </div>
    </div>
  );
};

export default NominatedItem;
