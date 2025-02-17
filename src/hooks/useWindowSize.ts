"use client";
import { useEffect, useState } from "react";

function getCurrentWidthAndHeight() {
  if (typeof window === "undefined") {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export default function useWindowResize() {
  const [widthAndHeight, setWidthAndHeight] = useState(
    getCurrentWidthAndHeight()
  );

  function handler() {
    setWidthAndHeight(getCurrentWidthAndHeight());
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handler);
      return () => window.removeEventListener("resize", handler);
    }
  }, []);

  return widthAndHeight;
}
