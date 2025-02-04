"use client";
import { useAppSelector } from "@/lib/hooks";
import { getCategoryByNameId } from "@/utils/category";
import { year } from "@/data";
import Label from "../atoms/Label";
import NominatedItem from "../molecules/NominatedItem";

const OldWinners = () => {
  const categories = useAppSelector((state) => state.nominateds.categories);
  const winners = useAppSelector((state) => state.nominateds.winners);

  if (!winners.length) return null;

  return (
    <section className="min-h-screen py-20 flex flex-col container mx-auto px-4">
      <Label labelTop="Actuales" labelUnder="ganadores" />

      <div className="first:mt-8 mt-20 uppercase text-primaryDark text-sm">
        <p>Ganadores de Premios Juventud {year}:</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 w-full gap-3 sm:gap-4 text-center mt-10">
        {winners.map((item, i) => (
          <NominatedItem
            key={i}
            nominated={item}
            showVotes
            showCategory={getCategoryByNameId(item.category, categories)?.name}
          />
        ))}
      </div>
    </section>
  );
};

export default OldWinners;
