'use client';
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../atoms/Button';
import Label from '../atoms/Label';
// import Input from '../atoms/Input';
import { useAppSelector } from '@/lib/hooks';
import FormControl from '../molecules/FormControl';
import Image from 'next/image';
import { createNominated } from '@/services/firebaseService';
import { twMerge } from 'tailwind-merge';

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
  const [nominated, setNominated] = useState<INewNominated>({
    name: '',
    category: '',
    image: '',
  });
  const categories = useAppSelector((state) => state.nominateds.categories);

  const handleSubmit = async () => {
    try {
      if (!nominated.name || !nominated.category || !nominated.image) {
        return alert('Todos los campos son obligatorios');
      }

      await createNominated(nominated);
      setNominated({
        name: '',
        category: '',
        image: '',
      });
      alert('Nominado creado correctamente');
    } catch (error) {
      alert(error);
    }
  };
  console.log(nominated);

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
              id: 'fullname',
              placeholder: 'Ej: Carlos Sánchez',
              // value:name,
              // onChange: (e) => handleName(e.target.value),
              required: true,
              value: nominated.name,
              onChange: (e) => {
                setNominated({ ...nominated, name: e.target.value });
              },
            }}
            labelProps={{
              htmlFor: 'fullname',
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
            id: 'category',
            // value:name,
            // onChange: (e) => handleName(e.target.value),
            required: true,
            value: nominated.category,
            defaultValue: '',
            onChange: (e) => {
              setNominated({ ...nominated, category: e.target.value });
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
            htmlFor: 'category',
          }}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {nominatedsImage.map((item) => (
            <Image
              src={item}
              alt="Nominated Image"
              width={500}
              height={500}
              key={item}
              className={twMerge(
                'w-full h-60 object-cover object-center',
                item === nominated.image ? 'opacity-100' : 'opacity-25'
              )}
              onClick={() => setNominated({ ...nominated, image: item })}
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

