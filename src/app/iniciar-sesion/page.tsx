"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/molecules/Navbar";
import LoginForm from "@/components/organisms/LoginForm";
import { useAppSelector } from "@/lib/hooks";

export default function LoginPage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isReady = useAppSelector((state) => state.auth.uid !== null);

  useEffect(() => {
    if (isAuthenticated && isReady) {
      router.push("/");
    }
  }, [isAuthenticated, isReady]);

  return (
    <main>
      <Navbar />
      <LoginForm />
    </main>
  );
}
