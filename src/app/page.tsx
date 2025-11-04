"use client";

import { ROUTES } from "@/component/utils/contant";
import { get } from "lodash";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ChatMessage {
  content: string;
  timestamp?: number;
}

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    const getSessionData = async () => {
      const session = await getSession();
      if (get(session, 'accessToken')) {
        router.push(ROUTES.ASSISTANT)
      } else {
        router.push(ROUTES.AUTH.LOGIN)
      }
    }
    getSessionData()
  }, []);

  return (
    <div style={{ padding: 20 }}>

    </div>
  );
}
