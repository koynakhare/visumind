"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectTable from "@/component/projects/index";
import { Typography } from "@mui/material";
import Loading from "@/component/customComponents/loading";
import { RootState, AppDispatch } from "@/redux/store"; // adjust path
import { getProjectsAction } from "@/redux/action/projects.action";
import PageTitle from "@/component/pageTitle";

export default function Projects() {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector((state: RootState) => state.project?.projects);
  const loading = useSelector((state: RootState) => state.project?.loading);

  useEffect(() => {
    dispatch(getProjectsAction());
  }, [dispatch]);

  return (
    <>
      <PageTitle title="Knowledge Base" />

      {loading ? <Loading /> : <ProjectTable projects={projects} />}
    </>
  );
}
