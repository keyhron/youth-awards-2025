"use client";
import ConfettiComponent from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";

const Confetti = () => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showConfetti) {
    return null;
  }

  return (
    <ConfettiComponent
      className="max-w-full"
      width={width}
      height={height}
      recycle={showConfetti}
      numberOfPieces={150}
    />
  );
};

export default Confetti;
