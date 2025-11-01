import * as yup from "yup";

export const addProjectSchema  = yup.object({
name: yup.string().required("Name is required"),
});

