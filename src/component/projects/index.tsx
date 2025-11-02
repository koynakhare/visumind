"use client";

import GlobalTable from "../table";
import { ROUTES } from "../utils/contant";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProjectType } from "../types/project";
import { Column } from "../types/table";
import ConfirmDialog from "../customComponents/confirmModel";
import { useDispatch } from "react-redux";
import { deleteProjectAction, getProjectsAction } from "@/redux/action/projects.action";
export interface Props {
  projects: ProjectType[];
}

export default function ProjectTable({ projects }: Props) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const handleDeleteClick = (project: ProjectType) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedProject) {
      const response = await dispatch(deleteProjectAction(selectedProject?._id));
      if (deleteProjectAction.fulfilled.match(response)) {
        if (response.payload.success) {
          handleCloseModal();
         dispatch(getProjectsAction());
        }
      }
    }
  };

  const projectColumns: Column<ProjectType>[] = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "noOfFiles", label: "No. of Files" },
    {
      type: "action",
      label: "Action",
      action: [
        {
          label: "Edit",
          type: "edit",
          name: "edit",
          onClick: (data) => router.push(ROUTES.PROJECTS.EDIT(data?._id)),
        },
        {
          label: "Delete",
          type: "delete",
          name: "delete",
          onClick: (data) => handleDeleteClick(data),
        },
      ],
    },
  ];

  const handleAddProject = () => {
    router.push(ROUTES.PROJECTS.ADD);
  };

  return (
    <>
      <GlobalTable
        data={projects}
        columns={projectColumns}
        actionButton={{ label: "Add Project", onClick: handleAddProject }}
      />

      <ConfirmDialog
        open={isModalOpen}
        onClose={() => handleCloseModal()}
        onConfirm={confirmDelete}
        loading={false}
        title="Delete Project"
        content={`Are you sure you want to delete "${selectedProject?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </>
  );
}
