"use client";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { getCategoryByNameId, getIconByCategory } from "@/utils/category";
import Label from "../atoms/Label";
import { ReactNode } from "react";

const Categories = () => {
  const categories = useAppSelector((state) => state.nominateds.categories);

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
            <div
              className="border border-primary flex flex-col hover:shadow-md"
              key={i}
            >
              <div className="p-5 flex flex-col h-full w-full items-center justify-center text-sm capitalize font-light gap-2">
                <div className="flex w-full justify-center">
                  <Icon size={30} />
                </div>

                <p className="font-bold text-white sm:text-xl font-orbitron">
                  {getCategoryByNameId(item.nameId, categories)?.name}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
