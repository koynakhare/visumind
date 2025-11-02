"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ProjectType } from "@/component/types/project";
import ProjectForm from "@/component/projects/projectForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addProjectsAction } from "@/redux/action/projects.action";
import { ROUTES } from "@/component/utils/contant";
import Loading from "@/component/customComponents/loading";

export default function AddProject() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()
  const projectData = useSelector((state: RootState) => state.project);

  const handleAddProject = async (data: ProjectType) => {
    console.log(data)
    let payload={
      name:data.name||'',
      description:data.description||'',
      files:data.files?.map((file: any) => file.file)||[]
    }
    const response = await dispatch(addProjectsAction(payload));

    if (addProjectsAction.fulfilled.match(response)) {
      if (response.payload.success) {
        router.push(ROUTES.PROJECTS.LIST);
      }
    } else {
      console.error('Failed to add project:', response.payload);
    }
  };


  return (<>
    {projectData?.loading && <Loading />}
    <ProjectForm onSubmit={handleAddProject} />

  </>)
}
