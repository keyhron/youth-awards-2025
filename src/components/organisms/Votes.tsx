"use client";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Button from "../atoms/Button";
import Label from "../atoms/Label";
import { useEffect } from "react";
import { getVotes, updateNominateds } from "@/services/firebaseService";
import dayjs from "dayjs";
import {
  resetWinners,
  setVotes,
  addWinners,
} from "@/lib/reducers/nominatedsReducer";
import { enabledNewVote } from "@/data";

const Votes = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isReady = useAppSelector((state) => state.auth.uid !== null);

  const nominateds = useAppSelector((state) => state.nominateds.nominateds);
  const winners = useAppSelector((state) => state.nominateds.winners);
  const categories = useAppSelector((state) =>
    state.nominateds.categories.filter((item) => item.active)
  );
  const votes = useAppSelector((state) => state.nominateds.votes);

  useEffect(() => {
    const unsubscribe = getVotes((snapshot) => {
      const newVotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setVotes(newVotes as Vote[]));
    });

    // Clean listener
    return () => {
      unsubscribe();
    };
  }, []);

  const handleCheckWinners = async () => {
    //  Order all votes
    const allVotes: Nominated[] = votes.reduce(function (
      acc: Nominated[],
      vote
    ) {
      acc.push(...Object.values(vote.votes));
      return acc;
    },
    []);

    //  Order all nominateds to update
    const nominatedsToUpdate = nominateds.reduce(function (
      acc: Nominated[],
      nominated
    ) {
      const countVotes = allVotes.filter((v) => v.id === nominated.id).length;
      if (+countVotes !== +nominated.votes) {
        acc.push({ ...nominated, votes: countVotes });
      }

      return acc;
    },
    []);

    // Order nominateds to update by category
    const nominatedsByCategory = categories.reduce(function (
      acc: Nominated[][],
      category
    ) {
      const nominatedsbyCat = nominatedsToUpdate.filter(
        (n) => n.category === category.nameId
      );
      acc.push(nominatedsbyCat);

      return acc;
    },
    []);

    // Choose winners
    const winners = nominatedsByCategory.reduce(function (
      acc: Nominated[],
      nominateds
    ) {
      const winner = nominateds.reduce(function (first, second) {
        return first.votes > second.votes ? first : second;
      }, nominateds[0]);

      acc.push(winner);

      return acc;
    },
    []);

    // Set winner to nominates to update
    const finalNominateds = nominatedsToUpdate.reduce(function (
      acc: Nominated[],
      nominated
    ) {
      const winnerExist = winners.filter((w) => w.id === nominated.id);

      acc.push({ ...nominated, winner: winnerExist.length > 0 });

      return acc;
    },
    []);

    dispatch(addWinners(finalNominateds));
  };

  const handleAddWinners = async () => {
    if (winners.length > 0) {
      await updateNominateds(winners);
      alert("Se han generado los ganadores");
    }
  };

  const handleResetRedux = async () => {
    //  Get all nominateds to delete
    const nominatedsToUpdate = nominateds.reduce(function (
      acc: Nominated[],
      nominated
    ) {
      if (nominated.votes > 0) {
        acc.push({ ...nominated, votes: 0, winner: false });
      }
      return acc;
    },
    []);

    dispatch(resetWinners(nominatedsToUpdate));

    return nominatedsToUpdate;
  };

  const handleReset = async () => {
    const nominatedsToUpdate = await handleResetRedux();
    await updateNominateds(nominatedsToUpdate, votes);
    alert("Votos reiniciados");
  };

  return (
    <section className="min-h-screen py-20 flex flex-col container mx-auto px-4">
      <Label labelTop="Lista de" labelUnder="votos" />
      <div className="uppercase text-primaryDark text-sm mt-8">
        <p>Vota por tus favoritos</p>
      </div>

      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-white">
          <thead className="text-xs text-black uppercase bg-primary">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Nombres y Apellidos
              </th>
              <th scope="col" className="px-6 py-3">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {votes.map((item, i) => (
              <tr
                className="bg-white text-black border-b border-gray-200"
                key={item.id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap"
                >
                  {i + 1}
                </th>
                <td className="px-6 py-4">{item.fullname}</td>
                <td className="px-6 py-4">
                  {dayjs(item.created).format("DD-MM-YYYY hh:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-black">
            <tr className="font-semibold">
              <th scope="row" className="px-6 py-3"></th>
              <td className="px-6 py-3"></td>
              <td className="px-6 py-3">
                {votes.length > 0
                  ? `${votes.length} votos`
                  : "No hay votos aún"}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex items-center gap-3 mt-10">
        {enabledNewVote && (
          <Link href="/nuevo-voto">
            <Button label="Nuevo voto" variant="white" />
          </Link>
        )}
        {isAuthenticated && isReady && (
          <>
            {votes.length > 0 && (
              <Button label="Ir a resultados" onClick={handleCheckWinners} />
            )}

            {winners.length > 0 && (
              <>
                <Button
                  label="Publicar resultados"
                  onClick={handleAddWinners}
                />
                <Button label="Reiniciar votos" onClick={handleResetRedux} />
                <Button
                  label="Reiniciar votos de firebase"
                  onClick={handleReset}
                />
              </>
            )}

            <Link href="/crear-nominado">
              <Button label="Crear nominado" variant="secondary" />
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default Votes;
