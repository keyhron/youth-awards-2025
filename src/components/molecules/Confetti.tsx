"use client";
import ConfettiComponent from "react-confetti";
import useWindowSize from "@/hooks/useWindowSize";
import { useEffect, useState } from "react";

const Confetti = () => {
  const { width, height } = useWindowSize();
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <ConfettiComponent
      className="max-w-full"
      width={width}
      height={height}
      numberOfPieces={50}
      colors={[
        "#FFF7CC",
        "#FFE08A",
        "#FFD166",
        "#FFC857",
        "#F4B840",
        "#E6A800",
        "#D99200",
        "#C6862C",
        "#B8860B",
        "#8C6D1F"
      ]}
    />
  );
};

export default Confetti;
