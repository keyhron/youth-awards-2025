"use client";
import { useAppSelector } from "@/lib/hooks";
import { getCategoryByNameId } from "@/utils/category";
import Label from "../atoms/Label";
import NominatedItem from "../molecules/NominatedItem";
import { Fragment } from "react";

interface IOldWinner {
  year: string;
  winners: Nominated[];
}

const OldWinners = ({ data }: { data: IOldWinner[] }) => {
  const categories = useAppSelector((state) => state.nominateds.categories);

  return (
    <section className="min-h-screen py-20 flex flex-col container mx-auto px-4">
      <Label labelTop="Antiguos" labelUnder="ganadores" />

      {data.map((oldWinners, i) => (
        <Fragment key={i}>
          <div className="first:mt-8 mt-20 uppercase text-primaryDark text-sm">
            <p className="text-black">Ganadores de Premios Juventud {oldWinners.year}:</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 w-full gap-3 sm:gap-4 text-center mt-10">
            {oldWinners.winners.map((item, i) => (
              <NominatedItem
                key={i}
                nominated={item}
                showVotes
                showCategory={
                  getCategoryByNameId(item.category, categories)?.name
                }
              />
            ))}
          </div>
        </Fragment>
      ))}
    </section>
  );
};

export default OldWinners;
