"use client";

import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Box, Button, Grid } from "@mui/material";
import CustomTextField from "../customComponents/inputField";
import { Field } from "../types/form";
import MainCard from "../customComponents/mainCard";
import PageTitle from "../pageTitle";
import FormButtons from "./formButton";
import { renderFormField } from "./renderField";

interface CustomFormProps<T> {
  fields: Field[];
  methods: UseFormReturn<T>;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (data: T) => void;
  hideSubmitButton?: boolean;
  hideCancelButton?: boolean;
  loading?: boolean;
  submitButtonLabel?: string;
  title?: string;
  handleCancel: () => void;
  actionsButtons?: []
}

export const CustomForm = <T,>({
  title,
  fields,
  loading,
  submitButtonLabel,
  hideSubmitButton,
  hideCancelButton,
  actionsButtons,
  methods,
  handleCancel,
  onSubmit,
  handleInputChange,
}: CustomFormProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  // Unified onChange handler for all fields
  const onChangeHandler = (fieldType: string, controllerOnChange: (value: any) => void, name?: string) => {
    return (e: any) => {
      if (fieldType === 'file') {
        // Pass the FileList or array of files, not only the first file
        // 
        if (handleInputChange) {
          handleInputChange(fieldType, e.target.files[0], name);
        }
      } else {
        controllerOnChange(e);
        if (handleInputChange) {
          handleInputChange(fieldType, e.target.value, e.target.name);
        }
      }
    };
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {title && <PageTitle title={title} handleCancel={handleCancel} />}
      <MainCard mainWrapperClassName="form-wrapper">
        <Grid container spacing={2}>
          {fields.map((field) => (
            <Grid
              key={field.name}
              size={{ xs: field.xs || 12, sm: field.sm || 12, md: field.md || 12 }}
            >
              <Controller
                name={field.name as any}
                control={control}
                render={({ field: controllerField }) =>
                  renderFormField<T>({
                    field,
                    controllerField: {
                      ...controllerField,
                      handleRemoveFile: field?.handleRemoveFile,
                      onChange: onChangeHandler(field.type || "text", controllerField.onChange, field?.name),
                    },
                    error: errors[field.name as keyof T],
                  })
                }
              />
            </Grid>
          ))}

          <Grid size={{ xs: 12 }}>
            <FormButtons
              handleSubmit={onSubmit}
              hideSubmitButton={hideSubmitButton}
              actionsButtons={actionsButtons}
              submitButtonLabel={submitButtonLabel}
              hideCancelButton={hideCancelButton}
              onCancel={handleCancel}
              loading={loading}
            />
          </Grid>
        </Grid>
      </MainCard>
    </form>
  );
};

