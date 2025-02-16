"use client";
import ConfettiComponent from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
// import { useEffect, useState } from "react";

const Confetti = () => {
  const { width, height } = useWindowSize();
  // const [showConfetti, setShowConfetti] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowConfetti(false);
  //   }, 10000);

  //   return () => clearTimeout(timer);
  // }, []);

  // if (showConfetti) {
  //   return null;
  // }

  return (
    <ConfettiComponent
      className="max-w-full"
      width={width}
      height={height}
      initialVelocityY={50}
      numberOfPieces={300}
    />
  );
};

export default Confetti;
