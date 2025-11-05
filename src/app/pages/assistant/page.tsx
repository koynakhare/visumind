"use client"; // must be at the very top
import ProjectChat from "@/component/assistant-chat";
import PageTitle from "@/component/pageTitle";
import { getProjectsAction } from "@/redux/action/projects.action";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function DashboardPage() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getProjectsAction())
  }, []);
  return <div>
    <PageTitle title={`Welcome, ${session?.user?.name ? session?.user?.name : ''}`} />
    <ProjectChat />
  </div>;
}
