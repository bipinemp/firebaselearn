"use client";

import { auth, googleProvider } from "@/configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-[400px] mx-auto flex flex-col gap-3">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email..."
        className="border-[1px] p-3 border-black rounded"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password..."
        className="border-[1px] p-3 border-black rounded"
      />

      <button
        onClick={signIn}
        className="bg-indigo-500 text-white font-semibold rounded py-3"
      >
        Sign In
      </button>
      <button
        onClick={signInGoogle}
        className="bg-indigo-500 text-white font-semibold rounded py-3"
      >
        Sign In with Google
      </button>

      <button
        onClick={logout}
        className="bg-indigo-500 text-white font-semibold rounded py-3"
      >
        LogOut
      </button>
    </div>
  );
};
