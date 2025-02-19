"use client";
import { useState } from "react";
import Button from "../atoms/Button";
import Label from "../atoms/Label";
import { useAppSelector } from "@/lib/hooks";
import FormControl from "../molecules/FormControl";
import Image from "next/image";
import { createNominated } from "@/services/firebaseService";
import { twMerge } from "tailwind-merge";
import Input from "../atoms/Input";

export interface INewNominated {
  name: string;
  category: string;
  image: string;
}

const CreateNominatedForm = ({
  nominatedsImage,
}: {
  nominatedsImage: string[];
}) => {
  const [nominatedName, setNominatedName] = useState("");
  const [nominatedImage, setNominatedImage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const categories = useAppSelector((state) => state.nominateds.categories);
  const categoriesActive = categories.filter((item) => item.active);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async () => {
    try {
      if (
        !nominatedName ||
        selectedCategories.length === 0 ||
        !nominatedImage
      ) {
        return alert("Todos los campos son obligatorios");
      }

      // Submit data
      selectedCategories.forEach(async (item) => {
        await createNominated({
          name: nominatedName?.trim(),
          category: item,
          image: nominatedImage,
        });
      });

      // Clear states
      setNominatedImage("");
      setNominatedName("");
      setSelectedCategories([]);
      alert("Nominado creado correctamente");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <section className="min-h-screen py-20 flex flex-col container mx-auto px-4">
      <Label labelTop="Nuevo" labelUnder="nominado" />

      <div className="uppercase text-primaryDark text-sm mt-8">
        <p>Completa los campos</p>
      </div>

      <div className="flex flex-col gap-6 mt-10">
        <FormControl
          label="Nombre y apellidos"
          labelProps={{
            htmlFor: "fullname",
          }}
        >
          <Input
            id="fullname"
            placeholder="Ej: Carlos Sánchez"
            required={true}
            value={nominatedName}
            onChange={(e) => {
              setNominatedName(e.target.value);
            }}
          />
        </FormControl>

        <FormControl
          label="Categorías"
          labelProps={{
            htmlFor: "categories",
          }}
        >
          <div id="categories" className="grid gap-2 sm:grid-cols-3">
            {categoriesActive.map((item) => (
              <label key={item.nameId} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={item.nameId}
                  checked={selectedCategories.includes(item.nameId)}
                  onChange={() => handleCategoryChange(item.nameId)}
                />
                {item.name}
              </label>
            ))}
          </div>
        </FormControl>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {nominatedsImage.map((item) => (
            <Image
              src={item}
              alt="Nominated Image"
              width={500}
              height={500}
              key={item}
              className={twMerge(
                "w-full h-60 object-cover object-center",
                item === nominatedImage ? "opacity-100" : "opacity-25"
              )}
              onClick={() => setNominatedImage(item)}
            />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <Button label="Crear nominado" variant="white" onClick={handleSubmit} />
      </div>
    </section>
  );
};

export default CreateNominatedForm;
