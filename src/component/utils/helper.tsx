"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { signOut } from "next-auth/react";
import { ROUTES } from "./contant";

export const logout = async () => {
  try {
    await signOut({ callbackUrl: ROUTES.AUTH.LOGIN });
    // Redirect to login page
    window.location.href =ROUTES.AUTH.LOGIN; 
  } catch (err) {
    console.error("Logout failed", err);
  }
};

export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
