"use client";

import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProjectType } from "@/component/types/project";
import { addProjectSchema } from "./contant";
import { CustomForm } from "@/component/customForm";
import { generateUniqueId } from "@/component/utils/helper";
import { useEffect } from "react";

type ProjectFormProps = {
  initialValues?: ProjectType;
  onSubmit: (data: ProjectType) => Promise<void>;
  isEdit?: boolean;
};

export default function ProjectForm({ initialValues, onSubmit, isEdit = false }: ProjectFormProps) {
  const defaultValues = initialValues || { name: "", description: "" };

const methods = useForm<ProjectType>({
  defaultValues,
  resolver: yupResolver(addProjectSchema),
  mode: "onSubmit",
});


  useEffect(() => {
    if (initialValues) {
      methods.reset(initialValues);
    }
  }, [initialValues]);

  const handleInputChange = (type: string, value: any, name?: string) => {
    if (name === "files") {
      let updatedFiles = methods.getValues("files") || [];
      updatedFiles = [...updatedFiles, { id: generateUniqueId(), file: value }];
      methods.reset({ ...methods.getValues(), files: updatedFiles });
    }
  };

  const handleRemoveFile = (fileId: string) => {
    methods.reset({ ...methods.getValues(), files: methods.getValues("files")?.filter((f: any) => f.id !== fileId) });
  };

  const fields = [
    { name: "name", label: "Name", type: "text", xs: 12, md: 12 },
    { name: "description", label: "Description", type: "editor", xs: 12, md: 12 },
    { name: "files", label: "File", type: "file", xs: 12, md: 12, handleRemoveFile },
  ];

  const handleCancel = () => {};

  return (
    <Box sx={{ flex: 1 }}>
      <CustomForm<ProjectType>
        fields={fields}
        title={isEdit ? "Edit Project" : "Add Project"}
        methods={methods}
        handleCancel={handleCancel}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </Box>
  );
}
