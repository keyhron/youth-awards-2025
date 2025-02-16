"use client";
import { useAppSelector } from "@/lib/hooks";
import { getCategoryByNameId, getIconByCategory } from "@/utils/category";
import Label from "../atoms/Label";
import { useRouter } from "next/navigation";
import clsx from "clsx";

const Categories = () => {
  const categories = useAppSelector((state) => state.nominateds.categories);
  const router = useRouter();

  return (
    <section className="pt-20 flex flex-col container mx-auto px-4">
      <Label labelTop="Premiando a" labelUnder="la juventud" />

      <div className="mt-8 uppercase text-primaryDark text-sm">
        <p>Nuestros nominados se han categorizado por:</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 w-full mt-14 gap-3 sm:gap-4 text-center">
        {categories.map((item, i) => {
          const Icon = getIconByCategory(item.nameId);
          return (
            <button
              className={clsx(
                "border border-primary flex flex-col hover:shadow-md p-5 items-center justify-center text-sm capitalize font-light gap-2 bg-black",
                item.active ? "cursor-pointer" : "cursor-default"
              )}
              key={i}
              onClick={() => {
                if (item.active) {
                  router.push(`/nominados#${item.name}`);
                }
              }}
            >
              <Icon size={30} />

              <p className="font-bold text-white sm:text-xl font-orbitron">
                {getCategoryByNameId(item.nameId, categories)?.name}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
