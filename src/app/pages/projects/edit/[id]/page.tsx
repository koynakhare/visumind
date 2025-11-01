"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProjectForm from "@/component/projects/projectForm";
import { ProjectType } from "@/component/types/project";

type EditProjectProps = {
  projectId: string;
};

export default function EditProject({ projectId }: EditProjectProps) {
  const [project, setProject] = useState<ProjectType | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch project by id
    axios.get(`/api/projects/${projectId}`).then((res) => {
      setProject(res.data);
    });
  }, [projectId]);

  const handleUpdateProject = async (data: ProjectType) => {
    await axios.put(`/api/projects/${projectId}`, data);
    router.push("/");
  };

  if (!project) return <p>Loading...</p>;

  return <ProjectForm initialValues={project} onSubmit={handleUpdateProject} isEdit />;
}
