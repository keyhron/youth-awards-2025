"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import { getNominatedsByCategory } from "@/utils/category";
import Label from "../atoms/Label";
import NominatedItem from "../molecules/NominatedItem";

const Nominateds = () => {
  const nominateds = useAppSelector((state) => state.nominateds.nominateds);
  const categories = useAppSelector((state) => state.nominateds.categories);

  const nominatedsByCategory: NominatedByCategory[] = useMemo(() => {
    return getNominatedsByCategory(nominateds, categories);
  }, [nominateds]);

  return (
    <section className="min-h-screen py-20 flex flex-col container mx-auto px-4">
      {nominateds.length > 0 ? (
        <>
          <Label labelTop="Nuestros" labelUnder="nominados" />
          {nominatedsByCategory.map((items) =>
            items.nominateds.length > 0 ? (
              <div
                className="flex flex-col mt-14"
                key={items.category.id}
                id={items.category.name}
              >
                <div className="uppercase text-primaryDark text-sm">
                  <p>Nominados a {items.category.name}</p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full mt-4 gap-3 sm:gap-4 text-center">
                  {items.nominateds.map((item, i) => (
                    <NominatedItem nominated={item} key={i} showVotes={true} />
                  ))}
                </div>
              </div>
            ) : null
          )}
        </>
      ) : (
        <div className="uppercase text-primaryDark text-sm mt-4">
          <p>Muy pronto.</p>
        </div>
      )}
    </section>
  );
};

export default Nominateds;
