"use client";
import { twJoin } from "tailwind-merge";
import { useAppSelector } from "@/lib/hooks";
import { getCategoryByNameId, getIconByCategory } from "@/utils/category";
import Label from "../atoms/Label";
import { useRouter } from "next/navigation";

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
              className={twJoin(
                "border flex flex-col hover:shadow-md px-6 py-10 items-center justify-center text-sm font-light gap-5 bg-neutral-950",
                item.active ? "cursor-pointer" : "cursor-default",
                item.active ? "border-green-400" : "border-red-400"
              )}
              key={i}
              onClick={() => {
                if (item.active) {
                  router.push(`/nominados#${item.name}`);
                }
              }}
            >
              <Icon size={45} color="var(--color-primary)" />

              <div className="flex flex-col items-center gap-2">
                <h2 className="font-bold text-white sm:text-xl font-orbitron capitalize">
                  {getCategoryByNameId(item.nameId, categories)?.name}
                </h2>

                <div className="flex items-center justify-center gap-2">
                  <div
                    className={twJoin(
                      "rounded-full h-2 w-2",
                      item.active ? "bg-green-400" : "bg-red-400"
                    )}
                  />

                  <p>{item.active ? "Premiado" : "No premiado"} este año</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
