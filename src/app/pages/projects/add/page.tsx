"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/component/types/project";
import ProjectForm from "@/component/projects/projectForm";

export default function AddProject() {
  const router = useRouter();

  const handleAddProject = async (data: ProjectType) => {
    await axios.post("/api/projects", data);
    router.push("/");
  };

  return <ProjectForm onSubmit={handleAddProject} />;
}
