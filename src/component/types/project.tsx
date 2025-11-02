export interface ProjectType {
    _id?: string;
    name: string;
    description?: string;
    files?: { id: string; file: File }[];
    noOfFiles?: number
}

export interface ProjectOption {
  label: string;
  value: string ;
}

