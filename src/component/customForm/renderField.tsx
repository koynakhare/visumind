import React from "react";
import { Field } from "../types/form";
import CustomTextField from "../customComponents/inputField";
import CustomSelectField from "../customComponents/customSelect";
import TinyEditor from "../customComponents/editor";
import FileUploader from "../customComponents/fileUpload";
import { FieldError } from "react-hook-form";

interface RenderFieldParams<T> {
  field: Field;
  controllerField: {
    value: any;
    onChange: (value: any) => void;
    name: string;
    handleRemoveFile?: (id: string) => void;
    onBlur: () => void;
  };
  error?: FieldError;
}

export function renderFormField<T>({
  field,
  controllerField,
  error,
}: RenderFieldParams<T>) {
  switch (field?.type) {
    case "editor":
      return (
        <TinyEditor
          value={controllerField?.value || ""}
          onEditorChange={controllerField?.onChange}
        />
      );

    case "file":
      return (
        <FileUploader
          {...field}

          multiple={true}
          accept="image/*,.pdf"
          handleRemoveFile={
            controllerField?.handleRemoveFile
              ? (id: string) => controllerField?.handleRemoveFile!(id)
              : undefined
          }

          selectedFiles={controllerField?.value}
          onFilesSelected={controllerField?.onChange}
          buttonLabel="Select Files to Upload"
        />
      );

    case "select":
      return (
        <CustomSelectField
          {...field}
          label={field.label}
          name={field?.name}
          value={controllerField?.value}
          onChange={(e) => {
            controllerField?.onChange(e)
          }}
          options={field.options || []}
          error={!!error}
          helperText={error?.message}
        />
      );

    case "text":
    default:
      return (
        <CustomTextField
          {...field}
          {...controllerField}
          type={field?.type || "text"}
          label={field?.label}
          error={!!error}
          helperText={error?.message}
        />
      );
  }
}
