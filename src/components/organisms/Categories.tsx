"use client";
import { twJoin } from "tailwind-merge";
import { useAppSelector } from "@/lib/hooks";
import { getCategoryByNameId, getIconByCategory } from "@/utils/category";
import Label from "../atoms/Label";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const Category = ({
  item,
  categories,
  ...rest
}: {
  item: Category;
  categories: Category[];
}) => {
  const router = useRouter();

  const Icon = useMemo(() => getIconByCategory(item.nameId), [item.nameId]);
  return (
    <button
      className={twJoin(
        "border-2 flex flex-col hover:shadow-md px-2 py-10 items-center justify-center text-sm font-light gap-5 bg-[#FFE08A] sm:px-6",
        item.active ? "cursor-pointer" : "cursor-default",
        item.active ? "border-green-400" : "border-red-400"
      )}
      onClick={() => {
        if (item.active) {
          router.push(`/nominados#${item.name}`);
        }
      }}
      {...rest}
    >
      <Icon size={45} color="var(--color-black)" />

      <div className="flex flex-col items-center gap-2">
        <h2 className="font-bold text-black sm:text-xl font-orbitron capitalize">
          {getCategoryByNameId(item.nameId, categories)?.name}
        </h2>

        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          <div
            className={twJoin(
              "rounded-full h-1 w-1 sm:h-2 sm:w-2",
              item.active ? "bg-green-400" : "bg-red-400"
            )}
          />

          <p className="text-[10px] sm:text-base text-neutral-600">
            {item.active ? "Premiado" : "No premiado"} este año
          </p>
        </div>
      </div>
    </button>
  );
};

const Categories = () => {
  const categories = useAppSelector((state) => state.nominateds.categories);
  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => Number(b.active) - Number(a.active)),
    [categories]
  );

  return (
    <section className="pt-20 flex flex-col container mx-auto px-4">
      <Label labelTop="Premiando a" labelUnder="la juventud" />

      <div className="mt-8 uppercase text-primaryDark text-sm">
        <p className="text-black">Nuestros nominados se han categorizado por:</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 w-full mt-14 gap-3 sm:gap-4 text-center">
        {sortedCategories.map((item, i) => (
          <Category item={item} categories={sortedCategories} key={i} />
        ))}
      </div>
    </section>
  );
};

export default Categories;
