"use client";
import { useState } from "react";
import Button from "../atoms/Button";
import Label from "../atoms/Label";
import { useAppSelector } from "@/lib/hooks";
import FormControl from "../molecules/FormControl";
import Image from "next/image";
import { createNominated } from "@/services/firebaseService";
import { twMerge } from "tailwind-merge";

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
  const [nominatedCategory, setNominatedCategory] = useState("");
  const [nominatedImage, setNominatedImage] = useState("");
  const categories = useAppSelector((state) => state.nominateds.categories);

  const handleSubmit = async () => {
    try {
      if (!nominatedName || !nominatedCategory || !nominatedImage) {
        return alert("Todos los campos son obligatorios");
      }

      // Submit data
      await createNominated({
        name: nominatedName,
        category: nominatedCategory,
        image: nominatedImage,
      });

      // Clear states
      setNominatedCategory("");
      setNominatedImage("");
      setNominatedName("");
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
        <div className="flex flex-col gap-2">
          <FormControl
            label="Nombres"
            inputProps={{
              id: "fullname",
              placeholder: "Ej: Carlos Sánchez",
              required: true,
              value: nominatedName,
              onChange: (e) => {
                setNominatedName(e.target.value);
              },
            }}
            labelProps={{
              htmlFor: "fullname",
            }}
          />
          <p className="text-sm text-primary">
            Pedimos tu nombre para saber que si ya votaste no repetir. Si no
            eres de la misión 63 no puedes participar.
          </p>
        </div>

        <FormControl
          select
          label="Categoría"
          selectProps={{
            id: "category",
            required: true,
            value: nominatedCategory,
            onChange: (e) => {
              setNominatedCategory(e.target.value);
            },
            children: (
              <>
                <option value="" disabled>
                  Elige una categoría
                </option>
                {categories.map((item) => (
                  <option value={item.nameId} key={item.nameId}>
                    {item.name}
                  </option>
                ))}
              </>
            ),
          }}
          labelProps={{
            htmlFor: "category",
          }}
        />

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
