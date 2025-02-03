"use client";
import { useEffect } from "react";

// Next
import { useRouter } from "next/navigation";

const PageNotFound = () => {
  const navigation = useRouter();

  useEffect(() => {
    navigation.push("/");
  }, []);

  return null;
};

export default PageNotFound;

