"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

export const logout = async () => {
  try {
    await axios.post("/api/auth/logout");
    // Redirect to login page
    window.location.href = "/login"; // or use router.push("/login") in Next.js 13 app router
  } catch (err) {
    console.error("Logout failed", err);
  }
};

export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
