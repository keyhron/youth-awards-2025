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
      colors={["#db3c30", "#352bc3"]}
    />
  );
};

export default Confetti;
