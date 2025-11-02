"use client";

import React from "react";
import { Controller, FieldError, FieldValues, UseFormReturn } from "react-hook-form";
import { Grid } from "@mui/material";
import { Field } from "../types/form";
import MainCard from "../customComponents/mainCard";
import PageTitle from "../pageTitle";
import FormButtons from "./formButton";
import { renderFormField } from "./renderField";

interface CustomFormProps<T extends FieldValues> {
  fields: Field[];
  methods: UseFormReturn<T>;
  handleInputChange?: (type: string, value: any, name?: string) => void;
  onSubmit: (data: T) => void;
  hideSubmitButton?: boolean;
  hideCancelButton?: boolean;
  loading?: boolean;
  submitButtonLabel?: string;
  title?: string;
  handleRemoveFile?: (fileId: string) => void;
  handleCancel: () => void;
  actionsButtons?: [];
}

export const CustomForm = <T extends FieldValues,>({
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

  const onChangeHandler = (fieldType: string, controllerOnChange: (value: any) => void, name?: string) => {
    return (e: any) => {
      if (fieldType === 'file') {
        if (handleInputChange) {
          handleInputChange(fieldType, e?.target?.files?.[0], name);
        }
      } else {
        controllerOnChange(e);
        if (handleInputChange) {
          handleInputChange(fieldType, e?.target?.value, e?.target?.name);
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
                      handleRemoveFile: (field as any)?.handleRemoveFile,
                      onChange: onChangeHandler(field.type || "text", controllerField.onChange, field?.name),
                    },
                    error: errors[field.name as keyof T] as FieldError | undefined,
                  })
                }
              />
            </Grid>
          ))}

          <FormButtons
            handleSubmit={handleSubmit(onSubmit)} 
            hideSubmitButton={hideSubmitButton}
            actionsButtons={actionsButtons}
            submitButtonLabel={submitButtonLabel}
            hideCancelButton={hideCancelButton}
            onCancel={handleCancel}
            loading={loading}
          />

        </Grid>
      </MainCard>
    </form>
  );
};

