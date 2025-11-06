export interface ProjectType {
    _id?: string;
    name: string;
    description?: string;
    files?: { id: string; file: File }[];
    noOfFiles?: number
}

export const defaultProject: ProjectType = {
  name: "",
  description: "",
  files: [],
  noOfFiles: 0
};

export interface ProjectOption {
  label: string;
  value: string ;
}

