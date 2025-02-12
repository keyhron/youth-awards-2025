"use client";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import Button from "../atoms/Button";
import Label from "../atoms/Label";
import FormControl from "../molecules/FormControl";
import { useEffect, useState } from "react";
import NominatedItem from "../molecules/NominatedItem";
import { createVote } from "@/services/firebaseService";
import { enabledNewVote, year } from "@/data";

const STEPS_LABEL = ["Completa los campos", "Vota por tus preferidos"];

const NewVoteForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [fullname, setFullname] = useState("");
  const [howDefine, setHowDefine] = useState("");
  const [forMeIs, setForMeIs] = useState("");
  const [forThisYear, setForThisYear] = useState("");

  const [indexCategory, setIndexCategory] = useState(0);
  const [votes, setVotes] = useState<Record<string, Nominated>>({});
  const [disabled, setDisabled] = useState(false);

  const categories = useAppSelector(
    (state) => state.nominateds.categories
  ).filter((item) => item.active);
  const nominateds = useAppSelector((state) => state.nominateds.nominateds);
  const categoryStep = categories[indexCategory];

  useEffect(() => {
    if (!enabledNewVote) {
      router.push("/votos");
    }
  }, [enabledNewVote]);

  const handleBack = () => {
    if (step === 1 && indexCategory === 0) {
      setStep(0);
    } else {
      setIndexCategory((prev) => prev - 1);
    }
  };

  /* Last vote and last step */
  const lastStepVote = step === 1 && categories.length === indexCategory + 1;

  const handleNext = () => {
    if (step === 0) {
      setStep(1);
    }

    if (step === 1 && categories.length !== indexCategory + 1) {
      setIndexCategory((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (lastStepVote) {
      if (Object.keys(votes).length !== categories.length) {
        alert("Te hace falta votar en una categoría");
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setDisabled(true);
      const data: Vote = {
        fullname,
        questions: {
          forMeIs,
          forThisYear,
          howDefine,
        },
        created: Date.now(),
        votes,
      };
      await createVote(data);
      router.push("/votos");
      alert("Se ha creado tu voto correctamente");
      setDisabled(false);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const checkDisabled = () => {
    if (step === 0) {
      return (
        fullname.length < 12 ||
        howDefine.length < 12 ||
        forMeIs.length < 12 ||
        forThisYear.length < 12
      );
    }
    if (step === 1) return disabled;
  };

  return (
    <section className="min-h-screen py-20 flex flex-col container mx-auto px-4">
      <Label labelTop="Nuevo" labelUnder="voto" />

      <div className="uppercase text-primaryDark text-sm mt-8">
        <p>{STEPS_LABEL[step]}</p>
      </div>

      {step === 0 && (
        <div className="flex flex-col gap-6 mt-10">
          <div className="flex flex-col gap-2">
            <FormControl
              label="Escribe tus nombres y apellidos:"
              inputProps={{
                id: "fullname",
                placeholder: "Ej: Carlos Sánchez",
                value: fullname,
                onChange: (e) => setFullname(e.target.value),
                required: true,
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

          <div className="flex flex-col gap-2">
            <FormControl
              label="¿Cómo defines la juventud de nuestra iglesia?"
              inputProps={{
                id: "question1",
                placeholder: "La defino como...",
                value: howDefine,
                onChange: (e) => setHowDefine(e.target.value),
                required: true,
                minLength: 12,
              }}
              labelProps={{
                htmlFor: "question1",
              }}
            />
            <p className="text-sm text-primary">
              Debes escribir mínimo 12 cáracteres
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <FormControl
              label="¿Qué es para ti ser joven cristiano?"
              inputProps={{
                id: "question2",
                placeholder: "Para mí es...",
                value: forMeIs,
                onChange: (e) => setForMeIs(e.target.value),
                required: true,
                minLength: 12,
              }}
              labelProps={{
                htmlFor: "question2",
              }}
            />
            <p className="text-sm text-primary">
              Debes escribir mínimo 12 cáracteres
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <FormControl
              label={`¿Qué aspiras para este ${year}?`}
              inputProps={{
                id: "question3",
                placeholder: `Para este ${year} aspiro...`,
                value: forThisYear,
                onChange: (e) => setForThisYear(e.target.value),
                required: true,
                minLength: 12,
              }}
              labelProps={{
                htmlFor: "question3",
              }}
            />
            <p className="text-sm text-primary">
              Debes escribir mínimo 12 cáracteres
            </p>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="flex flex-col gap-6">
          <p className="text-sm text-primary">
            Solo puedes votar un nominado por categoría.
          </p>

          <div className="flex-col-reverse sm:flex-row font-bold text-xl flex items-center justify-between">
            <h2 className="capitalize">Nominados a {categoryStep.name}</h2>

            <h2>
              {indexCategory + 1} de {categories.length}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 w-full gap-3 sm:gap-4 text-center">
            {nominateds
              .filter((item) => item.category === categoryStep.nameId)
              .map((item, i) => (
                <NominatedItem
                  nominated={item}
                  isSelected={item.id === votes?.[categoryStep.nameId]?.id}
                  isVoting
                  onSelect={(item) => {
                    setVotes({ ...votes, [categoryStep.nameId]: item });
                  }}
                  key={i}
                />
              ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-3 mt-10">
        {step === 1 && (
          <Button label="Atras" variant="secondary" onClick={handleBack} />
        )}
        <Button
          label={lastStepVote ? "Confirmar votos" : "Siguiente"}
          variant="white"
          onClick={handleNext}
          disabled={checkDisabled()}
        />
      </div>
    </section>
  );
};

export default NewVoteForm;
