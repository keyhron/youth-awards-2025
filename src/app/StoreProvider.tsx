"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { Provider } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { makeStore, AppStore } from "../lib/store";
import {
  initializeStore,
  setNominateds,
} from "@/lib/reducers/nominatedsReducer";
import { authService } from "@/firebase/firebase";
import { signIn } from "@/lib/reducers/authReducer";
import { getNominateds } from "@/services/firebaseService";

export default function StoreProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: InitialData | null;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    if (initialState) {
      storeRef.current.dispatch(initializeStore(initialState));
    }
  }

  const handleGetNominateds = async () => {
    try {
      const nominateds = await getNominateds();
      storeRef.current?.dispatch(setNominateds(nominateds));
    } catch (error) {
      console.log(error);
    }
  };

  // Update the state depending on auth
  useEffect(() => {
    if (storeRef.current) {
      handleGetNominateds();
    }
    const unsubscribe = onAuthStateChanged(authService, (user) => {
      if (user) {
        storeRef.current?.dispatch(
          signIn({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          })
        );
      }
      // else {
      // storeRef.current?.dispatch(signOut());
      // }
    });

    return () => unsubscribe();
  }, [storeRef]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
