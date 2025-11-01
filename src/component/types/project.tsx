export interface ProjectType {
    name: string;
    description?: string;
    files?: { id: string; file: File }[];
    noOfFiles?: number
}
