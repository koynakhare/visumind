"use client";

import GlobalTable from "../table";
import { ROUTES } from "../utils/contant";
import { useRouter } from "next/navigation";
import { ProjectType } from "../types/project";
import { Column } from "../types/table";

export interface Props {
  projects: ProjectType[];
}


export default function ProjectTable({ projects }: Props) {
  const router = useRouter();
const projectColumns: Column<ProjectType>[] = [
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "noOfFiles", label: "No. of Files" },
  {
    type: "action",
    label: "Action",
    action: [
      { label: "Edit", type: 'edit', name: 'edit', onClick: (data) => router.push(ROUTES.PROJECTS.EDIT(data.id)) },
      { label: "Delete", type: 'delete', name: 'delete', onClick: (data) => { console.log(data); } },
    ],
  }
];

  const handleAddProject = () => {
    router.push(ROUTES.PROJECTS.ADD);
  };

  return (
    <GlobalTable
      data={projects}
      columns={projectColumns}
      actionButton={{ label: "Add Project", onClick: handleAddProject }}
    />
  );
}
