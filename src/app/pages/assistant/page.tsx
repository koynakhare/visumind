"use client"; // must be at the very top
import ProjectChat from "@/component/fileUpload";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  // if (!session) return <div>Please log in</div>;
  return <div>Welcome, {session?.user?.name}
    <ProjectChat userId={session?.user?.id || ""} />
  </div>;
}
